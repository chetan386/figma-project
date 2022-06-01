const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const res = require('express/lib/response');
const req = require('express/lib/request');

const app = express();
const router = express.Router();
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/entryDB");
 var defaultEntries =[];

const entrySchema = new mongoose.Schema({
    pendingDays: Number,
    pendingAmount: Number,
    textArea: String,
    heading:String
});

const Entry = mongoose.model("Entry", entrySchema);
 
var heading= [];

const Entry1 = new Entry({
    pendingDays: 05,
    pendingAmount: 100,
    textArea: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer",
    heading: "Home Loan"

})


const Entry2 = new Entry({
    pendingDays: 07,
    pendingAmount: 10000,
    textArea: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer ",
    heading: "Car Loan"

})



const Entry3 = new Entry({
    pendingDays: 08,
    pendingAmount: 50000,
    textArea: "  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer ",
    heading: "SBI Loan"

})

  
defaultEntries = [Entry1,Entry2,Entry3];

app.get("/", function (req, res) {

    Entry.find({}, function (err, foundEntries) {
        if (foundEntries.length === 0) {

            Entry.insertMany(defaultEntries, function (err) {
                if (err) {
                    console.log(err);

                }
                else {
                    res.render("entry", {de: defaultEntries});
                 
                }
            })
        }
        else {

                const defaultEntries = foundEntries;


                res.render("entry", {de: defaultEntries,heading:heading});
          
        



        }
    })

})

app.post("/", function (req, res) {

    const newEntry = new Entry({
        pendingAmount: req.body.pendingAmount,
        pendingDays: req.body.pendingDays,
        textArea: req.body.textArea,
         heading: req.body.heading

    })

    newEntry.save();


    
    res.redirect("/");

});



    app.listen(3000, function () {
        console.log("Server is running at port 3000");
    });
