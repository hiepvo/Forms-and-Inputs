/**
 * Created by hiepvo on 9/7/16.
 */
//level 8
var form  = document.getElementById('login');
var email = document.getElementById('email');
var errorMessage = document.getElementById('errorMessage');
var errors       = [];


form.addEventListener('submit', function(event){

  event.preventDefault();
  errors.splice(0, errors.length);
  errorMessage.innerHTML = '';

  if(validator.isEmpty(email.value)){
    errors.push('Email is required');
  }

  if(!validator.isEmailAddress(email.value)){
    errors.push('Email is not correct')
  }

  errors.forEach(function(error){
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(error));
    errorMessage.appendChild(li);
  })

}, false);

// level 9,10,11
