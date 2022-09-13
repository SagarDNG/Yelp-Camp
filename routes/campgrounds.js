const express = require('express');
const router = express.Router();
const multer = require('multer');

const CatchAsyncError = require('../utilities/catchAsyncError');

const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');

const campgrounds = require('../controllers/campgrounds');

const { storage } = require('../cloudinary');
const upload = multer({ storage });



router.route('/')
    .get(CatchAsyncError(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, CatchAsyncError(campgrounds.createCamp))

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(CatchAsyncError(campgrounds.showCamp))
    .patch(isLoggedIn, isAuthor, upload.array('image'), validateCampground, CatchAsyncError(campgrounds.updateCamp))
    .delete(isLoggedIn, isAuthor, CatchAsyncError(campgrounds.deleteCamp))

router.get('/:id/edit', isLoggedIn, isAuthor, CatchAsyncError(campgrounds.renderEditForm));

module.exports = router