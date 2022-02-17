import { Swiper, Pagination, Navigation, Scrollbar, FreeMode, Thumbs } from "swiper";
import MicroModal from "micromodal";
import * as basicLightbox from "basiclightbox";

import Map from "ol/Map.js";
import View from "ol/View.js";
import OSM from "ol/source/OSM.js";
import Feature from "ol/Feature.js";
import { fromLonLat } from "ol/proj.js";
import Point from "ol/geom/Point.js";
import VectorSource from "ol/source/Vector.js";
import { Icon, Style } from "ol/style.js";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js";

Swiper.use([Pagination, Navigation, Scrollbar]);
document.addEventListener("DOMContentLoaded", () => {
  // Sliders
  let homeHeaderSlider = new Swiper(".home-header__slider", {
    loop: false,
    slidesPerView: 1,
    speed: 2000,
    navigation: {
      prevEl: ".header-slider__button-prev",
      nextEl: ".header-slider__button-next",
    },
    scrollbar: {
      el: ".header-slider__scrollbar",
      draggable: true,
    },
    pagination: {
      el: ".header-slider__pagination",
      clickable: false,
      type: "custom",
      renderCustom: function (swiper, current, total) {
        function addZero(number) {
          return number > 9 ? number : `0${number}`;
        }
        let currentNum = addZero(current);
        let totalNum = addZero(total);
        return `<span class='pagination-current'>${currentNum}</span><span class='pagination-total'>${totalNum}</span>`;
      },
    },
  });

  let homeBlogSlider = new Swiper(".home-blog__slider", {
    loop: true,
    speed: 1000,
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      991: {
        slidesPerView: 3,
      },
    },
    pagination: {
      el: ".blog-slider__pagination",
      type: "bullets",
      clickable: true,
    },
  });

  // Project Gallery
  let galleryThumbs = new Swiper(".gallery__thumbs", {
    modules: [FreeMode],
    speed: 1500,
    spaceBetween: 5,
    slidesPerView: 4,
    breakpoints: {
      1199: {
        slidesPerView: 7.5,
      },
      991: {
        slidesPerView: 6,
      },
    },
    slideToClickedSlide: true,
    watchSlidesProgress: true,
    freeMode: {
      enabled: true,
      momentum: false,
      minimumVelocity: 0.2,
    },
    loop: true,
  });
  let galleryTop = new Swiper(".gallery__top", {
    modules: [Thumbs],
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: galleryThumbs,
    },
  });

  // Adaptive menu
  const hamburger = document.querySelector(".hamburger");
  const homeNavbarMenu = document.querySelector(".navbar__menu");

  const navLinks = document.querySelectorAll(".navbar-menu__link");
  navLinks.forEach((n) => n.addEventListener("click", closeMenu));
  hamburger.addEventListener("click", toggleMenu);
  window.addEventListener("click", function (e) {
    if (e.target !== homeNavbarMenu && e.target !== hamburger) {
      closeMenu();
    }
  });

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
    openClass: "is-open",
  });

  // Replace Svg

  const replaceSvgImagesToSvgInline = (query, callback) => {
    document.querySelectorAll(query).forEach((image) => {
      let imgClass = image.getAttribute("class");
      let imgId = image.getAttribute("id");
      let imgURL = image.getAttribute("src");

      fetch(imgURL)
        .then((res) => res.text())
        .then((data) => {
          const parser = new DOMParser();
          let svg = parser.parseFromString(data, "image/svg+xml").querySelector("svg");
          if (typeof imgClass !== "undefined") {
            svg.setAttribute("class", `${imgClass} replaced-svg`);
            svg.setAttribute("id", imgId);
          }
          svg.removeAttribute("xmlns:a");
          if (!svg.getAttribute("viewBox") && svg.getAttribute("height") && svg.getAttribute("width")) {
            svg.setAttribute("viewBox", `0 0 ${svg.getAttribute("height")} ${svg.getAttribute("width")}`);
          }
          image.parentNode.replaceChild(svg, image);
        })
        .then(callback)
        .catch((error) => console.error(error));
    });
  };

  replaceSvgImagesToSvgInline(".svg-icon");

  // Scroll to top button

  const scrollBtn = document.querySelector(".scroll-top__btn");
  const offset = 300;

  window.addEventListener("scroll", () => {
    if (window.pageYOffset >= offset) {
      scrollBtn.classList.add("active");
    } else {
      scrollBtn.classList.remove("active");
    }
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Image modal

  const modalImg = document.querySelector(".modal-img-wrapper");
  const instance = basicLightbox.create(`
 <img src="images/dist/other/about-installation.jpg">
 `);

  function showModalImg() {
    instance.show();
  }

  if (modalImg) {
    modalImg.addEventListener("click", showModalImg);
  }


// Company Page Tabs

function initTabs(elem) {
  //addEventListener on mouse click
  document.addEventListener("click", function (e) {
    //check is the right element clicked
    if (!e.target.matches(`${elem} .tab-link`)) {
      return;
    } else {
      if (!e.target.classList.contains("active")) {
        //if option true remove active class from all other tab-link and tab
        findActiveElementAndRemoveIt(`${elem} .tab-link`);
        findActiveElementAndRemoveIt(`${elem} .tab`);

        //add active class on clicked tab
        e.target.classList.add("active");

        
          const panel = document.querySelectorAll(`${elem}  .tab.${e.target.dataset.name}`);
          Array.prototype.forEach.call(panel, function (el) {
            //add active class on right t-panel
            el.classList.add("active");
          });
        ;
      }
    }
  });

}


//if option true remove active class from added element
function findActiveElementAndRemoveIt(elem) {
  const elementList = document.querySelectorAll(elem);
  Array.prototype.forEach.call(elementList, function (e) {
    e.classList.remove("active");
  });
}

initTabs(".s-company")

  // Contacts Map

  const iconFeature = new Feature({
    geometry: new Point(fromLonLat([30.520784, 50.447532])),
    name: "Woodtech",
  });

  const map = new Map({
    target: "map",
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      new VectorLayer({
        source: new VectorSource({
          features: [iconFeature],
        }),
        style: new Style({
          image: new Icon({
            anchor: [0.5, 46],
            anchorXUnits: "fraction",
            anchorYUnits: "pixels",
            src: "https://cdn.mapmarker.io/api/v1/font-awesome/v5/pin?icon=fa-star-solid&size=50&hoffset=0&voffset=-1",
          }),
        }),
      }),
    ],
    view: new View({
      center: fromLonLat([30.520784, 50.447532]),
      zoom: 15,
      maxZoom: 18,
      constrainOnlyCenter: true,
    }),
  });

  
});
