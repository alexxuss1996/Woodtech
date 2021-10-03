import {Swiper, Pagination, Navigation, Scrollbar} from 'swiper';

Swiper.use([Pagination, Navigation, Scrollbar]);
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

	})

})
