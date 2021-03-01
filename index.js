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

  deleteButton.addEventListener('click', () => {
    document.dispatchEvent(new CustomEvent('deleteCard', { detail: { id: data.id, el: container } }));
  });
  return container;
}

function handleDelete(id, el) {
  el.remove();
  fetch(`http://localhost:3000/games/${id}`, { method: 'DELETE' });
}

function handleAdd(title, url, release) {
  const payload = {
    name: title,
    image: url,
    releaseDate: release,
    dateAdded: new Date().toLocaleString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  };

  fetch('http://localhost:3000/games', options)
    .then((resp) => resp.json())
    .then((data) => {
      const card = createCard({
        name: title,
        imgUrl: url,
        dateAdded: payload.dateAdded,
        releaseDate: release,
        id: data.id
      });
      document.getElementById('items').append(card);
    });
}
document.addEventListener('DOMContentLoaded', () => {
  // Handles when "remove" is clicked
  document.addEventListener('deleteCard', (e) => {
    handleDelete(e.detail.id, e.detail.el);
  });

  // Handles when "Add to wishlist is clicked"

  document.getElementById('add-game').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = e.currentTarget.querySelector('#game-title').value;
    const url = e.currentTarget.querySelector('#game-img-url').value;
    let release = e.currentTarget.querySelector('#game-release-date').value;
    if (!release) {
      release = '???';
    } else {
      release = release.replaceAll('-', '/');
    }
    handleAdd(title, url, release);
  });

  // Initial fetch
  fetch('http://localhost:3000/games')
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        const card = createCard({
          name: data[i].name,
          imgUrl: data[i].image,
          dateAdded: data[i].dateAdded,
          releaseDate: data[i].releaseDate,
          id: data[i].id
        });
        document.getElementById('items').append(card);
      }
    });
});
