import {Swiper, Pagination, Navigation, Scrollbar} from 'swiper';

Swiper.use([Pagination, Navigation, Scrollbar, F]);
document.addEventListener('DOMContentLoaded', () => {

	const homeHeaderSlider = new Swiper('.home-header__slider', {
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

	const homeBlogSlider = new Swiper('.home-blog__slider', {
		loop: true,
		speed: 1500,
		slidesPerView: 1,
		spaceBetween: 20,
		effect: 'fade',
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
})
