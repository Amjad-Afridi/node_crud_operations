const express = require("express");
const app = express();
const productRoutes = require("./routes/product");
require("dotenv").config();
require("./Database/dbConnection");

app.use(express.json());
app.use("/", productRoutes);

const port = process.env.PORT || 3000;

app.listen(port, "127.0.0.1", () => {
  console.log("app is running on port number : ", port);
});
