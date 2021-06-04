const express = require("express");
const mongoose = require('mongoose');
const config = require('./config.json');

mongoose.connect(config.databaseURL);
const app = express();

app.get("/hello", function(request, response)  {
    response.end("helloszia")
})

app.use(express.static("public"));

const schema = new mongoose.Schema({
    nev: String,
    szavazatok: Number
});

const model = new mongoose.model('Opciok',schema,'Opciok');

app.use(express.urlencoded());

app.post("/szavazas", function(request, response)  {
    console.log(request.body);

    model.findOne({nev: request.body.szavazas}, function(err, doc){
        if(doc){
            console.log(request.body.osszeg+' már létezik');
            doc.szavazatok++;
            doc.save();
        }else{
            console.log(request.body.osszeg+' még nem létezik');
            new model({
                nev: request.body.osszeg,
                szavazatok:1
            }).save();
        }
    });

    

    response.redirect("/eredmeny.html");
})
app.get('/eredmenyek', function(req,res){
    model.find({},function(error,dokumentumok){
        res.send(JSON.stringify(dokumentumok));
    });
});
app.listen(9000);