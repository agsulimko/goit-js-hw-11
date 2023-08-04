// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';
import articlesTpl from './templates/articles.hbs';
import './css/common.css';
import NewsApiService from './js/news-service';
import onSearch from './js/on-search';

const refs = {
  searchForm: document.querySelector('.search-form'),
  articlesContainer: document.querySelector('.js-articles-container'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
  gallery: document.querySelector('.gallery'),
};

const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// let searchQuery = '';

function onSearch(event) {
  event.preventDefult();
  // Посилання на форму
  newsApiService.query = event.currentTarget.elements.query.value;

  newsApiService.resetPage();
  // newsApiService.fetchArticles().then(articles => console.log(articles));
  newsApiService.fetchArticles().then(appendArticlesMarkup);
  //   clearArticlesContainer();
  //   appendArticlesMarkup(articles);
  // });
}

function onLoadMore() {
  // newsApiService.fetchArticles().then(articles => console.log(articles));
  newsApiService.fetchArticles().then(appendArticlesMarkup);
}

// function clearArticlesContainer() {
//   refs.articlesContainer.innerHTML = '';
// }

function createMarkup(photos) {
  return photos
    .map(
      ({
        tags,
        webformatURL,
        largeImageURL,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return /*html*/ `
            <a href='${largeImageURL}' class="card-link js-card-link">
            <div class="photo-card">
              <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <div class="info">
                <div class="info-item info-item-likes">
                  <button type="button" class="circle" onclick="style.boxShadow='inset -1px -1px 3px white, inset 1px 1px 3px rgba(0, 0, 0, 0.1)'">
                    <i class="bi bi-heart-fill" onclick="style.color='#ff0000'"></i>
                  </button>
                  <div class="box-likes"><b>Likes</b>
                  <span id="value">${likes}</span>
                  </div>
                  
                </div>
                <p class="info-item">
                  <b>Views</b>
                  ${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>
                  ${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>
                  ${downloads}
                </p>
              </div>
            </div>
            </a>`;
      }
    )
    .join('');
}

function appendArticlesMarkup(articles) {
  refs.gallery.insertAdjacentHTML('beforeend', createMarkup());
}
//

//    function markup(data) {
//      const { breeds, url } = data[0];
//      const { name, temperament, description } = breeds[0];
//      const beerdCard = `<img class="pfoto-cat" width = "300px" src="${url}" alt="${name}">
//     <div class="text-part">
//   <h2 class="name-cat">${name}</h2>
//   <p class="deskr-cat">${description}</p>
//   <p class="temperament-cat"><span class="temperament-label">Temperament:</span> ${temperament}</p>  </div>`;

//      catInfo.innerHTML = beerdCard;

//    }

// }
// const BASE_URL=`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}=${this.page}=12&key=${твой_ключ}`;
// const options ={
//   headers: {Autorization: '38614458-d50fcc5469c58311283d9e834'},
// }
// fetch(BASE_URL, options)
// .then(response => response.json())
// .then(console.log);

// const getUsers = ()=>
// fetch(`${BASE_URL}`, {
//   method: 'GET' }).then(response => {
//     if(!response.ok) {
//       throw new Error(response.status);
//     }
// return response.json();
//   });

//   const getUsers =() => axios.get(`${BASE_URL}`);
//   getUsers().then(console.log).catch(console.warn);

//   getUsers()
//   .then(({data}) =>{
//     console.log(data);
//   })
//   .catch(error => {
//       alert(error.message);
//   });

// <div class="photo-card">
//   <img src="{{urlToImage" alt="" loading="lazy" width="400">
//   <div class="info">
//     <p class="info-item">
//       <b>Likes</b>
//     </p>
//     <p class="info-item">
//       <b>Views</b>
//     </p>
//     <p class="info-item">
//       <b>Comments</b>
//     </p>
//     <p class="info-item">
//       <b>Downloads</b>
//     </p>
//   </div>
// </div>
