require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Upload Image API</h1>");
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
