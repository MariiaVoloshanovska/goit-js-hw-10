// const apiKey = 'live_9i6HzzZFNFA1oaYRze81AbtKlBywv3OJ6502fJjo0pAUtFOdj61V5PlPH5ga6JCl';
// // Функція для виконання запиту на отримання списку порід
// export function fetchBreeds() {
//     return fetch('https://api.thecatapi.com/v1/breeds', {
//       headers: {
//         'x-api-key': apiKey,
//       },
//     }).then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch breeds');
//       }
//       return response.json();
//     });
//   }
//   // Функція для виконання запиту на отримання інформації про кота за породою
//   export function fetchCatByBreed(breedId) {
//     const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
//     return fetch(url, {
//       headers: {
//         'x-api-key': apiKey,
//       },
//     }).then((response) => {
//       if (!response.ok) {
//         throw new Error('Failed to fetch cat by breed');
//       }
//       return response.json().then((data) => {
//         if (data.length > 0) {
//           return {
//             name: data[0].breeds[0].name,
//             description: data[0].breeds[0].description,
//             temperament: data[0].breeds[0].temperament,
//             url: data[0].url,
//           };
//         } else {
//           throw new Error('No cat found for the selected breed');
//         }
//       });
//     });
//   }


const apiKey = 'live_9i6HzzZFNFA1oaYRze81AbtKlBywv3OJ6502fJjo0pAUtFOdj61V5PlPH5ga6JCl';

export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds', {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch breeds');
      }
      return response.json();
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return fetch(url, {
    headers: {
      'x-api-key': apiKey,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to fetch cat by breed');
      }
      return response.json().then((data) => {
        if (data.length > 0) {
          return {
            name: data[0].breeds[0].name,
            description: data[0].breeds[0].description,
            temperament: data[0].breeds[0].temperament,
            url: data[0].url,
          };
        } else {
          throw new Error('No cat found for the selected breed');
        }
      });
    });
}

function fetchBreedInfo(breed) {
  fetchCatByBreed(breed)
    .then((arg) => {
      const catWrapper = document.getElementById('catWrapper');
      catWrapper.innerHTML = `<img src="${arg.url}" alt=""><h1>Name: ${arg.name}</h1>${arg.description}<p><span>Temperament:</span>${arg.temperament}</p>`;
    })
    .catch((error) => {
      console.log(error);
    });
}

fetchBreedInfo('beng');

