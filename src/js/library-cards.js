import { loaderRender } from './preloader';
import cardTemplate from '../templates/film-card.hbs';
import { numberConverter } from './prepare-number';

const paginationBox = document.querySelector('.pagination__list');
const cards = document.querySelector('.cards');
const emptyEl = document.querySelector('.empty');
const modalOpenEl = document.querySelector('.cards');
const modalCloseEl = document.querySelector('[data-modal-close]');
const modalEl = document.querySelector('[data-modal]');
const backdropEl = document.querySelector('.backdrop');
const watchedFilmListBtnEl = document.getElementById('js-WatchedButton');
const queuedFilmListBtnEl = document.getElementById('js-QueueButton');
const WATCHED_STORAGE_KEY = "watched films";
const QUEUE_STORAGE_KEY = "films in queue";
let globalCurrentPage = 1;
let renderFilmCardPage = null;

loaderRender();

watchedFilmListBtnEl.addEventListener('click', onLSLoadWatched);
queuedFilmListBtnEl.addEventListener('click', onLSLoadQueue);

// слухач на батьківський UL карток
modalOpenEl.addEventListener('click', onModalOpenClick);

// ==============================================
// Початкова ініціалізація сторінки
onLSLoadWatched();
// ==============================================


// ================================================
// Функція зчитування даних з ЛС
// повертає масив об'єктів або null
function readFromLS(key) {
    let filmsArray = JSON.parse(localStorage.getItem(key));
    // перевірка на наявність масиву в ЛС
    if (filmsArray === null) {
        return;
    }
    return filmsArray;
};
// ================================================


// ===========================================================
// Функції-обробники перемикача в хедері
// Функція-обробник кліку перемикача QUEUE
function onLSLoadWatched() {
    contentRender(WATCHED_STORAGE_KEY, 'watched', 1);
}

// Функція-обробник кліку перемикача WATCHED
function onLSLoadQueue() {
    contentRender(QUEUE_STORAGE_KEY, 'queued', 1);
}
// ===========================================================


// ===========================================================
// Універсальна функція вимальовки всього контенту на стоірнці
function contentRender(storageKey, attrib, currPage) {
    // витягує масив фільмів з ЛС
    const filmArr = readFromLS(storageKey);

    // перевірка на наявність масиву в ЛС
    if (filmArr === null) {
        return;
    }

    // змінює дата-атрибут
    cards.dataset.position = attrib;

    // Визначаю кількість сторінок
    let allPages = splitArrayOnSubarrays(filmArr).length;

    // Обрізка масиву на порції
    // При цьому треба пам'ятати, що нумерація порції даних
    // (тобто масива в масиві) починається з 0
    renderFilmCardPage = currPage - 1;
    let arrPortion = splitArrayOnSubarrays(filmArr)[renderFilmCardPage];
    console.log(arrPortion);

    // рендерить масив фільмів
    renderFilmCards(arrPortion, currPage);

    // рендерить пагінацію
    paginationMarkupRender(currPage, allPages);
}
// ===========================================================


// ===========================================================
// Функція, що підготовлює дані в картки для рендеру
// - Приймає масив об'єктів
// - Рендерить об'єкти в картки на сторінці
function renderFilmCards(films) {

    const markup = films.map(film => {

        const rating = numberConverter(film.vote_average);

        // Формую підготовлений об'єкт даних для закидання в handlebar
        const editedFilm = {
            ...film,
            poster_path: `https://image.tmdb.org/t/p/w500${film.poster_path}`,
            genres: film.filmGenres,
            release_date: film.release_date.slice(0, 4),
            vote_average: rating,
        };
        return editedFilm;
    });

    emptyEl.innerHTML = '';
    cards.innerHTML = cardTemplate(markup);
}
// ===========================================================





// ======================================
// PAGINATION
// Обробка результатів пошуку
// ======================================

paginationBox.addEventListener('click', onPaginationLibraryClick);

// Функція розбивки масиву на підмасиви
// - повертає масив масивів
function splitArrayOnSubarrays(array) {
    // console.log(array);
    const allCards = 20;
    const sliceArr = array
        .map(function (el, ind) {
            return ind % allCards === 0 ? array.slice(ind, ind + allCards) : null;
        })
        .filter(function (el) {
            return el;
        });
    // Повертає масив масивів
    return sliceArr;
}

