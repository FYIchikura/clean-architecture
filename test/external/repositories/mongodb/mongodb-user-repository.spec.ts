import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from '@/external/repositories/mongodb'

describe('Mongo User repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeAll(async () => {
    MongoHelper.clearCollection('users')
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const user = {
      name: 'any_name',
      email: 'any@mail.com'
    }
    await userRepository.add(user)
    expect(await userRepository.exists(user)).toBeTruthy()
  })
})
