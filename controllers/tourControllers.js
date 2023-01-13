// const fs = require('fs');
const { query } = require('express');
const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
try{
  //BUILD THE QUERY
  // 1) Filtring
  const queryObj = {...req.query};
  const excludeFields = ['page','sort', 'limit', 'fields'];
  excludeFields.forEach(el=> delete queryObj[el]);

  //2) Advance Filtring
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt| lte| lt)\b/g, match=>`$${match}`);
  console.log("Query String", JSON.parse(queryStr));
  //{difficulty: 'easy', duration: {$gte:5}}
  //{difficulty: 'easy', duration: {gte:'5'}}
  // gte, gt, lte, lt

  const query = await Tour.find(JSON.parse(queryStr));
  // const tours = await Tour.find().where('duratioin').equals(5).where('difficulty').equals('easy');

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
