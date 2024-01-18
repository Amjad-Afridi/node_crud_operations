const Product = require("../models/product");

const homeFunc = (req, res) => {
  res.status(200).json("home route ...!");
};

const getProducts = (req, res) => {
  const price = parseInt(req.query.price) || null;
  const page = parseInt(req.query.page) || null;
  const limit = parseInt(req.query.limit) || null;
  const startIndex = (page && limit && (page - 1) * limit) || null;
  const endIndex = (page && limit && page * limit) || null;
  let response = {};

  if (price) {
    Product.find({ price: price })
      .then((products) => {
        if (products.length === 0) {
          return res.status(404).json("no such products with this price");
        }
        if (page && limit) {
          if (endIndex < products.length) {
            response.next = {
              nextPage: page + 1,
              limit: limit,
            };
          }
          if (startIndex > 0) {
            response.previous = {
              previousPage: page - 1,
              limit: limit,
            };
          }
          response.data = products.slice(startIndex, endIndex);
          return res.status(200).json(response);
        }
        response.data = products;
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  } else {
    Product.find({})
      .then((products) => {
        if (page && limit) {
          if (endIndex < products.length) {
            response.next = {
              nextPage: page + 1,
              limit: limit,
            };
          }
          if (startIndex > 0) {
            response.previous = {
              previousPage: page - 1,
              limit: limit,
            };
          }

          response.data = products.slice(startIndex, endIndex);
          return res.status(200).json(response);
        }
        response.data = products;
        res.status(200).json(response);
      })
      .catch((error) => {
        res.status(500).json(error.message);
      });
  }
};

const getProductById = (req, res) => {
  const id = req.params.id;

  Product.findById(id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error.message));
};

const addProduct = (req, res) => {
  Product.create(req.body)
    .then((response) => res.status(200).json(response))
    .catch((err) => {
      res.status(500).json(err.message);
    });
};

const updateProduct = (req, res) => {
  const id = req.params.id;
  Product.updateOne({ _id: id }, req.body, { new: true })
    .then((response) => {
      res.status("200").json(response);
    })
    .catch((error) => res.status(500).json(error.message));
};

const deleteProduct = (req, res) => {
  const id = req.params.id;
  Product.findOneAndDelete(id)
    .then((response) => res.status(200).json(response))
    .catch((error) => res.status(500).json(error));
};

module.exports = {
  homeFunc,
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
