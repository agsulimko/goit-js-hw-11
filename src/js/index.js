import { getPhotosService } from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const btnLoad = document.querySelector('.load-more');
const enterInput = form.firstElementChild;
const btnSearch = form.lastElementChild;

const perPage = 40;
let currentPage = 1;
let querry = '';
let quantityPage = null;

enterInput.addEventListener('focus', handlerFocusInput);
// Приховуємо кнопку LOAD MORE
btnLoad.classList.add('is-hidden');
// console.log(btnSearch);
btnSearch.disabled = true;
//
function handlerFocusInput() {
  btnSearch.disabled = false;
  form.addEventListener('submit', handlerSearch);
  btnLoad.classList.add('is-hidden');
}

async function handlerSearch(evt) {
  handlerFocusInput();
  evt.preventDefault();
  gallery.innerHTML = '';
  currentPage = 1;
  const { searchQuery } = evt.currentTarget.elements;
  console.log(evt.currentTarget.elements);
  querry = searchQuery.value.trim();
  // console.log(querry);
  btnLoad.classList.add('is-hidden');
  if (!querry) {
    return;
  }
  if (evt.type === 'submit') {
    btnLoad.classList.add('is-hidden');
    try {
      const getPhotos = await getPhotosService(querry);
      const { hits, totalHits } = getPhotos;

      if (!hits.length) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      Notify.info(`Hooray! We found ${totalHits} images.`);

      gallery.insertAdjacentHTML('beforeend', createMarcupGallery(hits));

      createLightbox();

      quantityPage = Math.ceil(totalHits / perPage);

      if (currentPage < quantityPage) {
        btnLoad.classList.remove('is-hidden');
        btnLoad.addEventListener('click', handlerLoad);
      }
    } catch (err) {
      Notify.failure(err.message);
    }
  }
}

async function handlerLoad() {
  currentPage += 1;
  // console.log(currentPage);
  try {
    const { hits } = await getPhotosService(querry, currentPage);

    gallery.insertAdjacentHTML('beforeend', createMarcupGallery(hits));

    createLightbox();
    scrollGallery();

    if (currentPage === quantityPage) {
      Notify.info("We're sorry, but you've reached the end of search results.");
      btnLoad.classList.add('is-hidden');
    }
  } catch (err) {
    Notify.failure(err.message);
  }
}

// рендримо розмітку
function createMarcupGallery(hits) {
  return hits
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a href="${largeImageURL}" class="link-lightbox"><div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
            <b>Likes ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads ${downloads}</b>
          </p>
        </div>
      </div>
      </a>`;
      }
    )
    .join(' ');
}

function createLightbox() {
  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 200,
  });
  lightbox.refresh();
}

function scrollGallery() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
