import Masonry from 'masonry-layout';
import galleryCartTemplate from '../templates/gallery-cart-template.hbs';
import imageService from './services/apiService';

const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('#gallery'),
};

const masonryInstance = new Masonry(refs.gallery, {
  columnWidth: '.gallery__sizer',
  itemSelector: '.gallery__item',
  percentPosition: true,
  gutter: 20,
});

console.log(masonryInstance);

refs.form.addEventListener('submit', getImagesHandler);

function getImagesHandler(event) {
  event.preventDefault();

  const searchQuery = event.currentTarget.elements.query.value;
  console.log(searchQuery);

  imageService.fethImages(searchQuery).then(images => {
    console.log(images);
    toGenMarkup(images);
  });
}

function toGenMarkup(images) {
  const markup = images.map(image => galleryCartTemplate(image));
  const proxyEl = document.createElement('ul');
  proxyEl.innerHTML = markup;
  for (let i = 0; i < proxyEl.children.length; i += 1) {
    refs.gallery.append(proxyEl.children[i]);
    masonryInstance.addItems(proxyEl.children[i]);
  }
  // refs.gallery.append(...proxyEl.children);
  // console.log(proxyEl.children[1]);
  // masonryInstance.addItems(...proxyEl.children);
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
