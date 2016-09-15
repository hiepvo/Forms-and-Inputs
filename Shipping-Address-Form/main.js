/**
 * Created by hiepvo on 9/7/16.
 */
//level 8
var form    = document.getElementById('order');
var fName   = document.getElementById('fName');
var lName   = document.getElementById('lName');
var address = document.getElementById('address');

var email = document.getElementById('email');
var phone = document.getElementById('phone');

var errorMessage = document.getElementById('errorMessage');
var errors       = [];

form.addEventListener('submit', function(event){
  event.preventDefault();
  errors.splice(0, errors.length);
  errorMessage.innerHTML = '';

  if(validator.isEmpty(fName.value)){
    errors.push('First Name is required');
  }
  if(validator.isEmpty(lName.value)){
    errors.push('Last Name is required');
  }

  if(validator.isEmpty(address.value)){
    errors.push('Address is required');
  }

  if(validator.isEmpty(phone.value)){
    errors.push('Phone Number is required');
  }

  if(!validator.isPhoneNumber(phone.value)){
    errors.push('Phone Number is not correct');
  }


  errors.forEach(function(error){
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(error));
    errorMessage.appendChild(li);
  })

}, false);

// level 9,10,11