// Функція рендеру кнопок пагінації
function paginationMarkupRender(currentPage, allPages) {
    // currentPage = currentPage + 1;
    console.log(currentPage);
    let markup = '';
    let beforeTwoPage = currentPage - 2;
    let beforePage = currentPage - 1;
    globalCurrentPage = currentPage;
    let afterPage = currentPage + 1;
    let afterTwoPage = currentPage + 2;

    if (currentPage > 1) {
        markup += `<li class="pagination__item slider-arrow prev">&#129144</li>`;
        markup += `<li class="pagination__item">1</li>`;
    }
    if (currentPage > 4) {
        markup += `<li class="pagination__item dots">...</li>`;
    }
    if (currentPage > 3) {
        markup += `<li class="pagination__item">${beforeTwoPage}</li>`;
    }
    if (currentPage > 2) {
        markup += `<li class="pagination__item">${beforePage}</li>`;
    }
    markup += `<li class="pagination__item pagination__item--current">${currentPage}</li>`;

    if (allPages - 1 > currentPage) {
        markup += `<li class="pagination__item">${afterPage}</li>`;
    }
    if (allPages - 2 > currentPage) {
        markup += `<li class="pagination__item">${afterTwoPage}</li>`;
    }
    if (allPages - 3 > currentPage) {
        markup += `<li class="pagination__item dots">...</li>`;
    }
    if (allPages > currentPage) {
        markup += `<li class="pagination__item">${allPages}</li>`;
        markup += `<li class="pagination__item slider-arrow next">&#129146</li>`;
    }
    paginationBox.innerHTML = markup;
}

// Функція обробки кліків пагінації
function onPaginationLibraryClick(event) {
    if (event.target.nodeName !== 'LI') {
        return;
    }
    if (event.target.textContent === '...') {
        return;
    }
    if (event.target.textContent === '🡸') {
        if (cards.dataset.position === 'watched') {
            globalCurrentPage -= 1;
            contentRender(WATCHED_STORAGE_KEY, 'watched', globalCurrentPage);
            return;
        }
        if (cards.dataset.position === 'queued') {
            globalCurrentPage -= 1;
            contentRender(QUEUE_STORAGE_KEY, 'queued', globalCurrentPage);
            return;
        }
    }
    if (event.target.textContent === '🡺') {
        if (cards.dataset.position === 'watched') {
            globalCurrentPage += 1;
            contentRender(WATCHED_STORAGE_KEY, 'watched', globalCurrentPage);
            return;
        }
        if (cards.dataset.position === 'queued') {
            globalCurrentPage += 1;
            contentRender(QUEUE_STORAGE_KEY, 'queued', globalCurrentPage);
            return;
        }
    }

    const page = Number(event.target.textContent);
    globalCurrentPage = page;
    if (cards.dataset.position === 'watched') {
        contentRender(WATCHED_STORAGE_KEY, 'watched', globalCurrentPage);
        return;
    }
    if (cards.dataset.position === 'queued') {
        contentRender(QUEUE_STORAGE_KEY, 'queued', globalCurrentPage);
        return;
    }
}















// =======================================
// Функції відкриття / закриття модалки
// =======================================
async function onModalOpenClick(event) {
    event.preventDefault();
    if (event.target.closest('li')) {
        modalEl.classList.remove('is-hidden');
        modalCloseEl.addEventListener('click', onModalCloseClick);
        backdropEl.addEventListener('click', onBackdropElClick);
        window.addEventListener('keydown', onEscBtnClick);
        console.log("I clicked on card");
    }
}

function onModalCloseClick() {
    modalEl.classList.add('is-hidden');
    modalCloseEl.removeEventListener('click', onModalCloseClick);
    backdropEl.removeEventListener('click', onBackdropElClick);
    window.removeEventListener('keydown', onEscBtnClick);
}

function onBackdropElClick(event) {
    if (event.target === backdropEl) {
        onModalCloseClick();
    }
}

function onEscBtnClick(event) {
    if (event.code === 'Escape') {
        onModalCloseClick();
    }
}
// =======================================