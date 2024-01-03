const express = require('express');


const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World");
});

router.get("/products", async (req, res) => {
    const products = await prisma.product.findMany();

    res.send(products);
});

router.get("/products/:id", async (req, res) => {
    const { id } = req.params
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id),
        }
    })
    
    if (!product) {}
    res.status(200).send({
        data: product,
        message: "Product fetched successfully",
    })
})

router.post("/products", async (req, res) => {
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

router.put("/products/:id", async (req, res) => {
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

router.delete("/products/:id", async (req, res) =>{
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

router.patch("/products/:id", async (req, res) =>{
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


module.exports = router;