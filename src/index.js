import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

// Елементи DOM, на які посилається код
const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};

// Отримання списку порід котів з використанням функції fetchBreeds
fetchBreeds
  .then(response => {
    const catListName = response.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
     // Встановлення рядка з елементами <option> вмісту елемента breedSelect
    refs.breedSelect.innerHTML = catListName;

    // Отримання даних про котів за вибраною породою з використанням функції fetchCatByBreed
    fetchCatByBreed(refs.breedSelect.value)
    .then(response => {
      // Маппінг відповіді на масив об'єктів котів
      const cats = response.map(item => item.breeds[0]);
     // Створення HTML-коду для кожного кота
      const catElements = cats.map(cat => `
        <div class='wrapper'> 
          <img class="cats-img" width=500 src="${response[0].url}" alt="${cat.name}">
          <h2>${cat.name}</h2>
          <p class="cat-description">${cat.description}</p>
          <p class="cat-description">Temperament: ${cat.temperament}</p>
        </div>
      `);

  // Очищення HTML-вмісту елементу catInfo
  refs.catInfo.innerHTML = ''; 
  // Видалення класу is-hidden для показу завантажувача
  refs.loader.classList.remove('is-hidden');
  // Затримка на 600 мс перед оновленням вмісту catInfo і приховуванням завантажувача
  setTimeout(() => {
  refs.loader.classList.add('is-hidden')
  refs.catInfo.innerHTML = catElements.join(''); 
}, 600);
      Notiflix.Report.Failure('Error', 'An error occurred while retrieving the cat data.');
    });
    
  })
  .catch(() => {
    // Обробка помилки отримання списку котів
    // Приховання завантажувача
    refs.loader.classList.add('is-hidden');
    // Видалення класу is-hidden для показу елемента breedSelect
    refs.breedSelect.classList.remove('is-hidden');
    // Приховання елемента error
    refs.error.classList.add('is-hidden');
    Notiflix.Report.Failure('Error', 'An error occurred while loading the cat list.');
  });

// Функція, яка викликається при зміні вибраної породи кота
const newFunct = event => {
  // Отримання даних про котів за вибраною породою з використанням функції fetchCatByBreed
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

     // Очищення HTML-вмісту елементу catInfo (refs.catInfo)
  refs.catInfo.innerHTML = ''; 
  // Видалення класу is-hidden для показу завантажувача
  refs.loader.classList.remove('is-hidden')
  // Затримка на 600 мс перед оновленням вмісту catInfo і приховуванням завантажувача
  setTimeout(() => {
  refs.loader.classList.add('is-hidden')
  refs.catInfo.innerHTML = catElements.join(''); 
}, 600);

      // Виведення повідомлення про помилку за допомогою бібліотеки Notiflix
      Notiflix.Report.Failure('Error', 'An error occurred while retrieving the cat data.');
    });
};
// Додавання обробника події "change" до елементу випадаючого списку breedSelect
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
  










