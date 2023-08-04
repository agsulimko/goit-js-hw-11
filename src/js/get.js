// import axios from 'axios';

// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const BASE_URL='https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=38614458-d50fcc5469c58311283d9e834';
const key= '38614458-d50fcc5469c58311283d9e834';
// const getUsers = ()=> 
// fetch(`${BASE_URL}/cats`, {
//   method: 'GET' }).then(response => {
//     if(!response.ok) {
//       throw new Error(response.status);
//     }
// return response.json();
//   });


const getUsers =() => axios.get(`${BASE_URL}/ru/images/search/cats`);
getUsers().then(console.log).catch(console.warn);

getUsers()
.then(({data}) =>{
  console.log(data);  
})
.catch(error => {
    alert(error.message);
});
