async function fetchRandomJoke() {
  const res = await fetch('/jokebook/random');
  const randomText = document.getElementById('random-text');
  randomText.textContent = 'Loading...';

  if (res.ok) {
    const data = await res.json();
    randomText.textContent = `${data.setup} — ${data.delivery}`;
  } else {
    randomText.textContent = 'No jokes found.';
  }
}

async function fetchCategories() {
  const res = await fetch('/jokebook/categories');
  const data = await res.json();

  const list = document.getElementById('categoryList');
  while (list.firstChild) list.removeChild(list.firstChild);

  data.forEach(c => {
    const li = document.createElement('li');
    li.textContent = c.category;
    li.addEventListener('click', () => fetchJokesByCategory(c.category));
    list.appendChild(li);
  });
}

async function fetchJokesByCategory(category) {
  const res = await fetch(`/jokebook/category/${category}`);
  const list = document.getElementById('jokesList');
  while (list.firstChild) list.removeChild(list.firstChild);

  if (res.ok) {
    const data = await res.json();
    if (data.length === 0) {
      const li = document.createElement('li');
      li.textContent = `No jokes in ${category} yet.`;
      list.appendChild(li);
    } else {
      data.forEach(j => {
        const li = document.createElement('li');
        li.textContent = `${j.setup} — ${j.delivery}`;
        list.appendChild(li);
      });
    }
  } else {
    const li = document.createElement('li');
    li.textContent = `Category "${category}" not found.`;
    list.appendChild(li);
  }
}

async function addJoke() {
  const category = document.getElementById('addCategory').value.trim();
  const setup = document.getElementById('addSetup').value.trim();
  const delivery = document.getElementById('addDelivery').value.trim();

  if (!category || !setup || !delivery) {
    alert('Please fill out all fields.');
    return;
  }

  const res = await fetch('/jokebook/joke/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, setup, delivery })
  });

  if (res.ok) {
    alert('Joke added!');
    fetchJokesByCategory(category);
  } else {
    alert('Failed to add joke.');
  }
}

document.getElementById('loadCategories')
  .addEventListener('click', fetchCategories);

document.getElementById('searchBtn')
  .addEventListener('click', () => {
    const cat = document.getElementById('categoryInput').value.trim();
    if (cat) fetchJokesByCategory(cat);
  });

document.getElementById('addBtn')
  .addEventListener('click', addJoke);

fetchRandomJoke();
