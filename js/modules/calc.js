function calc() {
	const result = document.querySelector(".calculating__result span");
	let sex, height, weight, age, ratio;
	let formula;

	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		ratio = 1.375;
		localStorage.setItem("ratio", ratio);
	}

	if (localStorage.getItem("sex")) {
		sex = localStorage.getItem("sex");
	} else {
		sex = "woman";
		localStorage.setItem("sex", sex);
	}

	function initLocalSittings(selector, activClass) {
		const elements = document.querySelectorAll(`${selector} div`);

		elements.forEach((item) => {
			item.classList.remove(activClass);
			if (item.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
				item.classList.add(activClass);
			}
			if (item.getAttribute("id") == localStorage.getItem("sex")) {
				item.classList.add(activClass);
			}
		});
	}

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.innerHTML = "_ _ _";
			return;
		}

		if (sex == "man") {
			formula = (88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio;
		} else if (sex == "woman") {
			formula = (447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio;
		}
		result.innerHTML = Math.round(formula, 0);
	}

	function getStaticInfo(parentSelector, groupClass, activeClass) {
		const element = document.querySelectorAll(`${parentSelector} div`);

		document.querySelector(parentSelector).addEventListener("click", (e) => {
			if (e.target && e.target.matches(groupClass)) {
				element.forEach((item) => {
					item.classList.remove(activeClass);
				});
				e.target.classList.add(activeClass);

				if (e.target.hasAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", ratio);
				} else if (e.target.id) {
					sex = e.target.getAttribute("id");
					localStorage.setItem("sex", sex);
				}
			}
			calcTotal();
		});
	}

	function getDinamicInfo(selector) {
		const input = document.querySelector(selector);

		input.addEventListener("input", (e) => {
			if (input.value.match(/\D/g)) {
				input.style.border = "1px solid red";
			} else {
				input.style.border = "none";
			}

			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	calcTotal();

	initLocalSittings("#gender", "calculating__choose-item_active");
	initLocalSittings(".calculating__choose_big", "calculating__choose-item_active");
	getStaticInfo("#gender", ".calculating__choose-item", "calculating__choose-item_active");
	getStaticInfo(".calculating__choose_big", ".calculating__choose-item", "calculating__choose-item_active");

	getDinamicInfo("#height", height);
	getDinamicInfo("#weight", weight);
	getDinamicInfo("#age", age);
}
export default calc;
