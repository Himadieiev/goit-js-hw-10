import './css/styles.css';
import { fetchCountries } from "./fetchCountries";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
const input = document.querySelector('input');
const listOfCountries = document.querySelector('.country-list');
const infoOfCountry = document.querySelector('.country-info');
let countryName = '';

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  countryName = input.value.trim();
  if (countryName === '') {
    listOfCountries.innerHTML = '';
    infoOfCountry.innerHTML = '';
    return;
    } else fetchCountries(countryName).then(names => {
        if (names.length < 2) {
            createInfoOfCountry(names);
            Notiflix.Notify.success('Here your result');
        } else if (names.length < 10 && names.length > 1) {
            createListOfContries(names);
            Notiflix.Notify.success('Here your results');
        } else {
            listOfCountries.innerHTML = '';
            infoOfCountry.innerHTML = '';
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
        };
    })
        .catch(() => {
        listOfCountries.innerHTML = '';
        infoOfCountry.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name.');
    });
}

function createListOfContries(country) {
  listOfCountries.innerHTML = '';
  infoOfCountry.innerHTML = '';

  const list = country.map(item => `<li>
  <img src="${item.flags.svg}" alt="Country flag" width="30", height="20">
  <span>${item.name.official}</span>
</li>`)
    .join('');
  
  listOfCountries.insertAdjacentHTML('beforeend', list);
}

function createInfoOfCountry(country) {
  listOfCountries.innerHTML = '';
  infoOfCountry.innerHTML = '';

  const info = `<img src="${country[0].flags.svg}" alt="Country flag" width="40", height="25">
    <span>${country[0].name.official}</span>
    <p>Capital: ${country[0].capital}</p>
    <p>Population: ${country[0].population}</p>
    <p>Languages: ${Object.values(country[0].languages)}</p>`
  
  infoOfCountry.innerHTML = info;
}