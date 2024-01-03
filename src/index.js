const express = require('express')
const dotenv = require('dotenv')
const { PrismaClient } = require("@prisma/client")


const prisma = new PrismaClient()
const app = express()
dotenv.config();

const productController = require('./product/product.controller')

const PORT = process.env.PORT;
app.use(express.json())

app.use('/products', productController)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))