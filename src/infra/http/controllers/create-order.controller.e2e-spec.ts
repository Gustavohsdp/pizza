import { AppModule } from '@/infra/app.module';
import { DatabaseModule } from '@/infra/database/database.module';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import request from "supertest";
import { CustomizeFactory } from 'test/factories/make-customize';
import { FlavorFactory } from 'test/factories/make-flavor';
import { SizeFactory } from 'test/factories/make-size';

describe("Create order (E2E)", () => {
  let app: INestApplication;
  let prisma: PrismaService
  let sizeFactory: SizeFactory
  let flavorFactory: FlavorFactory
  let customizeFactory: CustomizeFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [SizeFactory, FlavorFactory, CustomizeFactory],
    }).compile();

    app = moduleRef.createNestApplication();

    prisma = moduleRef.get<PrismaService>(PrismaService);

    sizeFactory = moduleRef.get(SizeFactory)

    flavorFactory = moduleRef.get(FlavorFactory)

    customizeFactory = moduleRef.get(CustomizeFactory)

    await app.init();
  });

  test("[POST] /order", async () => {
    await sizeFactory.makePrismaSize({
      name: "pequena",
    })

    await sizeFactory.makePrismaSize({
      name: "grande",
    })


    await flavorFactory.makePrismaFlavor({
      name: "portuguesa",
    })

    await flavorFactory.makePrismaFlavor({
      name: "marguerita",
    })

    await customizeFactory.makePrismaCustomize({
      name: "extra bacon",
    })

    await customizeFactory.makePrismaCustomize({
      name: "borda recheada",
    })


    const response = await request(app.getHttpServer()).post("/order").send({
      pizzas: [
        {
          size: "pequena",
          flavor: "portuguesa",
        },
        {
          size: "grande",
          flavor: "marguerita",
          additional: ["extra bacon", "borda recheada"],
        }
      ]
    })


    expect(response.status).toBe(201);

    const orderOnDatabase = await prisma.order.findUnique({
      where: {
        id: response.body.data.orderId,
      }
    })

    expect(orderOnDatabase).toBeTruthy();
  })
})