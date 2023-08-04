export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
  }

  fetchArticles() {
    Console.console.log(this);
    const options = {
      headers: {
        Authorization: '38614458-d50fcc5469c58311283d9e834',
      },
    };
    const BASE_URL =
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=38614458-d50fcc5469c58311283d9e834';
    fetch(BASE_URL, options)
      .then(response => response.json())
      .then(console.log);
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
