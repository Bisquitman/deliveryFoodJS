const cart = () => {
  const buttonCart = document.getElementById('cart-button');
  const modalCart = document.querySelector('.modal-cart');
  const modalBody = modalCart.querySelector('.modal-body');
  const buttonSend = modalCart.querySelector('.button-primary');
  const buttonClearCart = modalCart.querySelector('.clear-cart');

  const totalPrice = (data) => {
    const price = modalCart.querySelector('.modal-pricetag');
    price.textContent = `${[...data].reduce(
      (accumulator, currentValue) => accumulator + (currentValue.price * currentValue.count),
      0
    )} ₽`;
  };

  const resetCart = () => {
    modalBody.innerHTML = '';
    localStorage.removeItem('cart');
    modalCart.classList.remove('is-open');
  }

  const minusCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    console.log('id:', id);
    cartArray.map((item) => {
      if (item.id === id) {
        item.count = item.count > 0 ? item.count - 1 : 0;
      }
      return (item);
    });
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  }
  const plusCount = (id) => {
    const cartArray = JSON.parse(localStorage.getItem('cart'));
    cartArray.map((item) => {
      if (item.id === id) {
        item.count++;
      }
      return (item);
    });
    localStorage.setItem('cart', JSON.stringify(cartArray));
    renderItems(cartArray);
  }

  const renderItems = (data) => {
    modalBody.innerHTML = '';
    data.forEach(({ name, price, id, count }) => {
      const cartRow = document.createElement('div');
      cartRow.classList.add('food-row');
      cartRow.innerHTML = `
      <span class="food-name">${name}</span>
      <strong class="food-price">${price}&nbsp;₽</strong>
      <div class="food-counter">
        <button class="counter-button btn-minus">-</button>
        <span class="counter">${count}</span>
        <button class="counter-button btn-plus">+</button>
      </div>
      `;
      modalBody.append(cartRow);
    });
    totalPrice(data);
  }

  modalBody.addEventListener('click', (event) => {
    event.preventDefault();
    if (event.target.classList.contains('btn-plus')) {
      plusCount(event.target.dataset.index);
    } else if (event.target.classList.contains('btn-minus')) {
      minusCount(event.target.dataset.index);
    }
  });

  buttonSend.addEventListener('click', () => {
    const cartArray = localStorage.getItem('cart');
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: cartArray,
    })
      .then((response) => {
        if (response.ok) {
          resetCart();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });

  buttonClearCart.addEventListener('click', () => {
    resetCart();
  });

  buttonCart.addEventListener('click', () => {
    if (localStorage.getItem('cart')) {
      renderItems(JSON.parse(localStorage.getItem('cart')));
    }
    modalCart.classList.add('is-open');
  });

  modalCart.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal-cart') || event.target.classList.contains('close')) {
      modalCart.classList.remove('is-open');
    };
  });

};
export default cart;