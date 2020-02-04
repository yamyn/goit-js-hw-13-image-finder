import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import galleryCartTemplate from '../templates/gallery-cart-template.hbs';
import imageService from './services/apiService';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
  button: document.querySelector('#button'),
};

const masonryInstance = new Masonry(refs.gallery, {
  columnWidth: '.gallery__sizer',
  itemSelector: '.gallery__item',
  percentPosition: true,
  gutter: 20,
  transitionDuratin: '0.2s',
  visibleStyle: { transform: 'translateY(0)', opacity: 1 },
  hiddenStyle: { transform: 'translateY(100px)', opacity: 0 },
});

const imgLoadInstance = imagesLoaded(refs.gallery);

imgLoadInstance.on('progress', () => {
  masonryInstance.layout();
});

refs.button.addEventListener('click', loadMoreBtnHandler);
refs.gallery.addEventListener('click', openLargeImageHandler);
refs.form.addEventListener('submit', searchFormSubmitHandler);

function searchFormSubmitHandler(event) {
  event.preventDefault();
  const searchQuery = event.currentTarget.elements.query.value;
  imageService.currentQuery = searchQuery;
  clearGalleryList();
  imageService.resetPage();
  toGetImages();
}

function loadMoreBtnHandler() {
  toGetImages();
  console.log(imageService.page);
}

function openLargeImageHandler(event) {
  event.preventDefault();
  if (event.currentTarget === event.target) {
    return;
  }
  const focusedLi = event.target.closest('li.gallery__item');
  const bigImageUrl = focusedLi.dataset.source;
  basicLightbox
    .create(
      `
		<img width="1400" height="900" src="${bigImageUrl}">
	`,
    )
    .show();
}

function toGetImages() {
  imageService.fethImages().then(images => {
    toGenMarkup(images);
  });
}

// function addedSizer() {
//   const sizer = document.createElement('li');
//   sizer.classList.add('item');
//   sizer.classList.add('gallery__sizer');
//   refs.gallery.appendChild(sizer);
// }

function toGenMarkup(images) {
  const markup = images.map(image => galleryCartTemplate(image));

  const proxyEl = document.createElement('ul');
  proxyEl.innerHTML = markup;
  const liArr = [];
  //Зделал топорно циклом потому что когда распыляю(const liArr = [...proxyEl.children]) добавляет в масив как колекцию HTML
  for (let i = 0; i < proxyEl.children.length; i += 1) {
    liArr.push(proxyEl.children[i]);
  }
  refs.gallery.append(...liArr);
  masonryInstance.appended(liArr);
}

function clearGalleryList() {
  masonryInstance.remove(refs.gallery.children);
  masonryInstance.layout();
}

// const infScrollInstance = new InfiniteScroll(refs.gallery, {
//   responseType: 'text',
//   history: false,
//   path() {
//     return '';
//   },
// });

// infScrollInstance.on('load', response => {
//   const imagesObj = JSON.parse(response);
//   const images = imagesObj.hits;
//   console.log(images);
//   const markup = images.reduce(
//     (string, image) => string + galleryCartTemplate(image),
//     '',
//   );
//   const proxyEl = document.createElement('div');
//   proxyEl.innerHTML = markup;

//   console.log(proxyEl);
//   infScrollInstance.appendItems(proxyEl.children);
// });

// refs.form.addEventListener('submit', getImageHandler);

// function getImageHandler(form) {
//   infScrollInstance.destroy();
//   refs.gallery.innerHTML = '';

//   form.preventDefault();
//   console.log(form);

//   const searchQuery = form.currentTarget.elements.query.value;
//   console.log(searchQuery);

//   infScrollInstance.pageIndex = 1;
//   infScrollInstance.option({
//     path() {
//       return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=14998986-82322fa46abf8765da09830ba&q=${searchQuery}&page=${this.pageIndex}`;
//     },
//   });

//   infScrollInstance.loadNextPage();
// }

// cl;
