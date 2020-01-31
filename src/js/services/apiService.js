const corsServ = 'https://cors-anywhere.herokuapp.com/';
const baseUrl = 'https://pixabay.com/api/';
const apiKey = '?key=14998986-82322fa46abf8765da09830ba';
export default {
  page: 1,
  query: '',

  fethImages() {
    const queryParam = `&q=${this.query}`;
    const currentPage = `&page=${this.page}`;

    return fetch(corsServ + baseUrl + apiKey + queryParam + currentPage)
      .then(response => response.json())
      .then(data => {
        this.incrementPage();
        return data.hits;
      });
  },

  incrementPage() {
    this.page += 1;
  },

  get currentQuery() {
    return this.query;
  },

  set currentQuery(string) {
    this.query = string;
  },
};
