const express = require("express");
const app = express();

require("dotenv").config();

const clothesRouter = require("./routes/clothes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/v1/clothes", clothesRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
