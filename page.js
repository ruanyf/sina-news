fetch('./rss.json')
.then(async function (response) {
  const res = await response.json();
  const items = res.items;

  const list = document.querySelector('.list');
  const fragment = document.createDocumentFragment();

  items.forEach(i => {
    const li = document.createElement('li');
    const p = document.createElement('p');
    const timeObj = new Date(i.date_modified);
    p.innerHTML = `${i.title} （<a href="${i.url}" target="_blank">${timeObj.getHours()}:${timeObj.getMinutes()}</a>）`;
    li.appendChild(p);
    fragment.appendChild(li);
  });

  list.appendChild(fragment);
})

