const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();

app.use(express.json());
app.use(cors());
//signup Api for save user data in DB
app.post("/reg", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

//logine route api
app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ result: "User Not Found" });
    }
  } else {
    res.send({ result: "User Not Found" });
  }
});

// Product Api
app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
});

//Product List API
app.get("/products", async (req, res) => {
  let products = await Product.find();
  if (products.length > 0) {
    res.send(products);
  } else {
    res.send({ result: "Product Not Found" });
  }
});

//Delete Product Api
app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({ _id:req.params.id})
  res.send(result);
});

//Port
app.listen(5000, () => {
  console.log("Port Working");
});
