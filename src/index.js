// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// // Функція для заповнення селекту порід
// function populateBreeds(breeds) {
//   breeds.forEach((breed) => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.textContent = breed.name;
//     breedSelect.appendChild(option);
//   });
// }
// // Функція для відображення інформації про кота
// function displayCatInfo(cat) {
//   catInfo.innerHTML = `
//     <img src="${cat.url}" alt="Cat Image">
//     <p>Name: ${cat.name}</p>
//     <p>Description: ${cat.description}</p>
//     <p>Temperament: ${cat.temperament}</p>
//   `;
// }
// // Обробник події при зміні вибраної опції в селекті
// breedSelect.addEventListener('change', (event) => {
//   const selectedBreedId = event.target.value;
//   if (selectedBreedId) {
//     loader.style.display = 'block';
//     catInfo.style.display = 'none';
//     error.style.display = 'none';
//     fetchCatByBreed(selectedBreedId)
//       .then((cat) => {
//         displayCatInfo(cat);
//         setTimeout(() => {
//           loader.style.display = 'none';
//         catInfo.style.display = 'block';
//         }, 1000);
//       })
//       .catch(() => {
//         error.style.display = 'block';
//         loader.style.display = 'none';
//       });
//   }
// });
// // Виклик функції для отримання та заповнення списку порід
// loader.style.display = 'block';
// fetchBreeds()
//   .then((breeds) => {
//     populateBreeds(breeds);
//     loader.style.display = 'none';
//     breedSelect.style.display = 'block';
//   })
//   .catch(() => {
//     error.style.display = 'block';
//     loader.style.display = 'none';
//   });

   ////////////////////////////////////

// import { fetchBreeds } from './cat-api';

// const refs = {
//   select: document.querySelector('.breed-select'),
//   loader: document.querySelector('.loader'),
//   error: document.querySelector('.error'),
//   catWrapper: document.querySelector('.cat-info'),
// };

// // Функція для заповнення селекту порід
// function populateBreeds(breeds) {
//   const options = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`);
//   refs.select.innerHTML = options.join('');
// }

// // Функція для відображення інформації про кота
// function displayCatInfo(cat) {
//   refs.catWrapper.innerHTML = `
//     <img src="${cat.url}" alt="Cat Image">
//     <p>Name: ${cat.name}</p>
//     <p>Description: ${cat.description}</p>
//     <p>Temperament: ${cat.temperament}</p>
//   `;
// }

// // Обробник події при зміні вибраної опції в селекті
// refs.select.addEventListener('change', (event) => {
//   const selectedBreedId = event.target.value;
//   if (selectedBreedId) {
//     refs.loader.style.display = 'block';
//     refs.catWrapper.style.display = 'none';
//     refs.error.style.display = 'none';
//     fetchCatByBreed(selectedBreedId)
//       .then((cat) => {
//         displayCatInfo(cat);
//         setTimeout(() => {
//           refs.loader.style.display = 'none';
//           refs.catWrapper.style.display = 'block';
//         }, 1000);
//       })
//       .catch(() => {
//         refs.error.style.display = 'block';
//         refs.loader.style.display = 'none';
//       });
//   }
// });

// // Виклик функції для отримання та заповнення списку порід
// refs.loader.style.display = 'block';
// fetchBreeds()
//   .then((breeds) => {
//     populateBreeds(breeds);
//     refs.loader.style.display = 'none';
//     refs.select.style.display = 'block';
//   })
//   .catch(() => {
//     refs.error.style.display = 'block';
//     refs.loader.style.display = 'none';
//   });
//////////////////////////////////////////////////////////////////MAIN
// index.js
// import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const refs = {
//   select: document.querySelector('.breed-select'),
//   loader: document.querySelector('.loader'),
//   err: document.querySelector('.error'),
//   catWrapper: document.querySelector('.cat-info'),
// };

// function populateBreeds(breeds) {
//   refs.select.insertAdjacentHTML(
//     'beforeend',
//     breeds.map((el) => `<option value="${el.id}">${el.name}</option>`).join('')
//   );
// }

// function displayCatInfo(cat) {
//   refs.catWrapper.innerHTML = `
//     <img src="${cat.url}" alt="Cat Image">
//     <p>Name: ${cat.name}</p>
//     <p>Description: ${cat.description}</p>
//     <p>Temperament: ${cat.temperament}</p>
//   `;
// }

