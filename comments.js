//Create Web server
const express = require("express");
const app = express();
const port = 3000;

//Create a connection to MongoDB
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/comments", { useNewUrlParser: true });
const db = mongoose.connection;

//Create a schema
const commentSchema = new mongoose.Schema({
    content: String,
    date: Date
});
