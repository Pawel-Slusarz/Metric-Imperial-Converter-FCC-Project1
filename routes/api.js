'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

const bodyParser  = require('body-parser');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  //Get request for the form input
  app.route('/api/convert').get((req, res)=>{
    let {input} = req.query;

    //Sets variables using convertHandler
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnUnit = convertHandler.getReturnUnit(initUnit);

    //Checks if number or unit is invalid
    if(initNum === 'invalid number' && returnUnit === 'invalid unit'){
      return res.json('invalid number and unit');
    }
    else if(initNum === 'invalid number'){
      return res.json('invalid number');
    }
    else if(returnUnit === 'invalid unit'){
      return res.json('invalid unit');
    }

    //Convert the number 
    let returnNum = convertHandler.convert(initNum, initUnit);
    
    //Sets the string using variables
    let result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
    return res.json({
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: result
    })
  })
  
};
