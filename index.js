import express from 'express';
import cors from 'cors';
import initRoutes from './routes';
// import auth from "./routes/auth";
const app = express();

require('dotenv').config();
require('./util/database');

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//   })
// );
const corsOptions = {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

initRoutes(app);

// app.use("/api/v1/clothes", clothesRouter);
// app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});