const renderItems = (data) => {
  data.forEach(element => {
    console.log(element);
  });
}

fetch('https://delivery-food-glo-default-rtdb.firebaseio.com/db/partners.json')
  .then((response) => response.json())
  .then((data) => {
    renderItems(data);
  })
  .catch((error) => {
    console.log('error: ', error);
  })
  .finally(console.log('finally'));