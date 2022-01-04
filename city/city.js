import { 
    checkAuth, 
    logout,
    getCity,
    createDefaultCity,
    updateWaterfront,
    updateSkyline,
    updateCastle,
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const waterfrontDropdown = document.querySelector('#waterfront-dropdown');
const skylineDropdown = document.querySelector('#skyline-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');
const cityNameEl = document.querySelector('.city-name');
const sloganListEl = document.querySelector('.slogan-list');
const waterImgEl = document.querySelector('#waterfront-img');
const skylineImgEl = document.querySelector('#skyline-img');
const castleImgEl = document.querySelector('#castle-img');
const sloganForm = document.querySelector('.slogan-form');
const nameForm = document.querySelector('.name-form');
const reportEl = document.querySelector('.report');

logoutButton.addEventListener('click', () => {
    logout();
});

let waterfrontCount = 0;
let skylineCount = 0;
let castleCount = 0;

window.addEventListener('load', async() => {
    const city = await getCity();

    if (!city) 
    { const newCity = await createDefaultCity();
        displayCity(newCity);
    } else {
        displayCity(city);
    }
});

waterfrontDropdown.addEventListener('change', async() => {
    waterfrontCount++;

    const newWater = await updateWaterfront(waterfrontDropdown.value);

    displayCity(newWater);
});

skylineDropdown.addEventListener('change', async() => {
    skylineCount++;

    const newSky = await updateSkyline(skylineDropdown.value);

    displayCity(newSky);
});

castleDropdown.addEventListener('change', async() => {
    castleCount++;

    const newCastle = await updateCastle(castleDropdown.value);

    displayCity(newCastle);
});

function displayCity(city) {
    cityNameEl.textContent = city.name;

    waterImgEl.src = `../assets/waterfront-${city.waterfront_id}.jpg`;

    skylineImgEl.src = `../assets/skyline-${city.skyline_id}.jpg`;

    castleImgEl.src = `../assets/castle-${city.castle_id}.jpg`;

    sloganListEl.textContent = '';

    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');

        sloganEl.classList.add('slogan');

        sloganEl.textContent = slogan;

        sloganListEl.append(sloganEl);
    }
}