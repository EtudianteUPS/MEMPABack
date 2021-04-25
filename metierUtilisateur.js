/**
 * Partie Métier de la liste d'utilisateurs (Back)
 */

//Déclarations
const fs = require('fs');
const path = 'data/utilisateurs.json';
var objJson = { //Liste d'utilisateurs
    liste: []
};
// Premier chargement des données de manière synchronisée avant l'appel de la méthode initialisation()
var d = fs.readFileSync(path,'utf8');
if (d.length != 0) objJson = JSON.parse(d);
var idUtilisateur;
var pos;


/**
 * Initialise la position et l'id de l'utilisateur à créer
 */
var initialisation = function (){
    //readFromJson(path) ;
    pos = objJson.liste.length;
    if(pos > 0)
        idUtilisateur = objJson.liste[pos - 1].id + 1;
    else
        idUtilisateur = 0;
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
 * Constructeur
 * @param nomUtilisateur
 * @param motDePasse
 * @constructor
 */
function Utilisateur(utilisateur){
    this.id = utilisateur.id;
    this.nomUtilisateur = utilisateur.nomUtilisateur;
    this.motDePasse = utilisateur.motDePasse;
}


//Methodes métier
/**
 * Ajout un utilisateur à la liste d'utilisateurs
 * @param nomUtilisateur
 * @returns {Utilisateur}
 */
var ajouterUtilisateur = function (utilisateur){
    //metierJson.getObjJson().liste[id] = new Utilisateur(nomUtilisateur);
    console.log("user : ");
    console.log(utilisateur);
    utilisateur.id = idUtilisateur;
    objJson.liste[pos] = new Utilisateur(utilisateur);

    writeInJson(path);

    pos++;
    idUtilisateur++;
    return objJson.liste[pos-1];
    //return metierJson.getObjJson().liste[id-1];
}


/**
 * Récupère un utilisateur
 * @param id
 * @returns {{}|liste[id]}
 */
var getUtilisateur = function (id){
    d =  fs.readFileSync(path,'utf8'); // on n'écrit pas dans le fichier tant qu'on a pas fini de le lire
    objJson = JSON.parse(d);

    if (typeof objJson.liste[id] == 'undefined')
        return {};
    return objJson.liste[id];
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

    // fs.readFile(path, 'utf8', function readFileCallback(err, data){
    //     if (err){
    //         console.log(err);
    //     } else {
    //         objJson = JSON.parse(data);
    //     }
    // });
    //
    // return Object.values(objJson.liste);

    readFromJson(path);
    return Object.values(objJson.liste);
}


// On exporte les méthodes pour pouvoir les utiliser dans le module App.js
exports.ajouterUtilisateur = ajouterUtilisateur;
exports.getUtilisateur = getUtilisateur;
exports.listerUtilisateur = listerUtilisateur;
exports.initialisation = initialisation;
