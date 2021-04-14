// Partie Métier de la playlist musical (Back)

//Liste de playlist
var liste = [];
var id = 0;

//Constructeur avec structure qui prend en paramètre un objet playlist
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

//Ajout
var ajouter = function (playlist){
    id++;
    playlist.id = id;
    playlist.nbClics = 0;
    liste[id] = new Playlist(playlist);
    return liste[id];
}

// Récupère une playlist à partir d'un id
var getPlaylist = function (id){
    if (typeof liste[id] === 'undefined') return {};
    else {
        liste[id].nbClics++; // incrémente +1
        return liste[id];
    }
}

//Lister les playlists
var lister = function (){
    return Object.values(liste);
}

// On exporte les méthodes pour pouvoir les utiliser dans le module App.js
exports.ajouter = ajouter;
exports.getPlaylist = getPlaylist;
exports.lister = lister;
