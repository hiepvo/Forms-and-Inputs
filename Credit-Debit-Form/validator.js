/**
 * Created by hiepvo on 9/7/16.
 */
(function(window){
  var validator = {};

  //Checks if the input parameter has leading or trailing whitespaces or too many spaces between words.
  validator.isTrimmed = function(input){
    if(input === null || input === undefined) return false;
    var arr = input.split(' ');
    if(arr[0] === '' || arr[arr.length - 1] === '') return false;
    return arr.indexOf('') === -1;

  };

  //Checks if the input string is an HSL color, such as hsl(122, 1, 1)
  validator.isHSL = function(input){
    if(input === null || input === undefined) return false;

    if(input.substring(0, 3) !== 'hsl') return false;
    if(input.indexOf('(') === -1) return false;
    if(input.lastIndexOf(')') === -1) return false;
    var num = input.substring(input.indexOf('(') + 1, input.lastIndexOf(')'));
    var arr = num.split(',');
    if(arr.length !== 3) return false;
    if(arr[0] < 0 || arr[0] > 360) return false;
    if(arr[1] < 0 || arr[1] > 1) return false;
    if(arr[2] < 0 || arr[2] > 1) return false;
    return true;
  };

  //Checks if the input string is an RGB color, such as rgb(200, 26, 131).
  validator.isRGB = function(input){
    if(input === null || input === undefined) return false;

    if(input.substring(0, 3) !== 'rgb') return false;
    if(input.indexOf('(') === -1) return false;
    if(input.lastIndexOf(')') === -1) return false;
    var num = input.substring(input.indexOf('(') + 1, input.lastIndexOf(')'));
    var arr = num.split(',');
    var i   = 0;
    for(i; i < arr.length; i++){
      if(isNaN(arr[i])) return false;
      if(arr[i] < 0 || arr[i] > 255) return false;
    }
    return true;
  };

  //Checks if the input string is a hexadecimal color, such as #3677bb.
  validator.isHex = function(input){
    if(input === null || input === undefined) return false;

    var hex = '0123456789abcdef';
    if(input.indexOf('#') === 0){
      input = input.substring(1);
    } else{
      return false;
    }
    if(input.length !== 6 && input.length !== 3) return false;
    var i = 0;
    for(i; i < input.length; i++){
      if(hex.indexOf(input[i].toLowerCase()) === -1) return false;
    }
    return true;
  };

  //Checks if the input parameter is a hex, RGB, or HSL color type.
  validator.isColor = function(input){
    return (validator.isHex(input) || validator.isRGB(input) || validator.isHSL(input));
  };

  //Checks if the input parameter is a credit card or bank card number.
  validator.isCreditCard = function(input){
    if(input === null || input === undefined) return false;

    var check = function(input){

      if(input.length = 0 || input.length < 16 || input.length > 16) return false;
      else return !!validator.isAlphanumeric(input);
    };

    if(input.indexOf('-') === -1){
      return check(input);
    }

    var arr = input.split('-');
    if(arr.length < 4) return false;
    else{
      var num = arr.join('');
      return check(num);
    }
  };

  //Checks that the input parameter string is only composed of the following characters: a—z, A—Z, or 0—9.
  validator.isAlphanumeric = function(input){
    if(input === null || input === undefined) return false;

    var alphaNum = 'abcdefghijklmnopqrstuvwxyz0123456789';
    if(input === '') return true;
    var i = 0;
    for(i; i < input.length; i++){
      if(alphaNum.indexOf(input[i].toLowerCase()) === -1){
        return false;
      }
    }
    return true;
  };

  //Check that the input parameter is only number
  validator.isNumber = function(input){
    return (!isNaN(input));
  };

  //Counts the number of words in the input parameter.
  validator.countWords = function(input){
    if(input === null || input === undefined) return false;

    input   = input.replace(/[.,\/#!$%\^&*;':{}=\-_`~()\\"]]/g, ' ');
    var arr = input.split(' ');
    var i   = 0;
    var cnt = 0;
    for(i; i < arr.length; i++){
      if(arr[i] !== '') cnt++;
    }
    return cnt;
  };

  //Checks that the input parameter matches all of the following:
  //input is greater than or equal to the floor parameter
  //input is less than or equal to the ceil parameter.
  validator.isBetween = function(input, floor, ceil){
    if(input === null || input === undefined) return false;

    var cnt = validator.countWords(input);
    return !!(cnt >= floor && cnt <= ceil);

  };

  //Checks if the input parameter has a word count greater than or equal to the n parameter.
  validator.moreWordsThan = function(input, n){
    if(input === null || input === undefined) return false;
    return validator.countWords(input) >= n;

  };
  //Checks if the input parameter has a word count less than or equal to the n parameter.
  validator.lessWordsThan = function(input, n){
    if(input === null || input === undefined) return false;

    return validator.countWords(input) <= n;

  };

  //Checks if the input parameter’s character count is greater than or equal to the n parameter.
  validator.isOfLength = function(input, n){
    if(input === null || input === undefined) return false;

    var cnt = input.length;
    return cnt >= n;

  };

  //Checks if the input parameter’s character count is less than or equal to the n parameter.
  validator.isLength = function(input, n){
    if(input === null || input === undefined) return false;

    var cnt = input.length;
    return cnt <= n;

  };

  //Checks that the input text parameter contains only strings found within the strings array.
  validator.isComposedOf = function(str, words){
    if(str === null || str === undefined) return false;

    var newWords = words.join('').replace(/[.,\/#!$%\^&*;':{}=\-_`~()\\"]/g, '');
    var newStr   = str.replace(/[.,\/#!$%\^&*;':{}=\-_`~()\\ "]/g, '');
    var i        = 0;
    var unique   = [];
    for(i; i < newWords.length; i++){
      if(unique.indexOf(newWords[i]) === -1){
        unique.push(newWords[i]);
      }
    }
    var j = 0;
    for(j; j < newStr.length; j++){
      if(unique.indexOf(newStr[j]) === -1){
        return false;
      }
    }
    return true;
  };

  //Checks if the input text parameter does not contain any of the words within the words array.
  validator.lacks = function(str, words){
    if(str === null || str === undefined) return false;

    str     = str.replace(/[.,\/#!$%\^&*;:{}=\-_`~()\\"]/g, ' ');
    var arr = str.split(' ');
    var i   = 0;
    for(i; i < arr.length; i++){
      var j = 0;
      for(j; j < words.length; j++){
        if(arr[i].toLowerCase() === words[j].toLowerCase()) return false;
      }
    }
    return true;
  };

  //Checks if the input text parameter contains one or more of the words within the words array.
  validator.contains = function(str, words){
    if(str === null || str === undefined) return false;

    str     = str.replace(/[.,\/#!$%\^&*;:{}=\-_`~()\\"]/g, ' ');
    var arr = str.split(' ');
    var i   = 0;
    for(i; i < arr.length; i++){
      var j = 0;
      for(j; j < words.length; j++){
        if(arr[i].toLowerCase() === words[j].toLowerCase()) return true;
      }
    }
    return false;
  };

  //Checks the input parameter and returns true if it is an empty string.
  validator.isEmpty = function(input){
    if(input === null || input === undefined) return true;
    var removeWS = function(input){
      return input.replace(/ /g, '');
    };

    return removeWS(input).length === 0;

  };

  //Checks if the input parameter is a date that comes after today.
  validator.isAfterToday = function(date){
    var now   = Date.now();
    var date1 = Date.parse(date);
    return date1 - now >= 0;

  };

  //Checks if the input parameter is a date that comes before today.
  validator.isBeforeToday = function(date){
    var now   = Date.now();
    var date1 = Date.parse(date);
    return date1 - now <= 0;

  };

  //Checks if the input parameter text is a valid date.
  validator.isDate = function(strDate){
    var date = Date.parse(strDate.replace(/-/g, '/'));
    return !(date === 'Invalid Date' || isNaN(date));

  };

  //Returns the input parameter text with all symbols removed. Symbols refer to any non-alphanumeric character
  validator.withoutSymbols = function(str){
    if(str === null || str === undefined) return false;

    var nonAlphaNum = "\\|!@#&()-_[{}]:;',?/*`~$^+=<>\"";
    var i           = 0;
    var newStr      = '';
    for(i; i < str.length; i++){
      var c = str.charAt(i);
      //noinspection JSUnresolvedFunction
      if(nonAlphaNum.includes(c) === false){
        newStr += c;
      }
    }
    return newStr;
  };

  //Checks if the input parameter is a valid phone number.
  validator.isPhoneNumber = function(phone){
    if(phone === null || phone === undefined) return false;

    var validChars = "()-";

    /// helper funciton///
    var removeValidChars = function(phone){
      var i = 0;
      for(i; i < phone.length; i++){
        if(validChars.indexOf(phone[i]) !== -1) phone = phone.replace(phone[i], '');
      }
      return phone;
    };

    var isInt    = function(str){
      var i = 0;
      for(i; i < str.length; i++){
        var c = str.charAt(i);
        if(((c < "0") || (c > "9"))) return false;
      }
      return true;
    };
    var removeWS = function(phone){
      var i = 0;
      for(i; i < phone.length; i++){
        if(phone[i] === ' '){
          phone = phone.replace(phone[i], '');
        }
      }
    };
    //****************//

    if(phone.indexOf("+") > 0) return false;

    if(phone.indexOf("+") === 0) phone = phone.substring(2);

    if(phone.indexOf("(") === -1 && phone.indexOf(")") !== -1) return false;
    if(phone.indexOf("(") !== -1 && phone.indexOf(")") === -1) return false;

    phone = phone.replace(/\s+/g, ''); //remove all whitespace
    phone = removeValidChars(phone);
    if(!isInt(phone)) return false;

    return !((phone.length < 10 && phone.length !== 7) || phone.length > 11);


  };

  //Checks if the input parameter is an email address.
  validator.isEmailAddress = function(email){

    if(email === null || email === undefined || email.length === 0){
      return false
    }
    var specialChars = "[,\/#!$%\^&\*;\":\"{}=\`~()]";
    var filter       = function(arr, callback){
      var result = [];
      for(var i = 0; i < arr.length; i++){
        if(callback(arr[i])){
          result.push(arr[i]);
        }
      }
      return result;
    };

    if(email.indexOf('@') === -1) return false;
    var local  = email.substring(0, email.lastIndexOf('@'));
    var domain = email.substring(email.lastIndexOf('@') + 1, email.length);

    //check domain part
    if(domain.indexOf('.') === -1 || domain.indexOf(' ') > 0 || domain.charAt(domain.indexOf('.') + 1) === '.') //double dot after @)
      return false;
    else{
      var domainArr = domain.split('.');
      var tld       = domainArr[domainArr.length - 1];
      if(tld < 2) return false;
    }
    //check local part
    if((local.charAt(local.indexOf('.') + 1)) === '.') //double dot before @)
      return false;

    var filteredChars = filter(specialChars, function(item){
      //noinspection JSUnresolvedFunction
      if(local.includes(item)) return item;
    });

    if(local.indexOf(' ') > 0 || local.indexOf(filteredChars[0]) > 0 || local.indexOf('@') > 0){
      //noinspection JSUnresolvedFunction
      return !!(local.startsWith("\"") && local.endsWith("\""));
    }
    //end check local part
    return true;
  };
  window.validator         = validator;
})(window);
