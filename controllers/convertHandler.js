function ConvertHandler() {
  
  //Gets the initial number from the input. Need to see how the input comes in 
  this.getNum = function(input) {
    //if there are no letters, there are no units so we return invalid 
    if(input.match(/[a-z]/i) === null){
      return 'invalid unit'
    }

    //find the index of the first letter, and take everything before that.
    let index = input.match(/[a-z]/i).index;
    let result = input.slice(0, index);

    //if there is no number before the units, we default to 1
    if(!result){
      return 1;
    }
    //if there are multiple divisions (/), it is invalid
    if((result.match(/[\/]/g) || []).length > 1){
      return 'invalid number'
    }
    //else if there is one division, we evaluate
    else if(/[\/]/.test(result)){
      result = eval(result);
    }
    //if the current result is still not a number, return invalid
    if(isNaN(result)){
      return 'invalid number';
    }
    return parseFloat(result);
  };
  
  this.getUnit = function(input) {
    //Again, check if there are no units. If so, return invalid.
    if(input.match(/[a-z]/i) === null){
      return 'invalid unit'
    }
    //find the index again, but take everything after it.
    let index = input.match(/[a-z]/i).index;
    let result = input.slice(index);

    //check for liters, and make sure it is uppercased
    if(result === 'L' || result === 'l'){
      return result.toUpperCase();
    }
    //otherwise return lowercased
    return result.toLowerCase();
  };
  
  //takes initial unit type, and converts metric to imperial and vice versa
  this.getReturnUnit = function(initUnit) {
    let result ;
    switch(initUnit){
      case 'gal': result = 'L';
        break;
      case 'L': result = 'gal';
        break;
      case 'lbs': result = 'kg';
        break;
      case 'kg': result = 'lbs';
        break;
      case 'mi': result = 'km';
        break;
      case 'km': result = 'mi';
        break;
      //If the unit is none of the above, it is invalid.
      default: result = 'invalid unit'
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch(unit){
      case 'gal': result = 'gallons';
        break;
      case 'L': result = 'liters';
        break;
      case 'lbs': result = 'pounds';
        break;
      case 'kg': result = 'kilograms';
        break;
      case 'mi': result = 'miles';
        break;
      case 'km': result = 'kilometers';
        break;    
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit){
      case 'gal': result = initNum * galToL;
        break;
      case 'L': result = initNum / galToL;
        break;
      case 'lbs': result = initNum * lbsToKg;
        break;
      case 'kg': result = initNum / lbsToKg;
        break;
      case 'mi': result = initNum * miToKm;
        break;
      case 'km': result = initNum / miToKm;
        break;
    }
    //result should be rounded to 5 decimal places, but returned as a number
    result = result.toFixed(5);
    return parseFloat(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initUnitString = this.spellOutUnit(initUnit);
    let returnUnitString = this.spellOutUnit(returnUnit);
    
    let result = `${initNum} ${initUnitString} converts to ${returnNum} ${returnUnitString}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
