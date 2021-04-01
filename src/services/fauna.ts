import { Client } from 'faunadb'

export const fauna = new Client({
  secret: process.env.NODE_ENV
})