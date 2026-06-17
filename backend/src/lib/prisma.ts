import PG from 'pg'
import {PrismaPg} from '@prisma/adapter-pg'
import {PrismaClient} from '../generated/prisma/client'
import 'dotenv/config'

const pool = new PG.Pool({connectionString:process.env.DATABASE_URL})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({adapter})

export default prisma