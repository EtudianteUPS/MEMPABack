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
function Musique(musique){
    this.id = musique.id;
    this.titre = musique.titre;
    this.nomArtiste = musique.nomArtiste;
}

//Methodes métier

/**
 * Ajout d'un morceau dans la liste
 * @param titre
 * @param nomArtiste
 * @returns {*}
 */
var ajouterMorceau = function (musique){
    if (musique.titre == undefined && musique.nomArtiste == undefined) return ;
    musique.id = id;
    liste[id] = new Musique(musique);
    //console.log("[metierMorcezu] before : liste["+id+"].id : " + liste[id].id);
    //console.log("liste[id] : "); console.log(liste[id]);
    id++;
    return liste[id - 1];
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
