const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "ohh, No! connection error:"));
db.once("open", () => {
    console.log("Hello, our DataBase is now connected in seeds dir. :)");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    price = Math.floor(Math.random() * 1000 + 1000);
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '62ea740e7f588df394498a85',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price,
            //*************************************************************MAPBOX*************************************************************
            // geometry: {
            //     type: "Point",
            //     coordinates: [
            //         cities[random1000].longitude,
            //         cities[random1000].latitude,
            //     ]
            // },
            //*************************************************************MAPBOX*************************************************************
            images: [
                {
                    url: 'https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1500&q=60',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://images.unsplash.com/photo-1492648272180-61e45a8d98a7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8Y2FtcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1500&q=60',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, nemo tempora! Non, quibusdam repellendus. Expedita ea, vel aliquid in odio officiis provident velit voluptate quasi inventore optio quos quis. Consequatur?'
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
