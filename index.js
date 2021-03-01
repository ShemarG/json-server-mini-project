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

  deleteButton.addEventListener("click", function(e){
    document.dispatchEvent(new CustomEvent('deleteCard', {
      detail: {
        id: data.id,
        el: container
      }
    }))
  })
  return container;
}

function handleDelete(id, el){
  console.log(el)
  el.remove()
  fetch(`http://localhost:3000/games/${id}`,{
  method: 'DELETE'
  })

  .then(res => console.log(res))
  .catch(err => {
    console.log(err)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener("deleteCard", function(e){
    handleDelete(e.detail.id, e.detail.el)
  })
  fetch('http://localhost:3000/games')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        const card = createCard({
          name: data[i].name,
          imgUrl: data[i].image,
          dateAdded: data[i].dateAdded,
          releaseDate: data[i].releaseDate,
          id: data[i].id
        });
        document.body.append(card);
      }
    });
});

