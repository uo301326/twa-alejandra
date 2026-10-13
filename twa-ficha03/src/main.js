// 1. Estado inicial de la aplicación
const state = {
  status: 'loading',
  error: null,
  items: [],
  query: '',
  category: '',
  sortDir: 'desc',
  selectedId: null,
};

// 2. Función asíncrona load() con fetch
async function load() {
  try {
    state.status = 'loading';
    render();

    const res = await fetch('/item.json');
    if (!res.ok) {
      throw new Error(`Error en la red: ${res.statusText}`);
    }

    const data = await res.json();
    state.items = data;
    state.status = 'ready';
  } catch (err) {
    state.status = 'error';
    state.error = err.message;
  } finally {
    render();
  }
}

// 3. Función render() que lee el estado y crea los elementos 
function render() {
  const listEl = document.querySelector('#list');
  const detailEl = document.querySelector('#detail');

  if (!listEl || !detailEl) return;

  listEl.textContent = '';
  detailEl.textContent = '';

  if (state.status === 'loading') {
    listEl.textContent = 'Cargando catálogo...';
    return;
  }

  if (state.status === 'error') {
    listEl.textContent = `Error: ${state.error}`;
    return;
  }

  let itemsToDisplay = [...state.items];

  if (state.query.trim() !== '') {
    const q = state.query.toLowerCase();
    itemsToDisplay = itemsToDisplay.filter(item => 
      item.name.toLowerCase().includes(q)
    );
  }

  if (state.category !== '') {
    itemsToDisplay = itemsToDisplay.filter(item => 
      item.category === state.category
    );
  }

  itemsToDisplay.sort((a, b) => {
    if (state.sortDir === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  if (itemsToDisplay.length === 0) {
    listEl.textContent = 'No se encontraron elementos.';
  }

  itemsToDisplay.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = `${item.name} (${item.category}) - ${item.price}€`;
    
    li.addEventListener('click', () => {
      state.selectedId = item.id;
      render();
    });

    listEl.appendChild(li);
  });

  if (state.selectedId !== null) {
    const selectedItem = state.items.find(item => item.id === state.selectedId);
    if (selectedItem) {
      const title = document.createElement('h2');
      title.textContent = selectedItem.name;

      const category = document.createElement('p');
      category.textContent = `Categoría: ${selectedItem.category}`;

      const price = document.createElement('p');
      price.textContent = `Precio: ${selectedItem.price}€`;

      detailEl.appendChild(title);
      detailEl.appendChild(category);
      detailEl.appendChild(price);
    }
  }
}

// 4. Configuración de Eventos 
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('#search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.query = e.target.value;
      render();
    });
  }

  const categorySelect = document.querySelector('#category-select');
  if (categorySelect) {
    categorySelect.addEventListener('change', (e) => {
      state.category = e.target.value;
      render();
    });
  }

  const sortBtn = document.querySelector('#sort-btn');
  if (sortBtn) {
    sortBtn.addEventListener('click', () => {
      state.sortDir = state.sortDir === 'asc' ? 'desc' : 'asc';
      render();
    });
  }

  load();
});