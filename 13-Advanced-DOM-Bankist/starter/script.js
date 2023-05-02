'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling

btnScrollTo.addEventListener('click',(e) => {
  e.preventDefault();

  section.scrollIntoView({behavior: 'smooth'});
})

////////////////////////////////////////////////////////////////////////

// Page navigation

// 1) Add event listener to common parent element
// 2) Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click',(e) => {
  e.preventDefault();
  // Matching stratagy
  if(e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
});

// Tabbed component

tabsContainer.addEventListener('click', (e) => {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if(!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  tabContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`)
   .classList.add('operations__content--active')
})


// Menu fade animation
const handleHover = (e,opacity) => {
  if(e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(el => {
      if(el !==link) el.style.opacity = opacity;
    })
    logo.style.opacity = opacity;
  }
}

// This is how we pass arguments to event handlers
// Another way explained in lecture 195
nav.addEventListener('mouseover',(e) => handleHover(e,0.5));
nav.addEventListener('mouseout', (e) => handleHover(e,1));

// Sticky navigation
const initialCoords = section.getBoundingClientRect();

console.log(initialCoords);

window.addEventListener('scroll', () => {

  if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')

})

// Sticky navigation: Intersection Observer API

// const obsCallback = (entries,observer) => {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold:[0, 0.2]
// }

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);


//Better performance then above
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver
(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section')

const revealSection = (entries,observer) => {
  const [entry] = entries;

  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
})

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = (entries, observer) => {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',() => {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold:0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = () => {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  
  let curSlide = 0;
  const maxSlide = slides.length - 1;
  
  // Functions
  const createDots = () => {
    slides.forEach((_,i) => {
      dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  
    })
  }
  
  const activateDot = ((slide) => {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));
  
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  })
  
  const goToSlide = (slide) => {
    slides.forEach((s, i) => s.style.transform = `translateX(${(i - slide) * 100}%)`);
  }
  
  const nextSlide = () => {
    if(curSlide === maxSlide) {
      curSlide = 0
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  }
  
  const prevSlide = () => {
    if(curSlide === 0) {
      curSlide = maxSlide
    } else {
      curSlide--;
    }
    activateDot(curSlide);
    goToSlide(curSlide);
  }
  const init = () => {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();
  // Event handlers
  
  // Next slide
  btnRight.addEventListener('click',nextSlide);
  // Previous slide
  
  btnLeft.addEventListener('click',prevSlide);
  
  // Get slide on key down
  document.addEventListener('keydown' ,(e) => {
    if( e.key === 'ArrowRight') nextSlide(curSlide);
    if( e.key === 'ArrowLeft') prevSlide(curSlide);
  })
  
  // Get slide on click on dot
  document.addEventListener('click',(e) => {
    if(e.target.classList.contains('dots__dot')) {
      const {slide} = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  })
}
slider();

/////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

/*
// Selecting elements

//Here we select the entire document
console.log(document.documentElement);

// Here we select the head
console.log(document.head);

// Here we select the body
console.log(document.body);

// Here we select only one element with class header
const header = document.querySelector('.header');
// Here we select all element with class header
const allSections = document.querySelectorAll('.section');
// We will see nodelist in the console
console.log(allSections);

document.getElementById('section--1');
// Will select all buttons and will return html collection
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements

// example using insertAdjacentElement
// document.getElementById(btn).insertAdjacentElement('afterbegin','content text');


// Here we create the element

const message = document.createElement('div');
// message.textContent = 'We use cookies for improved functionality and analytics';

//Here we add a class

message.classList.add('cookie-message');

//Here we add html to the element

message.innerHTML = 'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!<button>';

// With this methods element can be in only one place

// Prepend will add the element at the begining of the header element

header.prepend(message);

// append will add the element at the end of the header element

// header.append(message);

// If we want to clone the element we can use cloneNode method on the inner html
// header.append(message.cloneNode(true));

// This will insert the element before the header element

header.before(message);

// This will insert the element after the header element

header.after(message);

// Delete elements

document.querySelector('.btn--close-cookie').addEventListener('click',()=>{
  message.remove();
})


//-------------------------------------------------------------------------------

// Styles 

// We will change the color of the background

message.style.backgroundColor = '#37383d';

message.style.width = '120%';


console.log(message.style.color);// Output:       nothing will appear
console.log(message.style.backgroundColor);// Output:rgb(55, 56, 61)

console.log(getComputedStyle(message).color);// Output:rgb(187, 187, 187)
console.log(getComputedStyle(message).height);// Output:49px

// This is how we can change the height
message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px';

// Here we change custom property in the css file
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes

const logo = document.querySelector('.nav__logo');
// Reading attributes
console.log(logo.alt);
console.log(logo.src);
console.log(logo.className);

// Set attributes

logo.alt ='Beutiful minimalist logo';

// Non-standard (custom)

// Reading non-standard attributes

console.log(logo.designer);//Output: undefined
console.log(logo.getAttribute('designer'));//Output: max

// Set attribute
logo.setAttribute('company','Bankist');

// Relative path same for links
console.log(logo.src);

// Absolute path same for links
console.log(logo.getAttribute('src'));

// Data attributes
// Will get custom attribute data-version-number
console.log(logo.dataset.versionNumber);

// Classes
logo.classList.add('c');
logo.classList.remove('c');
logo.classList.toggle('c');
logo.classList.contains('c');

// Don't use it overwrite the class name
logo.className = 'max'

//-----------------------------------------------------------------------------------



const btnScrollTo = document.querySelector('.btn--scroll-to');

const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click',(e) => {
  e.preventDefault();
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  // This will show the distance from the position of the right side of the screen to the start of the web
  // and also the distance from the top of the screen to the top of the website
  console.log('Current scroll (X/Y)',window.pageXOffset, window.pageYOffset);

  console.log('height/width viewport',document.documentElement.clientHeight, document.documentElement.clientWidth);

  // Scrolling to s1coords

  // Relative to the top and left of the website
  // window.scrollTo(s1coords.left,s1coords.top);
  
  // Relative to the top and left of the screen at our position
  // window.scrollTo(s1coords.left + window.pageXOffset ,s1coords.top + window.pageYOffset);

  // This will make a smooth scroll
  // window.scrollTo({left: s1coords.left + window.pageXOffset ,top: s1coords.top + window.pageYOffset,behavior: 'smooth'});

  // another way
  section1.scrollIntoView({behavior: 'smooth'});
})

//---------------------------------------------------------------------------------------------------------------------



const h1 = document.querySelector('h1');

const alertH1 = (e) => {
  alert('addEventListener: Great! You are reading the heading :D');
}
// Ways of listening to events

// 1) We can add multiply of functions to the same event
h1.addEventListener('mouseenter', (e) => {
  alert('addEventListener: Great! You are reading the heading :D');

  // We can also remove event listener
  h1.removeEventListener('mouseenter',alertH1)
})

// 2) If we add new function it will overwrite the function
h1.onmouseenter = ((e) => {
  alert('addEventListener: Great! You are reading the heading :D');
})

// 3) 
h1.addEventListener('mouseenter',alertH1)

//---------------------------------------------------------------------------------------------------


// Event propagation

// The function will create int value between min and max
const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

// The function will create random color
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`;

console.log(randomColor(0,255));
// Example
// If we click the link the nav links and the nav divs will get random color for each because the function will effect all parents

// On click we will change the link color 
document.querySelector('.nav__link').addEventListener('click', function(e) {
  this.style.backgroundColor = randomColor();

  // If we want to see where the event happened we will console the target.
  // The target will be the same for all parents
  console.log('Link',e.target,e.currentTarget);

  // Stop Propagation (only the link will change the color)
  e.stopPropagation();
})

// On click we will change the nav links div color 
document.querySelector('.nav__links').addEventListener('click',function(e) {
  this.style.backgroundColor = randomColor();
  console.log('Container',e.target,e.currentTarget);
})

// On click we will change the nav color 
document.querySelector('.nav').addEventListener('click',function(e) {
  this.style.backgroundColor = randomColor();
  console.log('Nav',e.target,e.currentTarget);
})

//------------------------------------------------------------------------------------------


// Page navigation

// That way we can attach call back function to  each link the problem we have 3 functions 
// and the problem  it's not efficient solution
// document.querySelectorAll('.nav__link').forEach((el) => {
//   el.addEventListener('click',function(e) {
//     e.preventDefault();

//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior: 'smooth'});
//   })
// })

// better way at lines 53-60

//-------------------------------------------------------------------------------------------------

// DOM Traversing

const h1 = document.querySelector('h1');

// Going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);

h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parent
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-secondary)';

h1.closest('h1').style.background = 'var(--gradient-secondary)';

// Going sideways: sibling
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);

[...h1.parentElement.children].forEach((el) => {
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

*/

document.addEventListener('DOMContentLoaded', (e) => {
  console.log('HTML parsed and DOM tree built!', e);
})
window.addEventListener('load', (e) => {
  console.log('Page fully loaded!', e);
})

// window.addEventListener('beforeunload', (e) => {
//   e.preventDefault();
//   console.log('Page fully loaded!', e);
//   e.returnValue = '';
// })