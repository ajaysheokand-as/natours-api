const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true
    },
    duration:{
        type: Number,
        required: [true, 'A Tour must have a duration']
    },
    maxGroupSize:{
        type:Number,
        required: [true, 'A tour must have a group size']
    },
    rating: {
        type: Number,
        default: 4.5
    },
    difficulty:{
        type: String,
        required:[true, 'A tour must have a difficulty']
    },
    ratingAverage:{
        type: Number,
        default:4.5
    },
    ratingQuanity:{
        type:Number,
        default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount:Number,
    summary:{
        type: String,
        trim: true,
        required: [true, 'A tour must have summary']
    },
    description:{
        type:String,
        trim:true
    },
    imageCover:{
        type:String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt:{
        type:Date,
        default: Date.now()
    },
    startDates: [Date]
  })

  const Tour = mongoose.model('Tour', tourSchema);

  module.exports = Tour;

//   id: 0,
//     name: 'The Forest Hiker',
//     duration: 5,
//     maxGroupSize: 25,
//     difficulty: 'easy',
//     ratingsAverage: 4.7,
//     ratingsQuantity: 37,
//     price: 397,
//     summary: 'Breathtaking hike through the Canadian B
// anff National Park',
//     description: 'Ut enim ad minim veniam, quis nostru
// d exercitation ullamco laboris nisi ut aliquip ex ea c
// ommodo consequat. Duis aute irure dolor in reprehender
// it in voluptate velit esse cillum dolore eu fugiat nul
// la pariatur.\n' +
//       'Lorem ipsum dolor sit amet, consectetur adipisi
// cing elit, sed do eiusmod tempor incididunt ut labore 
// et dolore magna aliqua. Excepteur sint occaecat cupida
// tat non proident, sunt in culpa qui officia deserunt m
// ollit anim id est laborum.',
//     imageCover: 'tour-1-cover.jpg',
//     images: [ 'tour-1-1.jpg', 'tour-1-2.jpg', 'tour-1-
// 3.jpg' ],
//     startDates: [ '2021-04-25,10:00', '2021-07-20,10:0
// 0', '2021-10-05,10:00' ]