const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Establishing Connection with DB
const pass = process.env.MONGO_PASS;
mongoose.connect(`mongodb+srv://puguser:${pass}@cluster0.jewzq.mongodb.net/pug-contacts?retryWrites=true&w=majority`);

// Creating Schema
const contactSchema = new mongoose.Schema({
  name:String,
  phone:Number,
  email:String,
  age:Number,
  concern:String
})

// Creating Model
const contact = mongoose.model('contact', contactSchema);



const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname,"static")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));



app.get('/', (req, res) => {
    let params = {}
    res.render("index.pug",params);
})

app.get('/contact', (req, res) => {
    let params = {}
    res.render("contact.pug",params);
})

app.post('/contact', async (req, res) => {
    await contact.create(req.body);
    res.send("Form Submitted");
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})