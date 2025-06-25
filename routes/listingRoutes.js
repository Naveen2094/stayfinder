const express = require('express');
const router = express.Router();

const {
  getAllListings,
  getListingById,
  createListing,
  updateListing,
  deleteListing
} = require('../controllers/listingController');

const authMiddleware = require('../middleware/authMiddleware'); // import as default

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post('/', authMiddleware, createListing);      // use authMiddleware directly
router.put('/:id', authMiddleware, updateListing);
router.delete('/:id', authMiddleware, deleteListing);

module.exports = router;
