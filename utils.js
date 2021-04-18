// /**
//  * Classe contenant toutes les méthodes pour accéder ou modifier la base de données
//  *
//  *
//  * A FINIR : https://qastack.fr/programming/36856232/write-add-data-in-json-file-using-node-js
//  */
//
//
//
//
//
//
//
//
//
//
// // /* importation du module fs qui fournit une API pour intéragir avec le système de fichiers
// //  * https://nodejs.org/docs/latest-v13.x/api/fs.html#fs_file_system
// //  */
// const fs = require('fs');
// //
// var obj = {
//     liste: []
// };
//
//
// /**
//  * Création de l'objet qui contient les données sur lesquelles on souhaite travailler
//  * @returns {{liste: []}}
//  */
// var getObjJson = function() {
//     return obj;
// }
//
// var setObjJson = function () {
//
// }
//
// /**
//  * Récupère liste de obj
//  * @returns {liste}
//  */
// var getListeFromObject = function() {
//     return obj.liste;
// }
//
// /**
//  * Récupère le contenu du fichier situé dans path et le stock dans obj
//  * @param path
//  * @returns {{liste: []}}
//  */
// var readFromJson = function(path) {
//     var obj = [];
//     fs.readFile(path, 'utf8', function readFileCallback(err, data){
//         if (err){
//             console.log(err);
//         } else {
//             obj = JSON.parse(data);
//         }
//     });
//     console.log("[utils] obj : "); console.log(obj);
//     return obj;
// }
//
// /**
//  * Écrit dans le fichier situé dans path
//  * @param path
//  * @param data
//  */
// var writeInJson = function (path, object) {
//     var data = JSON.stringify(object); // normalisation des données
//     fs.writeFile(path, data, (err) => {
//         if (err) throw err;
//     });
// }
//
//
//
//
// //exports.getObjJson = getObjJson;
// exports.readFromJson = readFromJson;
// exports.writeInJson = writeInJson;
// //exports.getListeFromObject = getListeFromObject;
