export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  // метод відповідний за API запроси
  fetchArticles() {
    console.log('до запроса', this);
    const options = {
      headers: {
        Authorization: '38614458-d50fcc5469c58311283d9e834',
      },
    };
    const url =
      'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}=${this.page}=12&safesearch´=true&key=38614458-d50fcc5469c58311283d9e834';
    return (
      fetch(url, options)
        .then(response => response.json())
        //   .then(console.log);
        .then(data => {
          console.log(data);

          this.incremrntPage();
          console.log('після запроса', this);
          return data.articles;
        })
    );
  }
  incremrntPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
