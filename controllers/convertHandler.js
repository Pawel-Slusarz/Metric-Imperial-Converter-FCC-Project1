function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = input.match(/[.\d\/]+/g) || ['1']
    nums = result[0].split('/')
    
    if (nums.length > 2) {
      return undefined
    }

    let num1 = nums[0]
    let num2 = nums[1] || '1'
    
    result = parseFloat(num1) / parseFloat(num2)

    if (isNaN(num1) || isNaN(num2)) {
      return undefined
    }

    console.log('num result', result)
    
    return result;
  };
  
  this.getUnit = function(input) {
    console.log('here in getUnit!')
    try {
      let result = input.match(/[a-zA-Z]+/g)[0]
      console.log('unit result', result)

    switch(result.toLowerCase()) {
      case 'gal':
        return 'gal'
        break
      case 'l':
        return 'L'
        break
      case 'lbs':
        return 'lbs'
        break
      case 'kg':
        return 'kg'
        break
      case 'mi':
        return 'mi'
        break
      case 'km':
        return 'km'
        break
      default:
        return undefined
    }
    }
    catch(e) {
      return undefined
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = 'L'
        break
      case 'l':
        result = 'gal'
        break
      case 'lbs':
        result = 'kg'
        break
      case 'kg':
        result = 'lbs'
        break
      case 'mi':
        result = 'km'
        break
      case 'km':
        result = 'mi'
        break
      default:
        result = undefined
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit.toLowerCase()) {
      case 'gal':
        result = 'gallons'
        break
      case 'l':
        result = 'liters'
        break
      case 'lbs':
        result = 'pounds'
        break
      case 'kg':
        result = 'kilograms'
        break
      case 'mi':
        result = 'miles'
        break
      case 'km':
        result = 'kilometers'
        break
      default:
        result = undefined
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit.toLowerCase()) {
      case 'gal':
        result = initNum * galToL
        break
      case 'l':
        result = initNum / galToL
        break
      case 'lbs':
        result = initNum * lbsToKg
        break
      case 'kg':
        result = initNum / lbsToKg
        break
      case 'mi':
        result = initNum * miToKm
        break
      case 'km':
        result = initNum / miToKm
        break
      default:
        result = undefined
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let initial_Units = this.spellOutUnit(initUnit)
    let return_Units = this.spellOutUnit(returnUnit)

    return result = `${initNum} ${initial_Units} converts to ${returnNum} ${return_Units}`
  };
  
}

module.exports = ConvertHandler;
