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
    res.status(200).send({
        data: product,
        message: "Product created successfully",
        
    })
});

app.put("/products/:id", async (req, res) => {
    const { id } = req.params;
    const { name, description, price, image } = req.body;

    if (productData.image && productData.description && productData.price && productData.name) {
        return res.status(400).send({
            message: "All fields are required",
        });
    }

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
    res.status(200).send({
        data: product,
        message: "Product updated successfully",
    })
})

app.delete("/products/:id", async (req, res) =>{
    const { id } = req.params;
    const product = await prisma.product.delete({
        where: {
            id: Number(id),
        },
    });
    res.status(200).send({
        data: product,
        message: "Product deleted successfully",

    })
})

app.patch("/products/:id", async (req, res) =>{
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
    })
    res.status(200).send({
        data: product,
        message: "Product updated successfully",
    })
})



app.listen(PORT, () => console.log(`Server running on port ${PORT}`))