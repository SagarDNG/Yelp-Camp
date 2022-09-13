const mongoose = require('mongoose');
const Review = require('./reviews');

const Schema = mongoose.Schema;


// ===========Virtual property==================================
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
    // we are reducing the size of image to 200
    //this here refers to the perticular image 
});
//We are adding a virtual property, just not to store this thumbnail in our DB, coz, we already have images.url in DB
// ==============================================================

// *************************************************************MAPBOX*************************************************************
// const opts = { toJSON: { virtuals: true } };
// *************************************************************MAPBOX*************************************************************

const CampgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    // *************************************************************MAPBOX*************************************************************
    // geometry: {
    //     type: {
    //         type: String,
    //         enum: ['Point'],
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },
    // *************************************************************MAPBOX*************************************************************

    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
} /* *****MAPBOX******        , opts        *****MAPBOX*******/)

// *************************************************************MAPBOX*************************************************************
// CampgroundSchema.virtual('properties.popUpMarkup').get(function () {
//     return `
//     <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong>
//     <p>${this.description.substring(0, 20)}...</p>`
//     // this here referers to perticular campground
// });
// *************************************************************MAPBOX*************************************************************

/* When we delete a Camp, this below code will delete the reviews associated with that Camp*/
/* Code Start */
CampgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})
/* Code End */

module.exports = mongoose.model('Campground', CampgroundSchema)