// Partie Métier de la playlist musical (Back)

const musique = require("./metierMorceau");

//Liste de playlist
//var liste = [];
var objJson = {
    liste: []
};
var idPlaylist = 0;
var pos = 0;
const fs = require('fs');
const path = 'data/listePlaylist.json';

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

//Ajout de titre dans une playlist
/**
 *
 * @param idPlaylist
 * @param titre
 * @param nomArtiste
 * @returns {Playlist}
 */
var ajouterTitre = function (idPlaylist, titre, nomArtiste){
    var objM = musique.ajouterMorceau(titre, nomArtiste);

    //console.log("[metierPlay] objM : "); console.log(objM);

    // let p = getPlaylist(idPlaylist);
    // p.nbClics--;
    // p.listeMorceaux.push(objM);

    objJson.liste.getPlaylist(idPlaylist).nbClics--;
    objJson.liste.getPlaylist(idPlaylist).listeMorceaux.push(objM);

    var donnees = JSON.stringify(objJson); // normalisation des données
    fs.writeFile(path, donnees, (err) => {
        if (err) throw err;
    }); // écriture dans le fichier utilisateur.json

    //return p;
    return objJson.liste.getPlaylist(idPlaylist);
}


//Ajout d'une playlist
var ajouter = function (playlist){
    playlist.id = idPlaylist;
    idPlaylist++;
    playlist.nbClics = 0;
    playlist.listeMorceaux=[];
    playlist.listeContributeurs=[];
    //liste[pos] = new Playlist(playlist);

    objJson.liste[pos] = new Playlist(playlist);
    var donnees = JSON.stringify(objJson); // normalisation des données
    fs.writeFile(path, donnees, (err) => {
        if (err) throw err;
    }); // écriture dans le fichier utilisateur.json

    pos++;
    //return liste[pos -1];
    return objJson.liste[pos - 1];
}


// Récupère une playlist à partir d'un id
var getPlaylist = function (id){
    var i;
    for (i = 0; i<liste.length; i++){
        if (objJson.liste[i].id == id){
            objJson.liste[i].nbClics++;
            return objJson.liste[i];
        }
    }
    return {};
}


//Lister les playlists
var lister = function (){
    return Object.values(objJson.liste);
}

// const SUPPRESSION_OK = 1;
// const SUPPRESSION_ERREUR = 0;
//
// //Supprimer une playlist à partir d'un id
// var deletePlaylist = function (id){
//     var i;
//     for (i=0; i<objJson.liste.length; i++){
//         // console.log("liste[i].id : " + liste[i].id);
//         // console.log("id : " + id);
//         if (objJson.liste[i].id == id ) {
//             objJson.liste.splice(i, 1); // at position "i" remove 1 item
//
//             var donnees = JSON.stringify(objJson); // normalisation des données
//             fs.writeFile(path, donnees, (err) => {
//                 if (err) throw err;
//             }); // écriture dans le fichier utilisateur.json
//
//             break;
//         }
//     }
//     return liste;
// }


// On exporte les méthodes pour pouvoir les utiliser dans le module App.js
exports.ajouter = ajouter;
exports.getPlaylist = getPlaylist;
exports.lister = lister;
exports.deletePlaylist = deletePlaylist;
exports.ajouterTitre = ajouterTitre;
