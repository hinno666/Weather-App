const apiKey = "f091f83f5fea4daa93d164914230504";

/**Элементы на странице */
const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");
console.log(input);
// Удаляем предыдущую карточку
function removeCard() {
  const prevCard = document.querySelector(".main__card-container");
  if (prevCard) {
    prevCard.remove();
  }
}
// Показ ошибки
function showError(errorMessage) {
     const html = `<div class="main__card-container">${errorMessage}</div>`;
     header.insertAdjacentHTML("afterend", html);
}
// Отображение карточки 
function showCard(name, country, temp, condition) {
  // Разметка для карточки
  const html = `
                        <div class="main__card-container">

                            <h2 class="card__title">${name}<span>${country}</span></h2>


                                <div class="card__weather">
                                    <div class="card__value">${temp}°c</div>
                                    <img src="img/weather.png" alt="weather" class="card__image">
                                </div>


                            <p class="card__descr">${condition}</p>
                         </div>
                        `;

  // Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}
// Слушаем отправку формы

// Get conditions 


form.addEventListener("submit", (e) => {
  //Отменяем отправку формы
  e.preventDefault();

  //Берем значение из инпута
  let city = input.value.trim();

  // Делаем запрос на сервер
  // Адерсс запроса
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  //Выполняем запрос
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Проверка на ошибку
      if (data.error) {
        removeCard();
        showError(data.error.message);
      } else {
        // Отображаем полученные данные в карточке
        removeCard();
        showCard(
          data.location.name,
          data.location.country,
          data.current.temp_c,
          data.current.condition.text
        );
      }
    });
});
