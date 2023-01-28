'use strict';
//////////////////////////////////////////////////////////////////////////////////////////
// Selecting DOM elements
// Functionality - Modal Window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
// Functionality - Scroll to View
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// Functionality - Nav Links Scroll
const navLinks = document.querySelectorAll('.nav__link');
const nav = document.querySelector('.nav');
// Functionality - Nav Links Animation
const navLinksContainer = document.querySelector('.nav__links');
const img = document.querySelector('.nav__logo');
// Functionality - Sticky Header
const header = document.querySelector('.header');
// Functionality - Reveal Sections
const sections = document.querySelectorAll('.section');
// Functionality - Lazy Loading Images
const featuresImages = document.querySelectorAll('.features__img');
// Functionality - Blur Text Animation
const featuresPars = document.querySelectorAll('.features__txt');
// Functionality - Tabbed Component
const tabs= document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');





//////////////////////////////////////////////////////////////////////////////////////////
// Modal window
const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});





//////////////////////////////////////////////////////////////////////////////////////////
// Scroll to View
btnScrollTo.addEventListener('click', function (event) {
  event.preventDefault();
  section1.scrollIntoView({behavior: 'smooth'});
})





//////////////////////////////////////////////////////////////////////////////////////////
// Nav Links Scroll
nav.addEventListener('click', function (event) {
  event.preventDefault();
  const clicked = event.target;

  if (clicked.classList.contains('nav__link')) {
    const scrollTo = document.querySelector(`${event.target.getAttribute('href')}`);
    scrollTo.scrollIntoView({behavior:'smooth'});
  }
})

 



//////////////////////////////////////////////////////////////////////////////////////////
// Nav Links Animation
const hoverAnimation = function (event) {
  event.preventDefault();
  
  if (event.target.classList.contains('nav__link')) {
    event.target.style.opacity = 1;
    navLinks.forEach(nl => { 
      if (nl !== event.target) nl.style.opacity = this;
    })
    img.style.opacity = this;
  }
  
}

nav.addEventListener('mouseover', hoverAnimation.bind(.5));
nav.addEventListener('mouseout',hoverAnimation.bind(1));





//////////////////////////////////////////////////////////////////////////////////////////
// Sticky Header
// The following animations made with the help of the Intersection Observer API
const navHeight= nav.getBoundingClientRect().height;

const stickyHeader = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  // console.log(entry.target);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const observeHeader = new IntersectionObserver(stickyHeader, {
  root: null,
  tershold: 0,
  rootMargin: `-${navHeight}px`
})

observeHeader.observe(header);





//////////////////////////////////////////////////////////////////////////////////////////
// Reveal Sections
const revealSections = function (entries, observer) {
  const [entry] = entries;

  // Guard Clause
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

const observeSections = new IntersectionObserver(revealSections, {
  root: null,
  tershold: .15
})

sections.forEach(section => {
  section.classList.add('section--hidden');
  observeSections.observe(section);
});





//////////////////////////////////////////////////////////////////////////////////////////
// Lazy Loading Images
const lazyLoad = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })
  observer.unobserve(entry.target);
}

const observeImages = new IntersectionObserver(lazyLoad, {
  root: null,
  trenshold: 0,
  rootMargin: '-200px'
})

featuresImages.forEach(img => observeImages.observe(img));





//////////////////////////////////////////////////////////////////////////////////////////
// Blur Text Animation
const blurTextAnimation = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('features__txt--blur');
  observer.unobserve(entry.target);  
}

const observeParagraphs = new IntersectionObserver(blurTextAnimation, {
  root: null,
  trenshold: 0,
  rootMargin: '-100px'
})

featuresPars.forEach(par => {
  par.classList.add('features__txt--blur');
  observeParagraphs.observe(par);
})





//////////////////////////////////////////////////////////////////////////////////////////
// Tabbed Component
tabsContainer.addEventListener('click', function (event) {
  event.preventDefault();
  const activeTab = event.target.closest('.operations__tab');
  const activeContent = document.querySelector(`.operations__content--${activeTab.dataset.tab}`); 

  // Remove active classes
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  tabsContent.forEach(content => content.classList.remove('operations__content--active'));

  // Activate tab
  activeTab.classList.add('operations__tab--active');

  // Activate Content
  activeContent.classList.add('operations__content--active');
})





//////////////////////////////////////////////////////////////////////////////////////////
// Slider
const slider = function () {



  // DOM Elements
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  let currentSlide = 0;
  const maxSlide = slides.length;
  const dotsContainer = document.querySelector('.dots');



  // Functions
  const goToSlide = function (slide) {
    slides
    .forEach((sl, index) => sl.style.transform = `translateX(${(index - slide) * 100}%)`)
  }


  const createDots = function () {

    slides.forEach(function(_, index) {
      dotsContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot dots__dot--active" data-slide="${index}"></button>`)})

  }


  const activateDot = function (slide) {
    const dots = document.querySelectorAll('.dots__dot');
    dots.forEach(dot => dot.classList.remove('dots__dot--active'));

    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
  }


  const slideRight = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
  }


  const slideLeft = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--
    }
    goToSlide(currentSlide);
    activateDot(currentSlide);
    
  }



  // Initialization
  const init = function () {
    goToSlide(0);
    createDots();
    activateDot(0);
  }
  init();



  // Event Handlers
  btnRight.addEventListener('click', slideRight);
  btnLeft.addEventListener('click', slideLeft);


  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') slideRight();
    if (event.key === 'ArrowLeft') slideLeft();
  })


  dotsContainer.addEventListener('click', function (event) {

    if (event.target.classList.contains('dots__dot')) {
        const targetSlide = event.target.dataset.slide;
        goToSlide(targetSlide);
        activateDot(targetSlide);
      }

  })



}
slider();
