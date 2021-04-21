// Partie Métier de la liste de musique (Back)

//Liste de musique pour une playlist
var liste = [];
var id = 0;


/**
 * Constructeur
 * @param titre
 * @param nomArtiste
 * @constructor
 */
function Musique(titre, nomArtiste){
    this.id = id;
    this.titre = titre;
    this.nomArtiste = nomArtiste;
}

//Methodes métier

/**
 * Ajout d'un morceau dans la liste
 * @param titre
 * @param nomArtiste
 * @returns {*}
 */
var ajouterMorceau = function (titre, nomArtiste){
    liste[id] = new Musique(titre, nomArtiste);
    //console.log("[metierMorcezu] before : liste["+id+"].id : " + liste[id].id);
    //console.log("liste[id] : "); console.log(liste[id]);
    id++;
    return liste[id-1];
}


/**
 * Récupère une musique
 * @param id
 * @returns {{}|*}
 */
var getMorceau = function (id){
    if (typeof liste[id].id == 'undefined') return {};
    else {
        return liste[id].id;
    }
}


/**
 * Lister les morceaux
 * @returns liste
 */
var listerMorceaux = function (){
    return Object.values(liste);
}


// On exporte les méthodes pour pouvoir les utiliser dans le module App.js
exports.ajouterMorceau = ajouterMorceau;
exports.getMorceau = getMorceau;
exports.listerMorceaux = listerMorceaux;
