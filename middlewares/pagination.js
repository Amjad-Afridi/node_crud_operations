const paginatedResults = (model) => {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || null;
    const limit = parseInt(req.query.limit) || null;
    const startIndex = (page && limit && (page - 1) * limit) || null;
    const endIndex = (page && limit && page * limit) || null;
    let response = {};

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
      res.status(200).json(response);
      next();
    }
    next();
  };
};
module.exports = paginatedResults();
