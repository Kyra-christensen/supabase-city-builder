import { 
    checkAuth, 
    logout,
    getCity,
    createDefaultCity,
    updateWaterfront,
    updateSkyline,
    updateCastle,
    updateName,
    updateSlogans
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
console.log(sloganForm);
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
        await displayCity(newCity);
    } else {
        await displayCity(city);
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

nameForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(nameForm);

    const name = data.get('name');

    const newName = await updateName(name);

    displayCity(newName);
});

sloganForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(sloganForm);

    const newSlogans = data.get('slogan-input');
    console.log(newSlogans);
    const city = await getCity();

    city.slogans.push(newSlogans);

    const updatedCity = await updateSlogans(city.slogans);

    displayCity(updatedCity);
    
});

async function displayCity(city) {
    // const city = await getCity();

    cityNameEl.textContent = city.name;

    waterImgEl.src = `../assets/waterfront-${city.waterfront_id}.jpg`;

    skylineImgEl.src = `../assets/skyline-${city.skyline_id}.jpg`;

    castleImgEl.src = `../assets/castle-${city.castle_id}.jpg`;

    sloganListEl.textContent = '';

    reportEl.textContent = `You have changed the waterfront ${waterfrontCount} times, the skyline ${skylineCount} times, the castle ${castleCount} times, and no one can forget your city's slogan: `;
    
    sloganListEl.textContent = '';
    
    for (let slogan of city.slogans) {
        const sloganEl = document.createElement('p');

        sloganEl.classList.add('slogan');

        sloganEl.textContent = slogan;

        sloganListEl.append(sloganEl);
    }
}