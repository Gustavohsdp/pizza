import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { SizeFactory } from 'test/factories/make-size'

describe('Fetch sizes (E2E)', () => {
  let app: INestApplication
  let sizeFactory: SizeFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [SizeFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    sizeFactory = moduleRef.get(SizeFactory)

    await app.init()
  })

  test('[GET] /sizes', async () => {
    await Promise.all([
      sizeFactory.makePrismaSize({
        name: 'pequena',
      }),
      sizeFactory.makePrismaSize({
        name: 'grande',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/sizes')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual({
      sizes: expect.arrayContaining([
        expect.objectContaining({ name: 'pequena' }),
        expect.objectContaining({ name: 'grande' }),
      ]),
    })
  })
})