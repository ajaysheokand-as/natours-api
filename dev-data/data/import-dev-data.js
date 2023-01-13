const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });
const app = require('./../../app');
// console.log(app.get('env'))

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Connection is Successfull') );

// console.log(process.env);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

// READ JSON FILE 
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

//IMPORT DATA INTO DB
const importData = async ()=>{
    console.log("This is tours", tours);
    try{
        await Tour.create(tours);
        console.log("Data Successfully Imported");
    } catch(err){
        console.log("Error",err)
    }
    process.exit();
}

// DELETE ALL DATA FORM COLLECTION

const deleteData = async () =>{
    try{
        await Tour.deleteMany();
        console.log("Data Deleted Successfully!!")
    }catch(err){
        console.log(err)
    }
}

importData();
// console.log(process.argv);