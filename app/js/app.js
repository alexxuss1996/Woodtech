import {Swiper, Pagination, Navigation, Scrollbar, FreeMode, Thumbs} from 'swiper';
import MicroModal from 'micromodal';
import * as basicLightbox from 'basiclightbox';
Swiper.use([Pagination, Navigation, Scrollbar]);
document.addEventListener('DOMContentLoaded', () => {
// Sliders
	let homeHeaderSlider = new Swiper('.home-header__slider', {
		loop: false,
		slidesPerView: 1,
		speed: 2000,
		navigation: {
			prevEl: '.header-slider__button-prev',
			nextEl: '.header-slider__button-next',
		},
		scrollbar: {
			el: '.header-slider__scrollbar',
			draggable: true
		},
		pagination: {
			el: '.header-slider__pagination',
			clickable: false,
			type: 'custom',
			renderCustom: function (swiper, current, total) { 
				function addZero(number) {
					return (number > 9) ? number : `0${number}`;
				}
				let currentNum = addZero(current);
				let totalNum = addZero(total);
				return `<span class='pagination-current'>${currentNum}</span><span class='pagination-total'>${totalNum}</span>`;
			 },
		}
	});

	let homeBlogSlider = new Swiper('.home-blog__slider', {
		loop: true,
		speed: 1000,
		slidesPerView: 1,
		spaceBetween: 20,
		breakpoints: {
			991: {
				slidesPerView: 3
			}
		},
		pagination: {
			el: '.blog-slider__pagination',
			type: 'bullets',
			clickable: true
		}
	});

	// Project Gallery 
	let galleryThumbs = new Swiper('.gallery__thumbs', {
		modules: [FreeMode],
		speed: 1500,
		spaceBetween: 5,
		slidesPerView: 4,
		breakpoints: {
			1199: {
				slidesPerView: 7.5
			},
			991: {
				slidesPerView: 6
			}
		},
		slideToClickedSlide: true,
		watchSlidesProgress: true,
		freeMode: {
			enabled: true,
			momentum: false,
			minimumVelocity: 0.2
		},
		loop: true
	});
	let galleryTop = new Swiper('.gallery__top', {
		modules: [Thumbs],
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		thumbs: {
			swiper: galleryThumbs
		}
	});

	// Adaptive menu 
	const hamburger = document.querySelector(".hamburger");
	const homeNavbarMenu = document.querySelector(".navbar__menu");

	const navLinks = document.querySelectorAll(".navbar-menu__link");
	navLinks.forEach(n => n.addEventListener("click", closeMenu))
	hamburger.addEventListener("click", toggleMenu)
	window.addEventListener("click", function(e){
		if(e.target !== homeNavbarMenu && e.target !== hamburger) {
			closeMenu();
		}
	})

	function closeMenu() {
		hamburger.classList.remove("open");
		homeNavbarMenu.classList.remove("open");
	}
	
	function toggleMenu() { 
		hamburger.classList.toggle("open");
		homeNavbarMenu.classList.toggle("open");
	 }
	 // Modal window 

	 MicroModal.init({
		 awaitCloseAnimation: true,
		 openTrigger: "data-micromodal-trigger",
		 closeTrigger: "data-micromodal-close",
		 openClass: "is-open"
	 });

	 // Replace Svg

	const replaceSvgImagesToSvgInline = (query, callback) => {
		document.querySelectorAll(query).forEach((image) => {
			let imgClass = image.getAttribute('class');
			let imgId = image.getAttribute('id');
			let imgURL = image.getAttribute('src');
	
			fetch(imgURL)
			.then(res => res.text())
			.then(data => {
				const parser = new DOMParser();
				let svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
				if(typeof imgClass !== 'undefined') {
					svg.setAttribute('class', `${imgClass} replaced-svg`);
					svg.setAttribute('id', imgId);
				}
				svg.removeAttribute('xmlns:a');
				if(!svg.getAttribute('viewBox') && svg.getAttribute('height') && svg.getAttribute('width')) {
					svg.setAttribute('viewBox', `0 0 ${svg.getAttribute('height')} ${svg.getAttribute('width')}`);
				}
				image.parentNode.replaceChild(svg, image);
			})
			.then(callback)
			.catch(error => console.error(error));
		});
	}
	
	replaceSvgImagesToSvgInline('.svg-icon');


	// Scroll to top button

	const scrollBtn = document.querySelector(".scroll-top__btn");
	const offset = 300;
	
	window.addEventListener("scroll", () => {
		if(window.pageYOffset >= offset) {
			scrollBtn.classList.add("active")
		} else {
			scrollBtn.classList.remove("active")
		}
	})
	scrollBtn.addEventListener("click", () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		})
	})

 // Image modal

 const modalImg = document.querySelector(".modal-img-wrapper");
 const instance =  basicLightbox.create(`
 <img src="images/dist/other/about-installation.jpg">
 `);

 function showModalImg () {
	 instance.show()
 }

 if(modalImg) {
	modalImg.addEventListener("click", showModalImg);
 }
	
});


	
