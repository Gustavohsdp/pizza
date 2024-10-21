import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { FlavorFactory } from 'test/factories/make-flavor'

describe('Fetch flavors (E2E)', () => {
  let app: INestApplication
  let flavorFactory: FlavorFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [FlavorFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    flavorFactory = moduleRef.get(FlavorFactory)

    await app.init()
  })

  test('[GET] /flavors', async () => {
    await Promise.all([
      flavorFactory.makePrismaFlavor({
        name: 'portuguesa',
      }),
      flavorFactory.makePrismaFlavor({
        name: 'marguerita',
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/flavors')
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual({
      flavors: expect.arrayContaining([
        expect.objectContaining({ name: 'portuguesa' }),
        expect.objectContaining({ name: 'marguerita' }),
      ]),
    })
  })
})