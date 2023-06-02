import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

// Функція для заповнення селекту порід
function populateBreeds(breeds) {
  breeds.forEach((breed) => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}
// Функція для відображення інформації про кота
function displayCatInfo(cat) {
  catInfo.innerHTML = `
    <img src="${cat.url}" alt="Cat Image">
    <p>Name: ${cat.name}</p>
    <p>Description: ${cat.description}</p>
    <p>Temperament: ${cat.temperament}</p>
  `;
}
// Обробник події при зміні вибраної опції в селекті
breedSelect.addEventListener('change', (event) => {
  const selectedBreedId = event.target.value;
  if (selectedBreedId) {
    loader.style.display = 'block';
    catInfo.style.display = 'none';
    error.style.display = 'none';
    fetchCatByBreed(selectedBreedId)
      .then((cat) => {
        displayCatInfo(cat);
        setTimeout(() => {
          loader.style.display = 'none';
        catInfo.style.display = 'block';
        }, 1000);
      })
      .catch(() => {
        error.style.display = 'block';
        loader.style.display = 'none';
      });
  }
});
// Виклик функції для отримання та заповнення списку порід
loader.style.display = 'block';
fetchBreeds()
  .then((breeds) => {
    populateBreeds(breeds);
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
  })
  .catch(() => {
    error.style.display = 'block';
    loader.style.display = 'none';
  });

   