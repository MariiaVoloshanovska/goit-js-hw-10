import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

// Елементи DOM, на які посилається код
const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

fetchBreeds
  .then(response => {
    const catListName = response.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
    refs.breedSelect.innerHTML = catListName;
    fetchCatByBreed(refs.breedSelect.value)
    .then(response => {
      const cats = response.map(item => item.breeds[0]);
      const catElements = cats.map(cat => `
        <div class='wrapper'> 
          <img class="cats-img" width=500 src="${response[0].url}" alt="${cat.name}">
          <h2>${cat.name}</h2>
          <p class="cat-description">${cat.description}</p>
          <p class="cat-description">Temperament: ${cat.temperament}</p>
        </div>
      `);

  refs.catInfo.innerHTML = ''; 
  refs.loader.classList.remove('is-hidden')
  setTimeout(() => {
  refs.loader.classList.add('is-hidden')
  refs.catInfo.innerHTML = catElements.join(''); 
}, 600);
      Notiflix.Report.Failure('Error', 'An error occurred while retrieving the cat data.');
    });
    
  })
  .catch(() => {
    // Обробка помилки отримання списку котів
    refs.loader.classList.add('is-hidden');
    refs.breedSelect.classList.remove('is-hidden');
    refs.error.classList.add('is-hidden');
    Notiflix.Report.Failure('Error', 'An error occurred while loading the cat list.');
  });

const newFunct = event => {
  fetchCatByBreed(refs.breedSelect.value)
    .then(response => {
      const cats = response.map(item => item.breeds[0]); 
      const catElements = cats.map(cat => `
        <div class='wrapper'> 
          <img class="cats-img" width=500 src="${response[0].url}" alt="${cat.name}">
          <h2>${cat.name}</h2>
          <p class="cat-description">${cat.description}</p>
          <p class="cat-description">Temperament: ${cat.temperament}</p>
        </div>
      `);

      // Оновлення HTML-вмісту елементу з класом "cat-info" (refs.catInfo)
  refs.catInfo.innerHTML = ''; 
  refs.loader.classList.remove('is-hidden')
  setTimeout(() => {
  refs.loader.classList.add('is-hidden')
  refs.catInfo.innerHTML = catElements.join(''); 
}, 600);

      // Виведення повідомлення про помилку за допомогою бібліотеки Notiflix
      Notiflix.Report.Failure('Error', 'An error occurred while retrieving the cat data.');
    });
};
// Додавання обробника події "change" до елементу випадаючого списку
refs.breedSelect.addEventListener('change', newFunct);




//   // Опрацювання події зміни випадаючого списку
// refs.breedSelect.addEventListener('change', event => {
//   // Виклик функції fetchCatByBreed з обраним значенням з випадаючого списку
//   fetchCatByBreed(refs.breedSelect.value)
//     .then(response => {
//       const cats = response.map(item => item.breeds[0]); // Отримання першої породи кожного кота з отриманих даних
  
// // Генерування HTML-коду для кожного кота в масиві cats + // Створення HTML-коду для кожного кота
//   const catElements = cats.map(cat => `
//     <div class='wrapper'> 
//       <img width=500 src="${response[0].url}" alt="${cat.name}">
//       <h2>${cat.name}</h2>
//       <p class="cat-description">${cat.description}</p>
//       <p class="cat-description">Temperament: ${cat.temperament}</p>
//     </div>
//   `);
  
// // Оновлення HTML-вмісту елементу з класом "cat-info" (refs.catInfo)
//     refs.catInfo.innerHTML = catElements.join('');
//     Notiflix.Report.Failure('Error', 'An error occurred while retrieving the cat data.');
//   });
// });
  










