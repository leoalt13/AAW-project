const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const animalTab =[
    {
        id: 1,
        name: "Lion",
        image: "/images/lion.png",
        notes: "Big cat",
        favorite: true,
    },
    {
        id: 2,
        name: "Gorilla",
        image: "/images/gorille.png",
        notes: "Big monkey",
        favorite: false,
    },
    {
        id: 3,
        name: "Panda",
        image: "/images/Placeholder.png",
        notes: "Big chinese bear",
        favorite: false,
    },
    {
        id: 4,
        name: "Crocodile",
        image: "/images/croco.png",
        notes: "Big lizard",
        favorite: true,
    },
];

app.use(express.json()); // faut utiliser du json

function generateNewId(){
    return Math.random().toString(36).substring(2, 9);
}


app.get('/message',(req,res) => {
    res.send('Mon premier Serveur NodeJs !')
});

app.get("/api/animals", (req, res)=>{
    res.send(animalTab)
});

app.get("/api/animals:id", (req, res)=>{
    res.send(animalTab.id)
});


app.post("/api/animals", (req, res)=>{
    const animal = req.body;
    console.log(animal)
    animal.id = generateNewId(); // cette methode est à définir
    animalTab.push(animal); // j'ajoute dans mon context le nouvel événement
    res.send(animalTab)
});



app.use('/',express.static('public'));
app.get('/*',(rec, res) =>{
    res.sendFile(path.resolve("./public/index.html"))
});

app.listen(port, () => {
    console.log(`Exemple app listening on port ${port}`);
});