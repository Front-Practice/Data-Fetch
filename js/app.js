document.addEventListener('DOMContentLoaded', () => {
    const dataContainer = document.getElementById('data-container');
    const navLinks = document.querySelectorAll('.nav-link');
    const baseURL = 'https://dummyjson.com';


    const fetchData = async (page) => {
        if (!page) return;
        dataContainer.innerHTML = '<p>Loading...</p>';
        try {
            const response = await fetch(`${baseURL}/${page}`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            renderData(page, data[page]);
        } catch (error) {
            dataContainer.innerHTML = `<p>Error loading data: ${error.message}</p>`;
        }
    };

    const renderData = (page, items) => {
        dataContainer.innerHTML = '';
        items.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';
            let cardContent = '';

            switch (page) {
                case 'recipes':
                    cardContent = `
                        <img src="${item.image}" alt="${item.name}" class="card-image">
                        <div class="card-content">
                            <h3>${item.name}</h3>
                            <p>Cuisine: ${item.cuisine}</p>
                            <p>Rating: ${item.rating} (${item.reviewCount} reviews)</p>
                        </div>`;
                    break;
                case 'products':
                    cardContent = `
                        <img src="${item.thumbnail}" alt="${item.title}" class="card-image">
                        <div class="card-content">
                            <h3>${item.title}</h3>
                            <p><strong>Brand:</strong> ${item.brand}</p>
                            <p><strong>Price:</strong> $${item.price}</p>
                        </div>`;
                    break;
                case 'users':
                    cardContent = `
                        <img src="${item.image}" alt="${item.firstName}" class="card-image">
                        <div class="card-content">
                            <h3>${item.firstName} ${item.lastName}</h3>
                            <p>Email: ${item.email}</p>
                            <p>Phone: ${item.phone}</p>
                        </div>`;
                    break;
                case 'posts':
                    cardContent = `
                        <div class="card-content">
                            <h3>${item.title}</h3>
                            <p>${item.body.substring(0, 100)}...</p>
                            <p><strong>Tags:</strong> ${item.tags.join(', ')}</p>
                        </div>`;
                    break;
            }
            card.innerHTML = cardContent;
            dataContainer.appendChild(card);
        });
    };

    const router = () => {
        const page = window.location.hash.substring(1) || 'recipes';
        fetchData(page);
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === page) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    window.addEventListener('hashchange', router);

    window.addEventListener('load', router);
});