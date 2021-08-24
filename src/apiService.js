export async function getImages(searchText, numberPage) {
  const key = '23013665-83c697cef36d7fdf3a6dd926d';
  const response = await fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchText}&page=${numberPage}&per_page=12&key=${key}`,
  );

  return response.json();
}
