'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');

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


//193 .............................................................

// const h1 = document.querySelector('h1');

// //querySelectorAll also work for element node.
// // only find children of h1 that have a class 'highlight'
// console.log(h1.querySelectorAll('.highlight'));

// console.log('Childnodes........');
// // console.log(h1.childNodes);
// console.log('children..........');
// console.log(h1.children);
// // h1.firstElementChild.style.color = 'white';
// // h1.lastElementChild.style.color = 'orangered';

// console.log('parentNode..........');
// // console.log(h1.parentNode);
// console.log('parentElement..........');
// console.log(h1.parentElement);

// console.log(h1);
// //Find closest parent element by classname 'header'
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// //Find closest parent element by classname 'h1'
// h1.closest('h1').style.background = 'var(--gradient-primary)';

// //'closest' is an opposite of 'querySelector'
// // 'closest' is travesing upward to parent
// // 'querySelector' is travesing downward to child.

// //Silbings nodes

// console.log('previousElementSibling..........');
// console.log(h1.previousElementSibling);
// console.log('previousSibling..........');
// // console.log(h1.previousSibling);

// console.log('nextElementSibling..........');
// console.log(h1.nextElementSibling);
// console.log('nextSibling..........');
// // console.log(h1.nextSibling);

// /* Get all siblings of h1, 
// * by traversing to parent and get all childern
// */
// console.log(h1.parentElement.children);

// /* Scale all silbings of h1 to have 50% smaller size, than itself.
// */
// [...h1.parentElement.children].forEach(function (e) {
//   if (e !== h1) e.style.transform  = 'scale(0.5)';
// })


//194: .....

//Not good, bad performance.
// tabs.forEach( t => t.addEventListener('click', () => console.log('Clicked')))

tabsContainer.addEventListener('click', function(e) {
  const badClicked = e.target;
  //problem should not return 'span', should return button instead.
  // console.log(badClicked);

  //solution: search for the class .operations__tab
  const clicked = e.target.closest('.operations__tab')
  console.log(clicked);

  //Return early if the click is not button.
  if (!clicked) return; 

  //Remove tabs active class, to set the tab backdown.
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  //Add the clicked tab with active class, to make it stand out.
  clicked.classList.add('operations__tab--active');

  console.log(clicked.dataset.tab)
  //Remove content active class, to hide all the content.
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));
  //Add content active class, to display current content.
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
})




//195: ......
//Make other menu fade, when hover on the focus menu.

/*
* mouseenter doesn't bubble, 
* so we use mouseover
*/

// const handleHover = function(e, opacity) {
const handleHover = function(e) {
    //use 'this' keyword, to handler function, instead of second argument.
    // console.log(this)
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav')
        .querySelectorAll('.nav__link');
        const logo = link.closest('.nav')
        .querySelector('img');

        siblings.forEach(e => { 
            if (e !== link) {
                // e.style.opacity = opacity;
                e.style.opacity = this;
            }
            // logo.style.opacity = opacity;
            logo.style.opacity = this;
        })
    }
}
nav.addEventListener('mouseover', handleHover.bind(0.5))
nav.addEventListener('mouseout', handleHover.bind(1))


// 196: Implementing a sticky navigation: the scroll event ..................................................
const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

//not efficient must avoid it. causes performance issues.

// window.addEventListener('scroll', function(e) {
//     console.log(window.scrollY);
//     if (window.scrollY > initialCoords.top) {
//         nav.classList.add('sticky');
//     } else {
//         nav.classList.remove('sticky');
//     }
// });

// 197: A Better way: the intersection observer API

/*
* Whenever the section1, is intersect the 'root'(whole vieport)
* at 0.1% the callback function will run.
*/
/*
const obsCallback = function(entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    })
};
const obsOptions = {
    root: null,
    threshold: 0.1
};
const observer = new IntersectionObserver(
    obsCallback, obsOptions
);
observer.observe(section1);
*/

