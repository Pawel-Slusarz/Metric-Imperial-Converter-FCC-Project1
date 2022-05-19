const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('read input', function(){
    //#1
    test('whole number', function(){
      assert.equal(convertHandler.getNum('5mi'), 5, '5mi should turn into 5');
      
    })
    //#2
    test('decimal number', function(){
      assert.equal(convertHandler.getNum('1.5L'), 1.5, '1.5L should turn into 1.5');
      assert.equal(convertHandler.getNum('12.4.5kg'), 'invalid number', '12.4.5 is not a valid number');
    })
    //#3
    test('fraction', function(){
      assert.equal(convertHandler.getNum('1/2km'), 0.5, '1/2km should be taken in as 0.5');
    })
    //#4
    test('fraction with decimal', function(){
      assert.equal(convertHandler.getNum('5.5/2gal'), 2.75, '5.5/2gal should be evaluated into 2.75');
    })
    //#5
    test('double fraction error', function(){
      assert.equal(convertHandler.getNum('2/4/3gal'), 'invalid number', "Numbers with multiple /'s are invalid.");
    })
    //#6
    test('default to 1', function(){
      assert.equal(convertHandler.getNum('mi'), 1, 'Units with no number should default to 1');
    })
    //#7
    test('valid units', function(){
      assert.equal(convertHandler.getUnit('5mi'), 'mi');
      assert.equal(convertHandler.getUnit('5km'), 'km');
      assert.equal(convertHandler.getUnit('5L'), 'L');
      assert.equal(convertHandler.getUnit('5gal'), 'gal');
      assert.equal(convertHandler.getUnit('5kg'), 'kg');
      assert.equal(convertHandler.getUnit('5lbs'), 'lbs');
    })
    //#8
    test('invalid unit', function(){
      assert.equal(convertHandler.getReturnUnit(convertHandler.getUnit('5min')), 'invalid unit', '5min has an invalid unit');
    })
    //#9
    test('get correct return unit', function(){
      assert.equal(convertHandler.getReturnUnit('mi'), 'km');
      assert.equal(convertHandler.getReturnUnit('km'), 'mi');
      assert.equal(convertHandler.getReturnUnit('L'), 'gal');
      assert.equal(convertHandler.getReturnUnit('gal'), 'L');
      assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
      assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    })
    //#10
    test('get unit string', function(){
      assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
      assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
      assert.equal(convertHandler.spellOutUnit('L'), 'liters');
      assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
      assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
      assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    })
    //#11
    test('gal to L', function(){
      assert.equal(convertHandler.convert(1, 'gal'), 3.78541, '1gal should convert into 3.78541(L)');
    })
    //#12
    test('L to gal', function(){
      assert.equal(convertHandler.convert(1, 'L'), 0.26417, '1L should convert into 0.26417(gal)');
    })
    //#13
    test('mi to km', function(){
      assert.equal(convertHandler.convert(1, 'mi'), 1.60934, '1mi should convert into 1.60934(km)');
    })
    //#14
    test('km to mi', function(){
      assert.equal(convertHandler.convert(1, 'km'), 0.62137, '1km should convert into 0.62137(mi)');
    })
    //#15
    test('lbs to kg', function(){
      assert.equal(convertHandler.convert(1, 'lbs'), 0.45359, '1lbs should convert into 0.45359(kg)');
    })
    //#16
    test('kg to lbs', function(){
      assert.equal(convertHandler.convert(1, 'kg'), 2.20462, '1kg should convert into 2.20462(lbs)');
    })
    
  })
  
});
