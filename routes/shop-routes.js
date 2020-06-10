const express = require("express");

const {
  getShopItems,
  getShopCollection,
  getShopItemByItemId,
} = require("../controllers/shop-controllers");

const router = express.Router();

router.get("/", getShopItems);
router.get("/:collection", getShopCollection);
router.get("/detail/:itemId", getShopItemByItemId);

module.exports = router;
