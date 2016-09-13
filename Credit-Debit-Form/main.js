/**
 * Created by hiepvo on 9/7/16.
 */
//level 8
var form         = document.getElementById('credit-form');
var card         = document.getElementById('card-number');
var cvs          = document.getElementById('cvs');
var namecard     = document.getElementById('name');
var errorMessage = document.getElementById('errorMessage');
var errors       = [];

form.addEventListener('submit', function(event){
  if(!this.checkValidity()){
    event.preventDefault();

    errors.splice(0, errors.length);
    errorMessage.innerHTML = '';
    if(validator.isEmpty(namecard.value)){
      errors.push('Name on Card is required');
    }

    if(validator.isEmpty(card.value)){
      errors.push('Card number is required');
    }

    if(validator.isEmpty(cvs.value)){
      errors.push('The CVS number is required');
    }
    else if(!validator.isNumber(cvs) || cvs.length < 3){
      errors.push('The CVS is not correct')
    }

    if(!validator.isCreditCard(card.value)){
      errors.push('The Credit card number is not correct');
    }

    errors.forEach(function(error){
      var li = document.createElement('li');
      li.appendChild(document.createTextNode(error));
      errorMessage.appendChild(li);
    })
  }
}, false);

// level 9,10,11
