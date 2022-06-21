import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

describe('Signup Routes', () => {
  beforeAll(async () => {
    const url = process.env.MONGO_URL as string
    await MongoHelper.connect(url)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Ricardo',
        email: 'ricardo@wsrp.com.br',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
