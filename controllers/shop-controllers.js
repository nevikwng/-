const db = require("../mySql-connect");
const HttpError = require("../models/http-error");

const getShopItems = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM items");
  res.json(rows);
};

const getShopCollection = async (req, res) => {
  try {
    const collectionId = req.params.collection;
    const [rows] = await db.query("SELECT * FROM items");
    if (!rows) return next("Can't find shop item", 404);
    res.json({ collection: rows });
  } catch (err) {
    return next(new HttpError("Can't find shop item of collection", 404));
  }
};

const getShopItemByItemId = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log(itemId);
    const [row] = await db.query(`SELECT * FROM items WHERE itemId=${itemId}`);
    if (!row) return next("Can't find shop item", 404);
    res.json({ shopItem: row });
  } catch (err) {
    return next(new HttpError("Can't find shop item", 404));
  }
};

module.exports = { getShopItems, getShopCollection, getShopItemByItemId };
