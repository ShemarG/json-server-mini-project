function createCard(data) {
  const container = document.createElement('article');
  container.classList.add('card');
  const title = document.createElement('h2');
  title.textContent = data.name;
  const fig = document.createElement('figure');
  const img = document.createElement('img');
  img.src = data.imgUrl;
  fig.append(img);
  const lowerSection = document.createElement('div');
  const added = document.createElement('span');
  added.textContent = `Added: ${data.dateAdded}`;
  const released = document.createElement('span');
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Remove';
  released.textContent = `Released: ${data.releaseDate}`;
  lowerSection.append(added, released, deleteButton);
  container.append(title, fig, lowerSection);
  return container;
}

document.addEventListener('DOMContentLoaded', () => {
  // document.body.append(createCard(
  //   {
  //     name: 'Outriders',
  //     imgUrl: 'https://outriders.square-enix-games.com/static/188f535406586f2cf8ca273662f2151a/metadata.jpg',
  //     dateAdded: '3/1/2021',
  //     releaseDate: '4/1/2021'
  //   },
  // ));
  fetch('http://localhost:3000/games')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const card = createCard({
          name: data[i].name,
          imgUrl: data[i].image,
          dateAdded: data[i].dateAdded,
          releaseDate: data[i].releaseDate
        });
        document.body.append(card);
      }
    });
});
