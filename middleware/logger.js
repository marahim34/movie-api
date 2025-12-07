export const logger = (req, res, next) => {
  const time = new Date().toISOString();

  console.log("=== Logger ===");
  console.log("Time:  ", time);
  console.log("Route: ", req.method, req.originalUrl);

  if (Object.keys(req.params || {}).length > 0) {
    console.log("Params:", req.params);
  }

  if (Object.keys(req.query || {}).length > 0) {
    console.log("Query: ", req.query);
  }

  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Body:  ", req.body);
  }

  console.log("=============\n");

  next();
};
