import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UseCase } from '@/usecases/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { RegisterUserController } from '@/web-controllers'
import { MissingParamError } from '@/web-controllers/errors/missing-param-error'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository'

describe('Register user web controller', () => {
  const users: UserData[] = []
  const repo: UserRepository = new InMemoryUserRepository(users)
  const usecase: UseCase = new RegisterUserOnMailingList(repo)
  const controller: RegisterUserController = new RegisterUserController(usecase)

  class ErrorThrowingUseCaseStub implements UseCase {
    perform (request: any): Promise<void> {
      throw Error()
    }
  }

  const errorThrowingUseCaseStub: UseCase = new ErrorThrowingUseCaseStub()

  test('Should return status code 201 when request contains valid user data', async () => {
    const request: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@email.com'
      }
    }
    const response: HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test('Should return status code 400 when request contains invalid user name', async () => {
    const requestWithInvalidUserName: HttpRequest = {
      body: {
        name: 'A',
        email: 'any@email.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidUserName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('Should return status code 400 when request contains invalid user email', async () => {
    const requestWithInvalidUserEmail: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any_email.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithInvalidUserEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('Should return status code 400 when request is missing user name', async () => {
    const requestWithMissingName: HttpRequest = {
      body: {
        email: 'any@email.com'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('Should return status code 400 when request is missing user email', async () => {
    const requestWithMissingEmail: HttpRequest = {
      body: {
        name: 'Any name'
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('Should return status code 400 when request is missing user name and email', async () => {
    const requestWithMissingNameAndEmail: HttpRequest = {
      body: {
      }
    }
    const response: HttpResponse = await controller.handle(requestWithMissingNameAndEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(MissingParamError)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name email.')
  })

  test('Should return status code 500 when server raises', async () => {
    const requestWithInvalidUserEmail: HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@email.com'
      }
    }
    const controller: RegisterUserController = new RegisterUserController(errorThrowingUseCaseStub)
    const response: HttpResponse = await controller.handle(requestWithInvalidUserEmail)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
