function createCard(data) {
  const container = document.createElement('article');
  container.classList.add('card');
  const title = document.createElement('h4');
  title.textContent = data.name;
  const img = document.createElement('img');
  img.src = data.imgUrl;
  const lowerSection = document.createElement('div');
  const added = document.createElement('span');
  added.textContent = `Added: ${data.dateAdded}`;
  const released = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove';
  released.textContent = `Released: ${data.releaseDate}`;
  lowerSection.append(added, released, deleteButton);
  container.append(title, img, lowerSection);
  return container;
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.append(createCard(
    {
      name: 'Outriders',
      imgUrl: 'https://outriders.square-enix-games.com/static/188f535406586f2cf8ca273662f2151a/metadata.jpg',
      dateAdded: '3/1/2021',
      releaseDate: '4/1/2021'
    }
  ));
});
