const express = require('express');
const router = express.Router();
const dbService = require('../db-config');


router.post('/admin/feltoltes', (req, res) => {
    const { kategoria, kep_url, nev, ar, leiras, szelesseg, magassag, hossz, raktaron } = req.body
    const db = dbService.getDbServiceInstance()

    const result = db.termekFeltoltes(kategoria, kep_url, nev, ar, leiras, szelesseg, magassag, hossz, raktaron)

    result
        .then((data) => {
            res.status(200).json({ success: true, data })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, error: 'Szerveroldali hiba történt' })
        })
})

router.get('/admin/megjelenites', (req, res) => {
    const db = dbService.getDbServiceInstance();

    db.termekAdminMegjelenites()
        .then(data => res.status(200).json({ success: true, data }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, error: 'Szerveroldali hiba történt' });
        });
});

router.patch('/admin/modositas', (request, response) => {
    const { id, ar } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.termekArModositas(id, ar);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

module.exports = router;