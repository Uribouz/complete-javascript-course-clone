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

//186 .............................................................
// console.log(document.documentElement);
// console.log(document.documentElement.head);
// console.log(document.documentElement.body);

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
// header.prepend(message);

//2. Add element message as the last child to the header
header.append(message);

//These two(1,2) steps move message from first child to last child.

//If want to make a copy of the message use cloneNode
// header.prepend(message.cloneNode(true));

//3. Add element message before the header
// header.before(message);

//4.Add element message after the header
// header.after(message);

//These two(3,4) steps move message from before the header, to after the header.

document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove();
  //Old way to remove element: (Dom Travesing)
  // message.parentElement.removeChild(message);
})

//187 .............................................................

// 'inline' style
// message.style.backgroundColor = '#37373d';
// message.style.width = '120%';

// //Cannot get a style from the class
// console.log(message.style.height);
// //Can only get the style we set as 'inline'
// console.log(message.style.backgroundColor);

// //Use getComputedStyle to get the style attribute we need.
// console.log(getComputedStyle(message).height);
// console.log(getComputedStyle(message).backgroundColor);


// //Does not work because getComputedStyle(message).height is a string.
// message.style.height = getComputedStyle(message).height +30 + 'px';
// console.log(getComputedStyle(message).height);

// //Must parse string to number/float first to be able to calculate
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';
// console.log(getComputedStyle(message).height);

//Alter native way to set style (more complex)
//Change style --color-primary that sit in root by accessing documentElement {
// document.documentElement.style.setProperty('--color-primary',
// 'orangered');


// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.className);


// //Non-standard: Cannot read an attribute that is not common from 'img'.
// console.log(logo.designer);
// //Must use getAttribute to get the 'designer' attribute.
// console.log(logo.getAttribute('designer'));


// //Set the attribute way 1
// logo.alt = 'Beautiful minimalist logo';
// //Set the attributee way 2
// logo.setAttribute('company', 'Bankist');

// //Absolute path to the image file.
// console.log(logo.src);
// //Local path to the image file.
// console.log(logo.getAttribute('src'));



// const link = document.querySelector('.btn--show-modal');
// //Absolute path to href.
// console.log(link.href);
// //Local path to href.
// console.log(link.getAttribute('href'));


// // Data attributess

// /* HTML:
//   data-version-number="3.0"
// */
// /*
// * Access by dataset. <camel case of version-number>
// * --> versionNumber
// */
// console.log(logo.dataset.versionNumber);

// //Classes
// logo.classList.add('c', 'j');
// console.log(logo.classList.contains('c'));
// logo.classList.remove('c', 'j');
// console.log(logo.classList.contains('c'));
// logo.classList.toggle('c');
// console.log(logo.classList.contains('c'));  //not includes

//Test

//188 .............................................................
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function(e) {
    //1. The button itself coordinate
    //e.target = btnScrollTo 
    console.log(e.target.getBoundingClientRect());

    //2. Section coordinate
    const s1coords = section1.getBoundingClientRect();
    console.log(s1coords);

    //3. Position of the scroll it self.
    console.log('Current scroll position (X/Y)', window.pageXOffset, pageYOffset)

    //4. size of the current view
    console.log('height/width viewport', document.documentElement.clientHeight, document.documentElement.clientWidth);

    //A. Scrolling to  section1
    // window.scrollTo(s1coords.left + window.scrollX
    //     , s1coords.top + window.scrollY);

    //B. Scrolling to  section1 with smooth scrolling
    // window.scrollTo({
    //     left : s1coords.left + window.scrollX,
    //     top: s1coords.top + window.scrollY,
    //     behavior: 'smooth',
    // });

    //C. Modern way (Best scrolling)
    section1.scrollIntoView({ behavior: 'smooth'});
})

//189: Type of Events  .............................................................
// const h1 = document.querySelector('h1');

//Old Ways
// h1.onmouseenter = function(e) {
//     alert('2 addEventListener: Great! You are reading the heading :D');
// };

// const alertH1 = function(e) {
//     alert('addEventListener: Great! You are reading the heading :D');

//     //A. Remove event Listener
//     h1.removeEventListener('mouseenter', alertH1);
// }
// //Modern Ways
// h1.addEventListener('mouseenter', alertH1)

// //B. Timeout to remove eventListiner
// setTimeout( () => {h1.removeEventListener('mouseenter', alertH1);},
// 3000);




//191: Event Propagation .............................................................
// rgb(255,255,255)

// const randomInt = (min, max) => 
//     Math.floor(Math.random() * (max - min+ 1) + min);
// const randomColor = () =>
//     `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// console.log(randomInt)

// e.target = where the 'click' happens
// e.currentTarget = where the current event bubbling to.

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//     console.log('LINK nav__link', e.target, e.currentTarget);
//     this.style.backgroundColor = randomColor();
//     console.log(e.currentTarget === this);

//     //Stop propagation
//     // e.stopPropagation();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//     console.log('LINK nav__links', e.target, e.currentTarget);
//     this.style.backgroundColor = randomColor();
// });

// Capturing Phase -> Bubbling Phase (Default)
/*
    1. addEventListener('click', function (e) {})
    default: 
        It will listen to bubbling phase of the event (Coming backout flow from the e.target)

    2. addEventListener('click', function (e) {}, true)
    when set to true
        It will listen to capturing phase of the event (It will listen to bubbling phase of the event (Going down flow to the e.target)
*/

//1. nav print first ...
// document.querySelector('.nav').addEventListener('click', function (e) {
//     console.log('LINK nav', e.target, e.currentTarget);
//     this.style.backgroundColor = randomColor();
// }, true);

//2. nav print last ...
// document.querySelector('.nav').addEventListener('click', function (e) {
//     console.log('LINK nav', e.target, e.currentTarget);
//     this.style.backgroundColor = randomColor();
// });


//Summary:
// 1. Use default behavior 'Bubbling Phase' is always a good idea.
// 2. stopPropagation is not actually a good idea.

//192: Event Delegation .............................................................
//Page navigation
/*
document.querySelectorAll('.nav__link').forEach(
    function(e) {
        e.addEventListener('click', function (e) {
            console.log('Link');
            //Prevent scrolling by 'href' attribute.
            e.preventDefault();
            //We want to implement 'smooth' scrolling instead.
            const id = this.getAttribute('href');
            console.log(id);
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
        })
    }
)
*/
//Above will cause performance issue, because it add callback function to each '.nav__link'.
//Instead add callback function to the parent node, using the 'bubbling event' in our good cause.

document.querySelector('.nav__links').addEventListener('click', function(e) {
    console.log(e.target);
    //Prevent scrolling by 'href' attribute.
    e.preventDefault();

    //Matching strategy
    if (e.target.classList.contains('nav__link')) {
        console.log('LINK');
        //We want to implement 'smooth' scrolling instead.
        const id = e.target.getAttribute('href');
        console.log(id);
        document.querySelector(id).scrollIntoView({
            behavior: 'smooth'
        });
    }
})
