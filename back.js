// Je télécharge mon driver sqlite3 via l'invite de commande
// Je me déplace dans mon dossier et j'installe le driver en tapant: npm install --save sqlite3 (je dois au préalable avoir mis mes 3 exe Sqlite dans mon dossier. Ou alors je rends mes dossiers exe accessibles depuis n'importe où

const sqlite3 = require('sqlite3').verbose(); //je vais chercher le fichier sqlite3 dans mon dossier node_modules
const fs = require('fs'); // je vais chercher le fichier fs dans mon dossier node_modules
const express = require('express');

const dbFile = 'test.db'; // je crée une variable qui aura pour nom le nom de ma base de donnée (BDD) [nom de fichier].db (db est une convention pour : 'Data Base'. (Le .db est donc optionnel mais recommandé)
const db = new sqlite3.Database(dbFile); // je crée une nouvelle database du nom de ma variable dbFile (je crée donc le fichier test.db)
const app = express();
const cors = require('cors');
app.use(cors());

db.serialize(() => {
  // serialize permet d'exécuter toute les lignes de commande une à une

  //if (!fs.existsSync(dbFile)) {
  // si dbFile n'as pas été créé je rentre dans mon if

  // run me permet d'écrire des chaînes de caractères et de les envoyer dans mon driver qui va les interpreter comme du SQL
  // CREATE TABLE me permet de créer la BDD (un tableau) du nom products
  // id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT UNIQUE je définis le nom des colonnes de ma BDD, ainsi que le type des éléments des dites colonnes
  // INTEGER = entier / TEXT = chaînes de caractères / PRIMARY KEY (clé primaire) permet d'identifier les différentes tables de ma BDD / "AUTOINCREMENT" permet d'auto-incrémenter l'entier id à chaque fois que je crée une nouvelle ligne à ma table. (/!\ A noter que l'id commence à incrémenter à partir de 1. On commence donc a compte à 1 et non pas à 0)
  // FOREIGN KEY (clé étrangère) permet d'identifier une colonne ou un ensemble de colonnes d'une table comme référençant une colonne ou un ensemble de colonnes d'une autre table
  
  // pour créer une FOREIGN KEY
  // 1- créer une colonne pour la réceptionner -> products_id INTEGER
  // 2- définir cette colonne comme Foreign Key -> FOREIGN KEY(products_id)
  // 3- indiquer à quelle table et quelle colonne fait référence cette Foreign Key
  // -> REFERENCES products(id)

  db.run('CREATE TABLE IF NOT EXISTS products (products_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price NUMBER, img TEXT, like BOOLEAN, )');

  // INSERT INTO [nom de la table] j'insère du contenu dans ma table définie plus haut
  // (name) je dis que je veux introduire quelque chose dans ma variable name
  // VALUES (?), 'sac' je dis que je veux lui donner la valeur 'sac' si je veux donner plusieurs valeur (comme un prix) je doit rajouter un '?' exemple: 'INSERT INTO products (name, prix) VALUES (?, ?), "sac",20 ' (/!\ le (?) est spécifique a SQLite3)
  // j'ai donc créé une nouvelle ligne dans ma table products de ma BDD test.db

  db.run('INSERT INTO products (products_name, price, img, like) VALUES (?, ?, ?, ?)','bag', 10,'images/image0.png', true);
  db.run('INSERT INTO products (products_name, price, img, like) VALUES (?, ?, ?, ?)','top', 25,'images/image1.png', false);
  db.run('INSERT INTO products (products_name, price, img, like) VALUES (?, ?, ?, ?)','shoes', 150,'images/image2.png', false);

  db.run('CREATE TABLE IF NOT EXISTS users (users_id INTEGER PRIMARY KEY AUTOINCREMENT, order NUMBER, name TEXT, products_id INTEGER, FOREIGN KEY(products_id) REFERENCES products(id))');

  db.run('INSERT TO users(name, img) VALUES (?, ?)', 1, 'Julien');
  db.run('INSERT TO users(name, img) VALUES (?, ?)', 10, 'Marie');
  db.run('INSERT TO users(name, img) VALUES (?, ?)', 5,'Paul');
  
  db.run('CREATE TABLE IF NOT EXISTS destination (destination_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, products_id INTEGER, FOREIGN KEY(products_id) REFERENCES products(id))');

  db.run('INSERT TO destination(name) VALUES(?)', 'France');
  db.run('INSERT TO destination(name) VALUES(?)', 'Russie');
  db.run('INSERT TO destination(name) VALUES(?)', 'Australie');
 
  db.run('CREATE TABLE IF NOT EXISTS material (material_id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, products_id INTEGER, FOREIGN KEY(products_id) REFERENCES products(id))');
 
  db.run('INSERT TO material(p) VALUES(?)','leather');
  db.run('INSERT TO material(material_id, pays) VALUES(?)','cotton');
  db.run('INSERT TO material(material_id, pays) VALUES(?)','leather');

  db.all('SELECT * FROM products NATURAL JOIN user');

  //}
  
});

// je sélectionne le prix le plus cher
db.run('SELECT MAX (price) FROM products');
db.all('SELECT * FROM products', function(error, data) {
  // avec SELECT je sélectionne la colonne name de ma table products et je l'affiche
  if (!error) console.log(data);
  // s'il n'y a pas d'error je log ma data sinon je log mes erreurs
  else console.log(error);
});

// à noter que je dois exécuter le dossier js depuis l'invite de commande. Je dois taper node [nom de mon fichier].js
// on doit donc utiliser nodejs pour exécuter du code SQL. A noter qu'à chaque fois que le code va être exécuté, il va recréer une ligne dans la table. Si je ne veux pas recréer de ligne à chaque fois que je veux ravoir un apercu de ce que j'ai fait, je dois mettre le INSERT INTO dans le premier if de sorte a ce qu'il ne soit pas réexécuter à chaque fois
app.get('/', function(request, response) {
  db.all('SELECT * FROM products', function(error, data) {
    response.send(data);
  });
});

app.listen(3000, function(error) {
  if (!error) console.log('app listening port 3000');
});