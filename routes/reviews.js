const express = require('express');
const router = express.Router({ mergeParams: true });

const CatchAsyncError = require('../utilities/catchAsyncError');

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, CatchAsyncError(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, CatchAsyncError(reviews.deleteReview));

module.exports = router