import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  await prisma.size.deleteMany()
  await prisma.flavor.deleteMany()
  await prisma.customize.deleteMany()

  await prisma.size.createMany({
    data: [
      {
        name: "pequena",
        price: 20.20,
        time: 15
      },
      {
        name: "média",
        price: 30.30,
        time: 20
      },
      {
        name: "grande",
        price: 40,
        time: 25
      }
    ]
  })

  await prisma.flavor.createMany({
    data: [
      {
        name: "calabresa",
        extraTime: 0,
      },
      {
        name: "marguerita",
        extraTime: 0,
      },
      {
        name: "portuguesa",
        extraTime: 5,
      }
    ]
  })

  await prisma.customize.createMany({
    data: [
      {
        name: "extra bacon",
        extraPrice: 3,
        extraTime: 0,
      },
      {
        name: "sem cebola",
        extraPrice: 0,
        extraTime: 0,
      },
      {
        name: "borda recheada",
        extraPrice: 5,
        extraTime: 5,
      }
    ]
  })

}

seed().then(() => {
  console.log('Database seeded!')
})
