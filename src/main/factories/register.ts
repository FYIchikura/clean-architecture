import { RegisterUserController } from '@/web-controllers/'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

export const makeRegisterUserController = (): RegisterUserController => {
  const mongoDBUserRepository = new MongodbUserRepository()
  const registerUserOnMailingListUseCase = new RegisterUserOnMailingList(mongoDBUserRepository)
  const registerUserController = new RegisterUserController(registerUserOnMailingListUseCase)
  return registerUserController
}
