import InfiniteScroll from 'infinite-scroll';
import galleryCartTemplate from '../templates/gallery-cart-template.hbs';

const refs = {
  gallery: document.querySelector('#gallery'),
};

const infScrollInstance = new InfiniteScroll(refs.gallery, {
  responseType: 'text',
  history: false,
  path() {
    return `https://cors-anywhere.herokuapp.com/https://pixabay.com/api/?key=14998986-82322fa46abf8765da09830ba&q=yellow+flowers&image_type=photo&pretty=true&page=${this.pageIndex}`;
  },
});

infScrollInstance.on('load', response => {
  const imagesObj = JSON.parse(response);
  const images = imagesObj.hits;
  console.log(images);
  const markup = images.reduce(
    (string, image) => string + galleryCartTemplate(image),
    '',
  );

  const proxyEl = document.createElement('div');
  proxyEl.innerHTML = markup;

  console.log(proxyEl);
  infScrollInstance.appendItems(proxyEl.children);
});

infScrollInstance.loadNextPage();
