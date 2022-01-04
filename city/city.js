import { 
    checkAuth, 
    logout,
    getCity,
    createDefaultCity
} from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');
const waterfrontDropdown = document.querySelector('#waterfront-dropdown');
const skylineDropdown = document.querySelector('#skyline-dropdown');
const castleDropdown = document.querySelector('#castle-dropdown');
const cityNameEl = document.querySelector('.city-name');
const sloganListEl = document.querySelector('#slogan-list');
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
    {await createDefaultCity();
        refreshData();
    } else {
        refreshData();
    }
});

function displayStats() {
    reportEl.textContent = `You habe changes the waterfront ${waterfrontCount} times, the skyline ${skylineCount} times, the castle ${castleCount} times, and nobody can forget your cities slogan:`;
}

function refreshData() {
    displayStats();
    fetchAndDisplayCity();
}