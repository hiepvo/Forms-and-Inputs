/**
 * Created by hiepvo on 9/7/16.
 */
var cardForm = document.getElementById('credit-form');
var cardInput = document.getElementById('card-number');
cardForm.addEventListener('submit', submit);

function submit(){
  event.preventDefault();
  if (!validator.isCreditCard(cardInput.value)) {
    cardForm.className = 'invalid';
  }
  else{
    cardForm.className = 'valid';
  }
}
