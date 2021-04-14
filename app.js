var express = require('express');
var bodyparser = require('body-parser');
var metier = require('./metierPlaylist');

var app = express();
app.use(bodyparser.json());

//Désactive le mécanisme de sécurité du serveur pour le projet Angular
app.all('*', function (req, res, next){
    res.header("Acces-Control-Allow-Origin", "*"); res.header("Acces-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"); res.header("Acces-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"); next();
});

//Ajouter une playlist
app.post('/api/playlists', function (req, res){
    // Récupérer les param
    var playlist = req.body;

    // faire appel au métier
    var objRes = metier.ajouter(playlist);

    //forger le rés
    if((typeof objRes === 'undefined') || (typeof objRes === {}))
        res.status(400).json({}); //erreur coté client
    else
        res.status(201).json(objRes); //objet correct
});


// lister les playlist
app.get('/api/playlists', function (req, res){
    res.status(200).json(metier.lister());
});


//Rechercher une playlist
app.get('/api/playlists/:id', function (req, res){
    // 1
    var id = req.params.id;

    //2
    var obj = metier.getPlaylist(id);

    //3
    if((typeof obj === 'undefined') || (typeof obj === {}))
        res.status(404); // connait pas
    else
        res.status(200).json(obj); //objet correct
});


app.listen(3000, function (){
    console.log('server running...')
})
