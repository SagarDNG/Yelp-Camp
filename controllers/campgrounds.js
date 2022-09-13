const Campground = require('../models/campground');

// *************************************************************MAPBOX*************************************************************
// const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
// const mapBoxToken = process.env.MAPBOX_TOKEN;
// const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
// *************************************************************MAPBOX*************************************************************

const { cloudinary } = require("../cloudinary");

module.exports.index = async (req, res) => {
    const camps = await Campground.find({}) /******MAPBOX******         .populate('popupText')         *****MAPBOX*******/;
    res.render('campgrounds/index', { camps });
}

module.exports.renderNewForm = (req, res) => {
    res.render('campgrounds/new')
};

module.exports.createCamp = async (req, res) => {
    // *************************************************************MAPBOX*************************************************************
    // const geoData = await geocoder.forwardGeocode({
    //     query: req.body.camp.location,
    //     limit: 1
    // }).send()
    // *************************************************************MAPBOX*************************************************************

    const camp = new Campground(req.body.camp);

    // *************************************************************MAPBOX*************************************************************
    // camp.geometry = geoData.body.features[0].geometry;
    // *************************************************************MAPBOX*************************************************************

    camp.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    camp.author = req.user._id;
    await camp.save();
    console.log(camp);
    //****************************************************
    // We can use any 1 of the below lines:
    req.flash('success', 'Successfully made a new campground!');
    // res.render('campgrounds/show', { camp });
    res.redirect(`campgrounds/${camp._id}`);

    //****************************************************

};

module.exports.showCamp = async (req, res) => {
    const camp = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    // console.log(camp);
    if (!camp) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { camp });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const camp = await Campground.findById(id)
    if (!camp) {
        req.flash('error', 'Cannot find that campground!');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { camp });
};

module.exports.updateCamp = async (req, res) => {
    const { id } = req.params;
    const camp = await /* new */ Campground.findByIdAndUpdate(id, { ...req.body.camp });
    // i used 'new' keyword in the above line, it took me 2hr (yes, literally) to figure out that :(

    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    camp.images.push(...imgs);
    await camp.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename); // for deleting that perticular image from cloudinary
        }
        await Campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
        // here we are pulling from the images array, all images with a filename of that image present in req.body.deleteImages
    }
    req.flash('success', 'Successfully updated campground!');
    res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.deleteCamp = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground');
    res.redirect('/campgrounds');
};