/*

const obsCallback = function(entries, observer) {
    entries.forEach(entry => {
        console.log(entry);
    })
};
const obsOptions = {    
    root: null,
    //0 = not seeing the observe element -> trigger
    //0.2 = seeing the observe element at 20% -> trigger
    threshold: [0, 0.2] //List of threshold to triggers the callback function
};
const observer = new IntersectionObserver(
    obsCallback, obsOptions
);
observer.observe(section1);

*/

// const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);

const stickyNav = function(entries) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver
    (stickyNav, {
        root: null,
        threshold: 0,
         //90 pixel is the size of nav component.
        // rootMargin: '-90px', //trigger before the root -90 pixels
        rootMargin: `-${navHeight}px`,
    });
headerObserver.observe(header);


// 198. Revealing Elements on scroll with 'The Intersection Observer API'

// const allSections = document.querySelectorAll('.section--hidden');

const revealSection = function (entries, observer) {
    const [entry] = entries;
    // console.log(entry);
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
allSections.forEach(function (section) {
    sectionObserver.observe(section);
    // section.classList.add('section--hidden');
});


// 199. Lazy loading images, greatly improved performance
const imgTargets = document.querySelectorAll('img[data-src]');
console.log(imgTargets);

const loadImg = function (entries, observer) {
    const [entry] = entries;
    console.log(entry);

    if (!entry.isIntersecting) return;

    //Replace src with data-src
    entry.target.src = entry.target.dataset.src;

    /*Not good because, this remove the filter immediately.
    * but the loading of the image is asynchronous
    *, its might take longer than removing the class directly.
    */
    // entry.target.classList.remove('lazy-img');

    //Use this instead because,
    // when image is loaded it will trigger 'load' event listener.
    entry.target.addEventListener('load', function() {
        entry.target.classList.remove('lazy-img');
    })
    observer.unobserve(entry.target)
}

const imgObserver = new IntersectionObserver(loadImg, {
    root: null,
    threshold: 0,
    rootMargin: '200px',
})

imgTargets.forEach(img => imgObserver.observe(img));


//200........................................
// Slider
const slider = function() {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    // slider.style.transform  = 'scale(1) translateX(-800px)';
    // slider.style.overflow  = 'visible';

    let curSlide = 0;
    const goToSlide = function (iSlide) {
        slides.forEach((s, i) => (s.style.transform = `translateX(${100 * (i-iSlide)}%)`))
    }
    
    const nextSlide = function() {
        curSlide++;
        if (curSlide >= slides.length) {
            curSlide = 0;
        }
        goToSlide(curSlide)
        activateDot(curSlide)
    }
    const previousSlide = function() {
        curSlide--;
        if (curSlide < 0) {
            curSlide = slides.length-1;
        }
        goToSlide(curSlide)
        activateDot(curSlide)
    }
    const createDots = function() {
        slides.forEach(function(_, i) {
            dotContainer.insertAdjacentHTML('beforeend', 
            `<button class="dots__dot" data-slide="${i}"></button>`);
        });
    }
    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

        /* 
        ! Important: Access element with class that contains a class data-slide="${slide}"
        */
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    }

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', previousSlide);


    //201 ....
    dotContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('dots__dot')) {
            // console.log('DOT');
            const {slide} = e.target.dataset;
            curSlide=slide;
            goToSlide(slide);
            activateDot(slide)
        }
    })
    document.addEventListener('keydown', function(e) {
        // console.log(e);
        if (e.key === 'ArrowLeft') previousSlide();
        e.key === 'ArrowRight' && nextSlide();
    })

    const init = function() {
        goToSlide(0);
        createDots();
        activateDot(0);
    }
    init();
}
slider();


//202......

document.addEventListener('DOMContentLoaded', function(e) {
    console.log('HTML parsed and DOM tree build!', e);
})

window.addEventListener('load', function(e) {
    console.log('Page fully loaded', e);
})

window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    console.log(e);

    // ! Ask if user want to leave the site.
    e.returnValue = '';
})

//203.....
/*
*
* 1) Put script.js at the End of Body
*  <script src="script.js">
* 
* 2) Better Solution, Use Defer In Head
* But only support in Modern Browsers [HTML5]
* 
*  <script defer src="script.js">
*      (Faster loading scripts)
* 
*/