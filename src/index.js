import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
//У цьому коді ми імпортуємо функції fetchBreeds та fetchCatByBreed з 
//модуля cat-api.js, який містить функції для отримання списку порід 
//котів та даних про котів за породою. Крім того, ми імпортуємо модуль Notiflix, 
//який використовується для відображення повідомлень.


// Елементи DOM, на які посилається код
const refs = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  catInfo: document.querySelector('.cat-info'),
};//Ця частина коду встановлює посилання на елементи на сторінці за допомогою їх класів. 
//Елементи включають в себе випадаючий список порід котів (breedSelect), 
//елемент завантажувача (loader), елемент помилки (error) та контейнер для відображення інформації про котів (catInfo).

// Отримання списку порід котів з використанням функції fetchBreeds
//За допомогою функції fetchBreeds отримується список порід котів. 
//Після успішного отримання відповіді, дані перетворюються на 
//рядок з елементами <option>, які встановлюються як вміст 
//елемента breedSelect. У разі помилки отримання списку котів, виконується обробка помилки.

fetchBreeds //Отримання списку порід котів:
  .then(response => {
    const catListName = response.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('');
     // Встановлення рядка з елементами <option> вмісту елемента breedSelect
     //У цій частині коду викликається функція fetchBreeds, яка повертає список порід котів. 
     //Ми використовуємо метод map для перетворення отриманого масиву порід котів у рядок 
     //HTML-коду, де кожна порода представлена елементом <option>. 
     //Рядок HTML-коду потім встановлюється як вміст елементу breedSelect, 
     //щоб відображати список порід котів у випадаючому списку.
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
//З використанням методу map, отриману відповідь ми перетворюємо на масив об'єктів cats, 
//де кожний об'єкт містить інформацію про породу кота.
//Потім ми створюємо HTML-код для кожного кота за допомогою методу map і 
//зберігаємо їх у масиві catElements. Код включає зображення кота, назву, опис і темперамент.

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
    //У цій частині коду використовується функція fetchCatByBreed, зі значенням, яке вибрано в елементі breedSelect, 
    //яка отримує дані про котів за вибраною породою. 
    //Після успішного отримання відповіді, дані перетворюються на HTML-код для кожного 
    //кота і вставляються у контейнер catInfo. Також відбувається показ та приховування 
    //елемента loader для візуального відображення процесу завантаження. 
    //У разі помилки відображається повідомлення про помилку за допомогою Notiflix.
    
  })
  .catch(() => {  // Обробка помилки отримання списку котів
    //При зміні вибраної породи кота (за допомогою події change на елементі breedSelect), 
    //виконується функція newFunct, яка викликає функцію fetchCatByBreed для 
    //отримання даних про котів цієї породи. Після успішного отримання відповіді 
    //з даними про котів, вони обробляються і відображаються на сторінці. 
    //У разі помилки отримання даних про котів, виконується обробка помилки.

    // Приховання завантажувача
    refs.loader.classList.add('is-hidden');
    // Видалення класу is-hidden для показу елемента breedSelect
    refs.breedSelect.classList.remove('is-hidden');
    // Приховання елемента error
    refs.error.classList.add('is-hidden');
    Notiflix.Report.Failure('Error', 'An error occurred while loading the cat list.');
  });
  //У разі, якщо виникла помилка під час отримання списку порід котів, 
  //елемент loader приховується, елемент breedSelect знову стає видимим, 
  //елемент error залишається прихованим, а також відображається повідомлення про помилку

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


//У цій частині коду відбувається обробка зміни вибраної породи кота. При зміні вибору, 
//викликається функція newFunct, яка виконує наступні дії:

//Викликається функція fetchCatByBreed з новим значенням, вибраним у елементі breedSelect, 
//для отримання даних про котів за новою породою.
//Після отримання відповіді, дані про котів обробляються аналогічно до попередньої частини коду.
//Якщо виникає помилка, викликається метод Notiflix.Report.Failure для відображення повідомлення про помилку.



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
  










