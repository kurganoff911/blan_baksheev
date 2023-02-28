const params = {
  btnClassName: "js-styles-dropdown-btn",
  dropClassName: "js-styles-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled",
  tabsClass: "js-tab-btn",
  wrap: "js-tabs-wrap",
  content: "js-tab-content",
  active: "active",
};

/* burger */

let burger = document.querySelector(".burger");
let menu = document.querySelector(".header__nav");
let menuLinks = document.querySelectorAll(".nav__link");

burger.addEventListener("click", function () {
  burger.classList.toggle("burger--active");

  menu.classList.toggle("header__nav--active");

  document.body.classList.toggle("stop-scroll");
});

menuLinks.forEach(function (el) {
  el.addEventListener("click", function () {
    burger.classList.remove("burger--active");

    menu.classList.remove("header__nav--active");

    document.body.classList.remove("stop-scroll");
  });
});

/* search top header */

setSearch({
  openBtnClass: "js-open-search", // класс кнопки открытия
  closeBtnClass: "js-close", // класс кнопки закрытия
  searchClass: "js-form", // класс формы поиска
  activeClass: "is-opened", // класс открытого состояния
  hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
});

function setSearch(params) {
  const openBtn = document.querySelector(`.${params.openBtnClass}`);
  const search = document.querySelector(`.${params.searchClass}`);
  const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

  search.addEventListener("animationend", function (evt) {
    if (this._isOpened) {
      this.classList.remove(params.activeClass);
      this.classList.remove(params.hiddenClass);
      this._isOpened = false;
    } else {
      this._isOpened = true;
    }
  });

  search.addEventListener("click", function (evt) {
    evt._isSearch = true;
  });

  openBtn.addEventListener("click", function (evt) {
    this.disabled = true;

    if (
      !search.classList.contains(params.activeClass) &&
      !search.classList.contains(params.hiddenClass)
    ) {
      search.classList.add(params.activeClass);
    }
  });

  closeBtn.addEventListener("click", function () {
    openBtn.disabled = false;
    search.classList.add(params.hiddenClass);
  });

  document.body.addEventListener("click", function (evt) {
    if (!evt._isSearch && search._isOpened) {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    }
  });
}

/*menu artists*/

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();

/*swiper head*/

const swiper = new Swiper(".js-hero-swiper", {
  allowTouchMove: false,
  loop: true,
  effect: "fade",
  speed: 10000,
  autoplay: {
    delay: 10000,
  },
});

/*choices*/

const defaultSelect = () => {
  const element = document.querySelector(".gallery__filter-options");
  const choices = new Choices(element, {
    searchEnabled: false,
  });
};

defaultSelect();

/*swiper gallery*/

document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".gallery__slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row",
    },
    spaceBetween: 20,
    slidesPerGroup: 1,
    loop: true,
    pagination: {
      el: ".gallery .gallery__slider-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".gallery__slider-next",
      prevEl: ".gallery__slider-prev",
    },

    breakpoints: {
      600: {
        slidesPerView: 2,
        spaceBetween: 38,
        slidesPerGroup: 2,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 3,
      },
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
    },
  });
});

/*accordion*/

(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0],
  });
})();

function setTabs(params) {
  const tabBtns = document.querySelectorAll(`.${params.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${params.wrap}`);
    const currentContent = wrap.querySelector(
      `.${params.content}[data-target="${path}"]`
    );
    const contents = wrap.querySelectorAll(`.${params.content}`);

    contents.forEach((el) => {
      el.classList.remove(params.active);
    });

    currentContent.classList.add(params.active);

    tabBtns.forEach((el) => {
      el.classList.remove(params.active);
    });

    this.classList.add(params.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
}

setTabs(params);

/*events*/
let eventSwiper = new Swiper(".events-swiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  /*roundLengths: true,*/
  setWrapperSize: true,
  autoHeight: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    650: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 34,
    },

    1023: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 27,
    },

    1440: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 50,
      autoHeight: true,
    },
  },
});

/* tooltip */

tippy(".tooltip", {
  theme: "blanchard",
});

/*sponsors*/

let sponsorSlider = new Swiper(".sponsors-swiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 21,
  loop: true,
  navigation: {
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  },
  keyboard: {
    enabled: true,
  },
  breakpoints: {
    600: {
      slidesPerView: 2,
      spaceBetween: 34,
      centeredSlides: false,
    },

    800: {
      slidesPerView: 2,
      spaceBetween: 50,
      centeredSlides: false,
    },

    1441: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

/* validation */

var selector = document.querySelector("input[type='tel']");
var im = new Inputmask("+7 (999) 999-99-99");
im.mask(selector);

new JustValidate(".contacts__form", {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 20,
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue();
        return Number(phone) && phone.length === 10;
      },
    },
  },
  messages: {
    name: "Как вас зовут?",
    tel: "Укажите ваш телефон",
  },
});

/* map */

ymaps.ready(init);
function init() {
  const mapElem = document.querySelector("#map");
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75846806898367, 37.60108849999989],
      zoom: 14,
      controls: ["geolocationControl", "zoomControl"],
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "300px", right: "20px" },
      geolocationControlFloat: "none",
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "200px", right: "20px" },
    }
  );

  if (window.matchMedia("(max-width: 1280px)").matches) {
    if (Object.keys(myMap.controls._controlKeys).length) {
      myMap.controls.remove("zoomControl");
      myMap.controls.remove("geolocationControl");
    }
  }

  myMap.behaviors.disable("scrollZoom");

  myMap.events.add("sizechange", function (e) {
    if (window.matchMedia("(max-width: 1280px)").matches) {
      if (Object.keys(myMap.controls._controlKeys).length) {
        myMap.controls.remove("zoomControl");
        myMap.controls.remove("geolocationControl");
      }
    } else {
      if (!Object.keys(myMap.controls._controlKeys).length) {
        myMap.controls.add("zoomControl");
        myMap.controls.add("geolocationControl");
      }
    }
  });

  const myPlacemark = new ymaps.Placemark(
    [55.75846806898367, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./img/point_map.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
}

/* scroll */

document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();

      const href = this.getAttribute('href').substring(1);
      const scrollTarget = document.getElementById(href);
      const elementPosition = scrollTarget.getBoundingClientRect().top;

      window.scrollBy({
          top: elementPosition,
          behavior: 'smooth'
      });
  });
});
