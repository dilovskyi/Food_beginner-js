function cards() {
	// classCards
	class MealCard {
		constructor(img, alt, title, descr, price, parent, ...rest) {
			this.img = img;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.rest = rest;
			this.parent = document.querySelector(parent);
			this.transfer = 23;
			this.conventer();
		}

		conventer() {
			this.price = this.price * this.transfer;
		}

		render() {
			const element = document.createElement("div");
			if (this.rest.length == 0) {
				element.classList.add("menu__item");
			}

			this.rest.forEach((item) => {
				// добавляем созданному диву класс menu__item, что бы убрать обертку
				element.classList.add(item);
			});
			element.innerHTML = `
      <img src="${this.img}" alt="${this.alt}" />
      <h3 class="menu__item-subtitle">${this.title}"</h3>
      <div class="menu__item-descr">${this.descr}</div>
      <div class="menu__item-divider"></div>
      <div class="menu__item-price">
        <div class="menu__item-cost">Цена:</div>
        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
      </div>
    `;
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);

		if (res.status > 299) {
			throw new Error(`Ошибка со статусом ${res.status},Не смогли отправитть запрос на ${url}`);
		}
		return await res.json();
	};

	// getResource("http://localhost:3000/menu").then((data) => {
	// 	data.forEach(({ img, altimg, title, descr, price }) => {
	// 		console.log(img, altimg, title, descr, price, parent);
	// 		new MealCard(img, altimg, title, descr, price, ".menu .container").render();
	// 	});
	// });
	getResource("http://localhost:3000/menu").then((data) => {
		createCard(data);
	});

	function createCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement("div");
			const newPrice = price * 27;
			element.classList.add("menu__item");
			element.innerHTML = `
        <img src="${img}" alt="${altimg}" />
        <h3 class="menu__item-subtitle">${title}"</h3>
        <div class="menu__item-descr">${descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${newPrice}</span> грн/день</div>
        </div>`;
			document.querySelector(".menu .container").append(element);
		});
	}
}

export default cards;
