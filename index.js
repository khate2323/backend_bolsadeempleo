import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { PORT } from "./src/config/envConfig.config.js";
import { routesUser } from "./src/routes/user.routes.js";
import { routesAuth } from "./src/routes/auth.routes.js";
import { routesOffert } from "./src/routes/offert.routes.js";
import { routesCvUser } from "./src/routes/cv-user.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());
app.disable("x-powered-by");

// config routes api
app.use("/api/auth/", routesAuth);
app.use("/api/users/", routesUser);
app.use("/api/offerts/", routesOffert);
app.use("/api/cvs/", routesCvUser);

app.listen(PORT, () => {
  console.log(`Url local http://localhost:${PORT}`);
});
