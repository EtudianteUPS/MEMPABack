var express = require('express');
var bodyparser = require('body-parser');
var metier = require('./metierPlaylist');
var metierUtilisateur = require('./metierUtilisateur');

var app = express();
app.use(bodyparser.json());

//Modification des entêtes HTTP pour désactiver le mécanisme de sécurité du serveur pour le projet Angular
app.all('*', function (req, res, next){
    res.header("Access-Control-Allow-Origin", "*"); res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"); res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"); next();
});


/*  Debut métier Playlist */
metier.initialisation();

//Ajouter une playlist
app.post('/api/playlists', function (req, res){
    // 1. Récupérer le body
    var playlist = req.body;

    // 2. faire appel au métier
    var objRes = metier.ajouter(playlist);

    // 3. forger le résultat
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
    // 1.
    var id = req.params.id;

    // 2.
    var obj = metier.getPlaylist(id);

    // 3.
    if(typeof obj.id === 'undefined')
        res.status(404); // connait pas
    else
        res.status(200).json(obj); //objet correct
});


//Suprimer une playlist
app.delete('/api/playlists/deleteRow/:id', function (req, res){

    // 1.
    var id = req.params.id;

    // 2.
    var obj = metier.supprimerPlaylist(parseInt(id));


    // 3.

    if ((typeof obj === 'undefined') || (obj === {}))
        res.status(200).json(metier.lister());
    else res.status(404).json({});
});


//Ajouter un titre à une playlist
app.put('/api/playlists/:id', function (req, res){
    // 1. Récupérer les paramètres
    var musique = req.body;

    // 2. faire appel au métier
    var objRes = metier.ajouterTitre(req.params.id, musique.titre, musique.nomArtiste);

    // 3. forger le résultat
    if((typeof objRes === 'undefined') || (typeof objRes === {}))
        res.status(400).json({}); //erreur coté client
    else
        res.status(201).json(objRes); //objet correct
});

/*  Fin métier Playlist */


/*  Debut métier Utilisateur */

//Ajouter un utilisateur
app.post('/api/utilisateurs', function (req, res){
    // 1. Récupérer les paramètres
    var user = req.body;

    // 2. faire appel au métier
    var objRes = metierUtilisateur.ajouterUtilisateur(user.nomUtilisateur);

    // 3. forger le résultat
    if((typeof objRes === 'undefined') || (typeof objRes === {}))
        res.status(400).json({}); //erreur coté client
    else
        res.status(201).json(objRes); //objet correct
});


// lister les utilisateurs
app.get('/api/utilisateurs', function (req, res){
    res.status(200).json(metierUtilisateur.listerUtilisateur());
});


//Rechercher un utilisateur
app.get('/api/utilisateurs/:id', function (req, res){
    // 1.
    var id = req.params.id;

    // 2.
    var obj = metierUtilisateur.getUtilisateur(id);

    // 3.
    if(typeof obj.id === 'undefined')
        res.status(404); // connait pas
    else
        res.status(200).json(obj); //objet correct
});

/*  Fin métier Utilisateur */


app.listen(3000, function (){
    console.log('server running...')
})
