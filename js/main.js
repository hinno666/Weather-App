const apiKey = "f091f83f5fea4daa93d164914230504";

/**Элементы на странице */
const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#inputCity");

// Слушаем отправку формы

form.addEventListener("submit", (e) => {
  //Отменяем отправку формы
  e.preventDefault();

  //Берем значение из инпута
  let city = input.value.trim();

  // Делаем запрос на сервер
  // Адерсс запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  //Выполняем запрос
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Проверка на ошибку
      if (data.error) {
        // Удаляем предыдущую карточку
        const prevCard = document.querySelector(".main__card-container");
        if (prevCard) {
          prevCard.remove();
        }
        const html = `<div class="main__card-container">${data.error.message}</div>`;
        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      } else {
        // Отображаем полученные данные в карточке
        // Удаляем предыдущую карточку
        const prevCard = document.querySelector(".main__card-container");

        if (prevCard) {
          prevCard.remove();
        }

        // Разметка для карточки
        const html = `
                        <div class="main__card-container">

                            <h2 class="card__title">${data.location.name}<span>${data.location.country}</span></h2>


                                <div class="card__weather">
                                    <div class="card__value">${data.current.temp_c}°c</div>
                                    <img src="img/weather.png" alt="weather" class="card__image">
                                </div>


                            <p class="card__descr">${data.current.condition.text}</p>
                         </div>
                        `;

        // Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      }
    });
});
