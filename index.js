import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import categoriesRoutes from "./routes/categories.js";
import itemsRoutes from "./routes/items.js";
import uploadRoutes from "./routes/upload.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static("public"));
app.use("/assets", express.static("images"));
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("/users", userRoutes);
app.use("/categories", categoriesRoutes);
app.use("/items", itemsRoutes);
app.use("/upload", uploadRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error));
