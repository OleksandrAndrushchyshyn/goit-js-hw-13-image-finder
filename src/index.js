import './sass/main.scss';
import { getImages } from './apiService';
const inputCard = document.querySelector('#search-form input[name="query"]');
const formCard = document.querySelector('#search-form');
const listCard = document.querySelector('.gallery');
const showMoreButton = document.querySelector('#show-more-button');
let numberPage = 1;

console.log(getImages());
formCard.addEventListener('submit', event => {
  event.preventDefault();
  listCard.innerHTML = '';
  numberPage = 1;
  onInputNameCard();
});

async function onInputNameCard() {
  const responseJson = await getImages(inputCard.value, numberPage);
  console.log(responseJson);
  const images = responseJson.hits.map(obj => {
    let li = document.createElement('li');
    li.innerHTML = `<div class="photo-card">
      <img src="${obj.webformatURL}" alt="" />
          <div class="stats">
        <p class="stats-item">
          <i class="material-icons">thumb_up</i>
          ${obj.likes}
        </p>
        <p class="stats-item">
          <i class="material-icons">visibility</i>
          ${obj.views}
        </p>
        <p class="stats-item">
          <i class="material-icons">comment</i>
          ${obj.comments}
        </p>
        <p class="stats-item">
          <i class="material-icons">cloud_download</i>
          ${obj.downloads}
        </p>
      </div>
    </div>`;
    return li;
  });
  listCard.append(...images);
  if (responseJson.total > 12 * numberPage) {
    showMoreButton.classList.remove('hidden');
  } else {
    showMoreButton.classList.add('hidden');
  }
}

showMoreButton.addEventListener('click', async function () {
  numberPage += 1;
  console.log(numberPage);
  await onInputNameCard();
  showMoreButton.scrollIntoView({ behavior: 'smooth', block: 'end' });
});
