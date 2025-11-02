"use strict";
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.static("public"));

const jokebookRouter = require('./routes/jokebookRoutes');
app.use('/jokebook', jokebookRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on port:", PORT));