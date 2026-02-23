import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/productDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});

const Product = mongoose.model("Product", productSchema);


app.get("/products", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

app.post("/products", async (req, res) => {
  const { name, price } = req.body;

  const newProduct = new Product({
    name,
    price
  });

  await newProduct.save();

  res.status(201).json(newProduct);
});

app.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const { name, price } = req.body;

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { name, price },
    { new: true }
  );

  if (!updatedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(updatedProduct);
});

app.delete("/products/:id", async (req, res) => {
  const id = req.params.id;

  const deletedProduct = await Product.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json({ message: "Product deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});