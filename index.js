const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/", function(req, res){
    fs.readdir("./file", function(err,files){
        if(err){
            console.error(err);
        }
        else{
            res.render("index",{files: files});
        }
    })
   
});

app.post("/create", function(req, res){
    fs.writeFile(`./file/${req.body.title.split(' ').join('')}.txt`,req.body.details, function(err){
        if(err){
            console.error(err);
        }
        else{
            res.redirect("/");
        }
    })
})

app.get("/file/:filename", function(req, res){
    fs.readFile(`./file/${req.params.filename}`,"utf-8", function(err, data){
        res.render("show",{filename: req.params.filename,data: data});
    })

})

app.get("/edit/:filename", function(req, res){
   res.render("edit", { filename : req.params.filename});

})

app.post("/update", function(req, res){
    fs.rename(`./file/${req.body.previousname}`,`./file/${req.body.newname}`, function(err){
        res.redirect("/");
    })
})

app.listen(3000);