require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;
const app = express();

//config JSON and form data respose
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//solve cors
app.use(cors()) // habilita o CORS
app.use(cors({ credentials: true, origin: ['http://localhost:3000', 'https://projetofatecweb.onrender.com']}));

//upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// DB connection
require("./config/db.js");

//routes
const router = require("./routes/Router.js");
const { default: mongoose } = require("mongoose");

app.use(router);


app.listen(port, () => {
    console.log(`App rodando na porta ${port}`);
});
