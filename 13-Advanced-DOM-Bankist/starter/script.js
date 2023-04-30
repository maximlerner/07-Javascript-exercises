'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

*/


