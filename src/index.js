const express = require('express')
const dotenv = require('dotenv')
const { PrismaClient } = require("@prisma/client")


const prisma = new PrismaClient()
const app = express()
dotenv.config();

const PORT = process.env.PORT;
app.use(express.json())


app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

app.post("/products", async (req, res) => {
    const newProductData = req.body;

    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            description: newProductData.description,
            price: newProductData.price,
            image: newProductData.image,
        }
    });
    res.send({
        data: product,
        message: "Product created successfully",
        status: 200,
    })
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    const product = await prisma.product.update({
        where: {
            id: Number(id),
        },
        data: {
            name,
            description,
            price,
            image,
        },
    });
    res.send({
        data: product,
        message: "Product updated successfully",
        status: 200,
    })
})

app.delete("/products/:id", async (req, res) =>{
    const { id } = req.params;
    const product = await prisma.product.destroy({
        where: {
            id: Number(id),
        },
    });
    res.send({
        data: product,
        message: "Product deleted successfully",
        status: 200,
    })
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))