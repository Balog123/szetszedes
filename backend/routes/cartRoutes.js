const express = require('express');
const router = express.Router();
const dbService = require('../db-config');
const authenticateUser = require('../auth/authUser')

router.get('/', authenticateUser, async (req, res) => {
    try {
        const { kosar_termek_id, kosar_darab } = req.body;
        const userId = req.user.id;
        const db = dbService.getDbServiceInstance();

        const cartItems = await db.getCartItemsByUserId(userId);

        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ success: false, error: "Error fetching cart items" });
    }
});

router.post('/', authenticateUser, async (req, res) => {
    try {
        const { productId, darab } = req.body;
        const userId = req.user.id;
        const db = dbService.getDbServiceInstance();

        const productDetails = await db.getProductById(productId);

        if (!productDetails) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        const { termek_nev, termek_ar } = productDetails;

        const result = await db.addToCart(productId, termek_nev, termek_ar, darab, userId);

        if (result.success) {
            await db.updateProductStock(productId, darab);
            const updatedCartItems = await db.getCartItemsByUserId(userId);
            return res.status(200).json({ success: true, message: "Product added to cart successfully", cartItems: updatedCartItems });
        } else {
            return res.status(500).json({ success: false, error: "Error adding product to cart" });
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ success: false, error: "Error adding product to cart" });
    }
});

module.exports = router;