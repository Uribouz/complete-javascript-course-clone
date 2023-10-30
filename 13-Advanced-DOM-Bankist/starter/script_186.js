'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault(); //Prevent scrolling to the top when click on a link
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


console.log(document.documentElement);
console.log(document.documentElement.head);
console.log(document.documentElement.body);

const header = document.querySelector('.header')
console.log(header);
console.log(document.getElementById('section--1'));


//When delete section in html, allSections length still the same.
const allSections = document.querySelectorAll('.section');
console.log(allSections);

//When delete button in html, allButtons length also decrease.
const allButtons = document.getElementsByTagName('button')
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//Creating and inserting elements.
const message = document.createElement('div');
message.classList.add('cookie-message');

//Add text to the message
// message.textContent = 'We use cookies for imroved functionality and analytics.';

//Or Add HTML to the message
message.innerHTML = `We use cookies for imroved functionality and analytics. 
<button class="btn btn--close-cookie">Got it!</button>`;

//1. Add element message as the first child to the header
header.prepend(message);

//2. Add element message as the last child to the header
header.append(message);

//These two(1,2) steps move message from first child to last child.

//If want to make a copy of the message use cloneNode
// header.prepend(message.cloneNode(true));

//3. Add element message before the header
header.before(message);

//4.Add element message after the header
header.after(message);

//These two(3,4) steps move message from before the header, to after the header.

document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();
  //Old way to remove element: (Dom Travesing)
  // message.parentElement.removeChild(message);
})