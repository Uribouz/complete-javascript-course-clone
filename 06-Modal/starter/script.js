'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const ESCAPE_KEY = 'Escape';
// Only select first element
// const btnsOpenModal = document.querySelector('.show-modal');

// Select all elements with the same class name, as an array
const btnsOpenModal = document.querySelectorAll('.show-modal');

const closeModal = function() {
    console.log('closeModal');
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

const openModal = function() {
    console.log('openModal');
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

// console.log(btnsOpenModal);

for (let i = 0; i < btnsOpenModal.length; i++) {
    btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function(e) {
    console.log(e.key);
    if (e.key === ESCAPE_KEY
        && !modal.classList.contains('hidden')) {
        closeModal();
    }
});