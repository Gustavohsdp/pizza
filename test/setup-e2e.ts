import "dotenv/config"

import { PrismaClient } from "@prisma/client"
import { execSync } from "node:child_process"
import { randomUUID } from "node:crypto"

const prisma = new PrismaClient()

function generateUniqueDatabaseURL(databaseId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.")
  }

  const url = new URL(process.env.DATABASE_URL)

  url.pathname = `/${databaseId}`

  return url.toString()
}

const databaseId = randomUUID()

beforeAll(async () => {
  const databaseURL = generateUniqueDatabaseURL(databaseId)

  process.env.DATABASE_URL = databaseURL

  await prisma.$executeRawUnsafe(`CREATE DATABASE \`${databaseId}\`;`)

  execSync("npx prisma migrate deploy")
})

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP DATABASE IF EXISTS \`${databaseId}\`;`)
  await prisma.$disconnect()
})
