const express = require("express");
const cors = require("cors");
require("dotenv").config();
const portfolioRoutes = require("./routes/portfolioRoutes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");
const { testConnection } = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/", (req, res) => {
  res.send("Backend Porfolio API home page!");
});

app.use("/api/portfolios", portfolioRoutes);

app.use("/api/portfolio/openapi", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: "Endpoints not found",
    error: {
      code: 404,
      details: "Invalid path",
    },
  });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", () => {
  console.log(`[INFO] Backend Portfolio server running on http://localhost:${port}/api`);
  console.log(`[INFO] Swagger docs available on http://localhost:${port}/api/portfolio/openapi`);

  // test database connection
  testConnection();
});
