/** Partie Métier de la playlist musical (Back) */

//Déclarations
const metierMusique = require("./metierMorceau");
const metierUtilisateur = require("./metierUtilisateur");
const fs = require('fs');
const path = 'data/listePlaylist.json';
var objJson = { //Liste de playlist
    liste: []
};
// Premier chargement des données de manière synchronisée avant l'appel de la méthode initialisation()
var d = fs.readFileSync(path,'utf8');
if (d.length != 0) objJson = JSON.parse(d);
var idPlaylist;
var pos;

// !!! var oldObjJson = objJson; (ds readFromJson faire if ancObj == nouvObj alors pas besoin de lire le fichier (d'utiliser readFileSync))


/**
 * Initialise la position et l'id de la playlist à ajouter
 */
var initialisation = function (){
    //readFromJson(path) ;
    pos = objJson.liste.length;
    if(pos > 0)
        idPlaylist = objJson.liste[pos - 1].id + 1;
    else
        idPlaylist = 0;
}

/**
 * Récupère le contenu du fichier situé dans path et le stock dans objJson
 * @param path <string> filename
 */
var readFromJson = function (path) {
    fs.readFile(path, 'utf8', function readFileCallback(err, donnees){
        if (err){
            console.log("erreur : " + err);
        } else {
            //console.log("[readFromJson] donnees : "); console.log(donnees);
            if (objJson.liste.length != 0)
                objJson = JSON.parse(donnees);
            //console.log("[readFromJson] objJson.length : "); console.log(objJson.liste.length);
        }
    });
}

/**
 * Écrit dans le fichier situé dans path
 * @param path <string> filename
 */
var writeInJson = function (path) {
    var donnees = JSON.stringify(objJson); // normalisation des données
    fs.writeFile(path, donnees, (err) => {
        if (err) throw err;
    });
}

/**
 * Constructeur avec structure qui prend en paramètre un objet playlist
 * @param playlist
 * @constructor
 */
function Playlist(playlist){
    this.id = playlist.id;
    this.nomPlaylist = playlist.nomPlaylist;
    this.nomCreateur = playlist.nomCreateur;
    this.nbClics = playlist.nbClics
    this.listeMorceaux = playlist.listeMorceaux;
    this.listeContributeurs= playlist.listeContributeurs;
    this.style= playlist.style;
}



//Methodes métier

/**
 * Ajout d'un titre dans une playlist
 * @param idPlaylist <number>
 * @param musique
 * @returns {Playlist}
 */
var ajouterTitre = function (idPlaylist, musique){
    var objM = metierMusique.ajouterMorceau(musique);
    console.log("[metier play] ajouterTitre objM :"); console.log(objM);

    for(var i=0; i<objJson.liste.length; i++){
        if(objJson.liste[i].id == idPlaylist){
            objJson.liste[i].listeMorceaux.push(objM);
            writeInJson(path);

            return objJson.liste[i];
        }
    }
    return {};
}


/**
 * Ajout d'une playlist dans la liste
 * @param nomUtilisateur
 * @param playlist
 * @returns {Playlist}
 */
var ajouter = function (nomUtilisateur, playlist){
    /* Cherche si nomUtilisateur existe et si non, l'ajoute à la liste d'utilisateur */
    var tmp = metierUtilisateur.getUtilisateur(nomUtilisateur);
    console.log("[metierPlaylist] nomUtilisateur : "); console.log(tmp);
    if (typeof tmp.nomUtilisateur == "undefined"){
        tmp = metierUtilisateur.ajouterUtilisateur(nomUtilisateur);
        console.log("[metierPlaylist | ajouterUser] nomUtilisateur : "); console.log(tmp);
    }

    playlist.nbClics = 0;
    playlist.listeMorceaux = [];
    playlist.listeContributeurs = [];
    playlist.nomCreateur = tmp.nomUtilisateur;
    playlist.id = idPlaylist;
    objJson.liste[pos] = new Playlist(playlist);
    writeInJson(path);
    console.log("[metier playlist] ajouter obj"); console.log(objJson.liste[pos]);
    pos++;
    idPlaylist++;
    //return liste[pos -1];
    return objJson.liste[pos - 1];
}


/**
 * Récupère une playlist à partir d'un id
 * @param id <number>
 * @returns {{}|*}
 */
var getPlaylist = function (id){
    var i;

    d =  fs.readFileSync(path,'utf8'); // on n'écrit pas dans le fichier tant qu'on a pas fini de le lire
    objJson = JSON.parse(d);
    //readFromJson(path);
    for (i = 0; i<objJson.liste.length; i++){
        if (objJson.liste[i].id == id){
            objJson.liste[i].nbClics++;
            writeInJson(path);
            return objJson.liste[i];
        }
    }
    return {};
}


/**
 * Lister les playlists
 * @returns {*}
 */
var lister = function (){
    readFromJson(path);
    return Object.values(objJson.liste);
}


var supprimerPlaylist = function (id) {
    readFromJson(path);
    for (var i = 0; i < objJson.liste.length; i++) {
        if (id === objJson.liste[i].id) {
            objJson.liste.splice(i, 1);
        }
        writeInJson(path);
        console.log(objJson.liste);
    }
}


// On exporte les méthodes pour pouvoir les utiliser dans le module App.js
exports.ajouter = ajouter;
exports.getPlaylist = getPlaylist;
exports.lister = lister;
//exports.deletePlaylist = deletePlaylist;
exports.ajouterTitre = ajouterTitre;
exports.initialisation = initialisation;
exports.supprimerPlaylist = supprimerPlaylist;

