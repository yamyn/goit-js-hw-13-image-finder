const corsServ = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://pixabay.com/api/';
const apiKey = '?key=14998986-82322fa46abf8765da09830ba';
export default {
  page: 1,
  fethImages(searchQuery) {
    const query = `&q=${searchQuery}`;
    const currentPage = `&page=${this.page}`;
    return fetch(corsServ + baseUrl + apiKey + query + currentPage)
      .then(response => response.json())
      .then(data => data.hits);
  },
};
