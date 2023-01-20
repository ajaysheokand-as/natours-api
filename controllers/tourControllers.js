// const fs = require('fs');
const { query } = require('express');
const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
try{
  //BUILD THE QUERY
  // 1A) Filtring
  const queryObj = {...req.query};
  const excludeFields = ['page','sort', 'limit', 'fields'];
  excludeFields.forEach(el=> delete queryObj[el]);

  //1B) Advance Filtring
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt| lte| lt)\b/g, match=>`$${match}`);
  console.log("Query String", JSON.parse(queryStr));
  //{difficulty: 'easy', duration: {$gte:5}}
  //{difficulty: 'easy', duration: {gte:'5'}}
  // gte, gt, lte, lt

  // let query = await Tour.find();
  // const tours = await Tour.find().where('duratioin').equals(5).where('difficulty').equals('easy');

  //2) Sorting
  //  if(req.query.sort){
  //   query = await Tour.find().sort(req.query.sort);
  //  }

  // 3) Field limiting
  // if(req.query.fields){
  //   const fields = req.query.fields.split(',').join(' ');
  //   query = await Tour.find().select(fields);
  // }else{
  //   query = query.select('-__v');
  // }

  // 4) Pagination
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 100;
  const skip = (page-1) * limit;
  //  page=2&limi=10, 1-10
  const query = await Tour.find().skip(skip).limit(limit);

  if(req.query.page){
    const numTours = await Tour.countDocuments();
    if(skip>=numTours) throw new Error('This page does ot exist');
  }

  //EXECUTE THE QUERY
  const tours = await query;

  //SEND RESPONSE
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: { tours: tours },
  });
} catch(err){
  res.status(404).json({
    status: "failed",
    message: err
  })
}
 
};

exports.getTour = async (req, res) => {
  try{
    const tour = await Tour.findById(req.params.id); 

    res.status(200).json({
      status: 'Success',
      data: { tours: tour },
    });
  } catch(err){
    res.status(404).json({
      status: "failed",
      message: err
    })
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log('This is err');
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
  //////////////////////////////////////////////////
  // const newTour = new Tour({

  // })
  // newTour.save();
  //////////////////////////////////////////////////
  // console.log(req.body);
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: 'Success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
  // res.send("Done");
};

exports.updateTour = async (req, res) => {
  try{
   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new:true,
      runValidators: true
    })
    res.status(200).json({
    status: 'Success',
    data: {
      tour
    },
  });
  } catch(err){
  res.status(404).json({
    status: "failed",
    message: err
  })
}
  // res.status(200).json({
  //   status: 'Success',
  //   data: {
  //     tour: '<Updated tour is Here>',
  //   },
  // });
};

exports.deleteTour = async (req, res) => {
  try{
    const tourRemoved = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  } catch(err){
    res.status(404).json({
      status: "failed",
      message: err
    })
  }
  
};
