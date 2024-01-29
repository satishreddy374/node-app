const express = require('express');
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ProductsList = require("./model")


mongoose.connect("mongodb+srv://satish:mongodb374@cluster0.ltudgvf.mongodb.net/productsDatabase?retryWrites=true&w=majority").then((response) => console.log("DB is connected....")).catch((error) => console.log(error))                        

app.use(express.json());



app.post("/addproduct", async(request, response) => {
    try{
        const {title, category, price, rating} = request.body;
        const product = {
            title, category, price, rating
        }

        const newProduct = new ProductsList(product);
        await newProduct.save()
        response.status(201).send(`Product: "${title}" is added successfully...`)
    }
    catch(error) {
        response.status(500).send("Internal Server Error...")
    }
})



app.get("/products", async(request, response) => {
    try{
        const productList = await ProductsList.find()
        response.status(200).send(productList)
    }
    catch(error) {
        response.status(500).send("Internal Server Error...")
    }
})

app.get("/products/:id", async(request, response) => {
    try{
        const {id} = request.params;
        const product = await ProductsList.findById(id)
        response.status(200).send(product)
    }
    catch(error) {
        response.status(500).send("Server Error...")
    }
})



app.listen(3004, () => {
    console.log("Server is Running at http://localhost:3004 ...")
});



