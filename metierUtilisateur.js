/**
 * Partie Métier de la liste d'utilisateurs (Back)
 */

// const metierJson = require('./utils');
const path = 'data/utilisateurs.json';

//Liste d'utilisateurs
var id = 0;
var objJson = {
    liste: []
};
const fs = require('fs');


/**
 * Constructeur
 * @param nomUtilisateur
 * @constructor
 */
function Utilisateur(nomUtilisateur){
    this.id = id;
    this.nomUtilisateur = nomUtilisateur;
}

//Methodes métier

/**
 * Ajout un utilisateur à la liste d'utilisateurs
 * @param nomUtilisateur
 * @returns {Utilisateur}
 */
var ajouterUtilisateur = function (nomUtilisateur){
    //metierJson.getObjJson().liste[id] = new Utilisateur(nomUtilisateur);
    objJson.liste[id] = new Utilisateur(nomUtilisateur);

    //metierJson.writeInJson(path, objJson);
    var donnees = JSON.stringify(objJson); // normalisation des données
    fs.writeFile(path, donnees, (err) => {
        if (err) throw err;
    }); // écriture dans le fichier utilisateur.json

    id++;
    return objJson.liste[id-1];
    //return metierJson.getObjJson().liste[id-1];
}


/**
 * Récupère un utilisateur
 * @param id
 * @returns {{}|liste[id]}
 */
var getUtilisateur = function (id){
    //objJson = metierJson.readFromJson(path);

    if (typeof objJson.liste[id] == 'undefined') return {};
    else {
        return objJson.liste[id];
    }
}


/**
 * Liste les utilisteurs
 * @returns {Utilisateur[]}
 */
var listerUtilisateur = function (){
    // console.log("[metierUseur] readFrom : "); console.log(metierJson.readFromJson(path));
    // objJson = metierJson.readFromJson(path);
    // console.log("[metierUseur] objJson : "); console.log(objJson);
    // return objJson;

    fs.readFile(path, 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
            objJson = JSON.parse(data);
        }
    });

    return Object.values(objJson.liste);
}


// On exporte les méthodes pour pouvoir les utiliser dans le module App.js
exports.ajouterUtilisateur = ajouterUtilisateur;
exports.getUtilisateur = getUtilisateur;
exports.listerUtilisateur = listerUtilisateur;
