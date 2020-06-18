const db = require("../mySql-connect");
const HttpError = require("../models/http-error");

const getShopItems = async (req, res) => {
  const [rows] = await db.query("SELECT * FROM shopitems");
  const data = rows.filter((row, idx) => idx < 8);
  res.json({ collection: data });
};

const getShopCollection = async (req, res, next) => {
  try {
    const collectionId = req.params.collection;
    const [rows] = await db.query(
      `SELECT * FROM shopitems WHERE itemCollection like '%${collectionId}%'`
    );
    // console.log(rows);
    if (!rows) return next("Can't find shop item", 404);
    res.json({ collection: rows });
  } catch (err) {
    return next(new HttpError("Can't find shop item of collection", 404));
  }
};

const getShopItemTpye = async (req, res, next) => {
  try {
    const itemType = req.params.itemType;
    // console.log(itemType);
    const [rows] = await db.query(
      `SELECT * FROM shopitems WHERE itemType like '%${itemType}%'`
    );
    // console.log(rows);
    if (!rows) return next("Can't find shop item", 404);
    res.json({ collection: rows });
  } catch (err) {
    return next(new HttpError("Can't find shop item of collection", 404));
  }
};

const getShopItemByItemId = async (req, res, next) => {
  try {
    const itemId = req.params.itemId;
    // console.log(itemId);
    const [row] = await db.query(
      `SELECT * FROM shopitems WHERE itemId=${itemId}`
    );
    if (!row) return next("Can't find shop item", 404);
    res.json({ shopItem: row });
  } catch (err) {
    return next(new HttpError("Can't find shop item", 404));
  }
};

module.exports = {
  getShopItems,
  getShopCollection,
  getShopItemTpye,
  getShopItemByItemId,
};