// Константа з ключем API
const API_KEY = 'live_9i6HzzZFNFA1oaYRze81AbtKlBywv3OJ6502fJjo0pAUtFOdj61V5PlPH5ga6JCl';

// Функція для отримання списку всіх порід котів
export const fetchBreeds = fetch("https://api.thecatapi.com/v1/breeds")
  .then(response => {
      // Перевірка статусу відповіді сервера
      if (!response.ok) {
        throw new Error(response.status);
      }
      // Повернення результату в форматі JSON
    return response.json();
  });

// Функція для отримання кота за його породою
export const fetchCatByBreed = (catsId) => {
    // Виклик API для отримання даних про кота з використанням ключа API та ідентифікатора породи
  return fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${catsId}&api_key=${API_KEY}`)
    .then(response => { 
      if (!response.ok) { // Перевірка статусу відповіді сервера
        throw new Error(response.status);
      }
      // Повернення результату в форматі JSON
    return response.json();
  });
};


    