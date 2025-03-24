const express = require("express");
const cors = require("cors");
require("dotenv").config();
const resumeRoutes = require("./routes/resumeRoutes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger/swaggerConfig");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/", (req, res) => {
    res.send("Backend Resume API home page!");
});

app.use("/api/resume", resumeRoutes);

app.use("/api/resume/openapi", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

const port = process.env.PORT || 3001;
app.listen(port, "0.0.0.0", () => {
    console.log(`[INFO] Backend Resume server running on http://localhost:${port}/api`);
    console.log(`[INFO] Swagger docs available on http://localhost:${port}/api/resume/openapi`);
});
