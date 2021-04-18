// Partie Métier de la liste de musique (Back)

//Liste de musique pour une playlist
var liste = [];
var id = 0;

//Constructeur avec structure qui prend en paramètre un objet musique
function Musique(titre, nomArtiste){
    this.id = id;
    this.titre = titre;
    this.nomArtiste = nomArtiste;
}

//Methodes métier

//Ajout
var ajouterMorceau = function (titre, nomArtiste){
    liste[id] = new Musique(titre, nomArtiste);
    //console.log("[metierMorcezu] before : liste["+id+"].id : " + liste[id].id);
    console.log("liste[id] : "); console.log(liste[id]);
    id++;
    return liste[id-1];
}


// Récupère une musique à partir d'un id
var getMorceau = function (id){
    if (typeof liste[id].id == 'undefined') return {};
    else {
        return liste[id].id;
    }
}


//Lister les morceaux
var listerMorceaux = function (){
    return Object.values(liste);
}


// On exporte les méthodes pour pouvoir les utiliser dans le module App.js
exports.ajouterMorceau = ajouterMorceau;
exports.getMorceau = getMorceau;
exports.listerMorceaux = listerMorceaux;
