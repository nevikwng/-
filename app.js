const express = require("express");

const shopRoutes = require("./routes/shop-routes");

const app = express();
const bodyParser = express.urlencoded({ extended: false });

// Middleware
app.use(bodyParser);
app.use(express.json());
// Cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POSH, PATCH, DELETE");
  next();
});

// Router
app.use("/api/shop", shopRoutes);

// Error handler
app.use((req, res, next) => {
  throw new httpError("Route can't find!", 404);
});

app.use((error, req, res, next) => {
  if (res.headerSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "unKnown Error!" });
});

app.listen(5000, () => console.log("server start 🥶😱"));