// function showLoader() {
//   refs.loader.style.display = 'block';
//   refs.catWrapper.style.display = 'none';
//   refs.err.style.display = 'none';
// }

// function hideLoader() {
//   refs.loader.style.display = 'none';
// }

// function showError() {
//   refs.err.style.display = 'block';
// }

// refs.select.addEventListener('change', (event) => {
//   const selectedBreedId = event.target.value;
//   if (selectedBreedId) {
//     showLoader();
//     fetchCatByBreed(selectedBreedId)
//       .then((cat) => {
//         displayCatInfo(cat);
//         setTimeout (() => {
//         hideLoader();
//         refs.catWrapper.style.display = 'block';
//       }, 500)
//       })
//       .catch(() => {
//         hideLoader();
//         showError();
//       });
//   }
// });

// showLoader();
// fetchBreeds()
//   .then((breeds) => {
//     populateBreeds(breeds);
//     hideLoader();
//   })
//   .catch(() => {
//     hideLoader();
//     showError();
//   });

import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

let allBreeds = null;

function loadCatImg() {
  refs.select.classList.toggle('invisible');
  refs.catInfo.classList.toggle('invisible');
  refs.loader.classList.toggle('invisible');
  refs.error.classList.add('invisible');


    fetchBreeds()
      .then((data) => {
        allBreeds = data;
        const markup = data
          .map((breed) => `<option value="${breed.id}">${breed.name}</option>`)
          .join('');
        refs.select.insertAdjacentHTML('beforeend', markup);
      })
      
      .catch((err) => {
        refs.error.classList.remove('invisible');
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        console.log(err);
      })
      .finally(() => {
        
        refs.select.classList.toggle('invisible');
        refs.catInfo.classList.toggle('invisible');
        refs.loader.classList.toggle('invisible');
        setTimeout(() => {
          refs.loader.classList.toggle('invisible');

        }, 1000);
      });
}

loadCatImg();

refs.select.addEventListener('change', onChangeSelect);

function onChangeSelect(event) {
  const selectValue = event.target.value;
  const breedInfo = allBreeds.find((breed) => breed.id === selectValue);

  fetchCatByBreed(selectValue)
    .then(([breedImg]) => {
      const catInfoMarkup = `
        <img src="${breedImg.url}" alt="${breedInfo.name}" width="300"/>
        <h2>${breedInfo.name}</h2>
        <p>${breedInfo.description}</p>
        <p><b>Temperament:</b>${breedInfo.temperament}</p>`;
      refs.catInfo.innerHTML = catInfoMarkup;
    })
    .catch((err) => {
      console.log(err);
    });
}


























//   import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

// const breedSelect = document.querySelector('.breed-select');
// const loader = document.querySelector('.loader');
// const error = document.querySelector('.error');
// const catInfo = document.querySelector('.cat-info');

// function populateBreeds(breeds) {
//   const options = breeds.map((breed) => {
//     const option = document.createElement('option');
//     option.value = breed.id;
//     option.textContent = breed.name;
//     return option;
//   });

//   breedSelect.append(...options);
// }

// function displayCatInfo(cat) {
//   catInfo.innerHTML = `
//     <img src="${cat.url}" alt="Cat Image">
//     <p>Name: ${cat.name}</p>
//     <p>Description: ${cat.description}</p>
//     <p>Temperament: ${cat.temperament}</p>
//   `;
// }

// breedSelect.addEventListener('change', (event) => {
//   const selectedBreedId = event.target.value;
//   if (selectedBreedId) {
//     loader.style.display = 'block';
//     catInfo.style.display = 'none';
//     error.style.display = 'none';
//     fetchCatByBreed(selectedBreedId)
//       .then((cat) => {
//         displayCatInfo(cat);
//         setTimeout(() => {
//           loader.style.display = 'none';
//           catInfo.style.display = 'block';
//         }, 1000);
//       })
//       .catch(() => {
//         error.style.display = 'block';
//         loader.style.display = 'none';
//       });
//   }
// });

// loader.style.display = 'block';
// fetchBreeds()
//   .then((breeds) => {
//     populateBreeds(breeds);
//     loader.style.display = 'none';
//     breedSelect.style.display = 'block';
//   })
//   .catch(() => {
//     error.style.display = 'block';
//     loader.style.display = 'none';
//   });
