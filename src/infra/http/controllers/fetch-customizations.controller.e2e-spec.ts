import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { CustomizeFactory } from 'test/factories/make-customize'

describe('Fetch customizations (E2E)', () => {
  let app: INestApplication
  let customizeFactory: CustomizeFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [CustomizeFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    customizeFactory = moduleRef.get(CustomizeFactory)

    await app.init()
  })

  test('[GET] /customizations', async () => {
    await Promise.all([
      customizeFactory.makePrismaCustomize({
        name: 'extra bacon',
      }),
      customizeFactory.makePrismaCustomize({
        name: 'borda recheada',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/customizations')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual({
      customizations: expect.arrayContaining([
        expect.objectContaining({ name: 'extra bacon' }),
        expect.objectContaining({ name: 'borda recheada' }),
      ]),
    })
  })
})