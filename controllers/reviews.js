const Campground = require('../models/campground');
const Review = require('../models/reviews');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const review = new Review(req.body.review);
    review.author = req.user._id;
    const camp = await Campground.findById(id);
    camp.reviews = camp.reviews.concat([review]);
    await review.save();
    await camp.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/campgrounds/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Review.findByIdAndRemove(reviewId);
    const camp = await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    req.flash('success', 'Successfully deleted a review!');
    res.redirect(`/campgrounds/${camp._id}`);
};