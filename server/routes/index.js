var express = require('express');
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

var router = express.Router();

//Function used to open correct database
async function openDb () {
  return sqlite.open({
      filename: '../data/humboldtCrystals.db',
      driver: sqlite3.Database
  });
}


//Function used to fetch all articles from database
async function getArticles(db) {
  return await db.all('SELECT * FROM catalog');
}


// Function used by POST to add new item to database
async function insertArticle(db, title, description, price, image) {
  // The sqlite command used to store a new item
  const sql =  `
      INSERT INTO catalog (
        title,
        description,
        price,
        image
      )
      VALUES (
        :title,
        :description,
        :price,
        :image
      )`;

  // Params used to avoid sql injection vulnerability
  const params = {
    ':title': title,
    ':description': description,
    ':price': price,
    ':image': image
  };

  // Use "run" to post new item
  const result = await db.run(sql, params);
  return result;
};


/* GET all Articles */
router.get('/', async function(req, res, next) {
  const db = await openDb();
  const articles = await getArticles(db);
  return res.json({response: articles});
});


/* POST new article */
router.post('/', async function(req, res) {
  const db = await openDb();
  const articles = await insertArticle(db, req.body.title, req.body.description, req.body.price, req.body.image);
  return res.json({response: articles});
  });

module.exports = router;
