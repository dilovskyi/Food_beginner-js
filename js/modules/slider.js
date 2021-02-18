function slider() {
	//slider
	const currentNum = document.querySelector("#current");
	const totalNum = document.querySelector("#total");
	const nextArrow = document.querySelector(".offer__slider-next");
	const prevArrow = document.querySelector(".offer__slider-prev");
	const sliderElem = document.querySelectorAll(".offer__slide");
	const slidesWrapper = document.querySelector(".offer__slider-wrapper");
	const slidesField = document.querySelector(".offer__slider-inner");
	const width = window.getComputedStyle(slidesWrapper).width;
	const fieldWidth = sliderElem.length * parseInt(width, 10); /* total 2600px */

	let translated = 0;
	let index = 1;
	currentNum.innerHTML = `0${index}`;

	if (sliderElem.length < 10) {
		totalNum.innerHTML = `0${sliderElem.length}`;
	} else {
		totalNum.innerHTML = sliderElem.length;
	}

	function changeNum(i) {
		if (index < 10) {
			currentNum.innerHTML = `0${i}`;
		} else {
			currentNum.innerHTML = i;
		}
	}

	slidesField.style.cssText = `display: flex; width: ${fieldWidth}px`;
	slidesWrapper.style.overflow = "hidden";

	nextArrow.addEventListener("click", next);
	prevArrow.addEventListener("click", prev);

	function next() {
		if (translated == fieldWidth - parseInt(width, 10)) {
			index = 1;
			translated = 0;
		} else {
			index += 1;
			translated += parseInt(width, 10);
		}
		slidesField.style.transform = `translateX(-${translated}px)`;

		changeDot();
		changeNum(index);
	}

	function prev() {
		if (translated >= 0) {
			translated = -fieldWidth + parseInt(width, 10);
			index = sliderElem.length;
		} else {
			index -= 1;
			translated += parseInt(width, 10);
		}
		slidesField.style.transform = `translateX(${translated}px)`;

		changeDot();
		changeNum(index);
	}

	//Dots
	const slider = document.querySelector(".offer__slider");
	slider.style.position = "relative";
	const dotsArr = [];
	const dots = document.createElement("ol");
	dots.classList.add("caroures-indicators");
	dots.style.cssText = `
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  margin-right: 15%;
  margin-left: 15%;
  list-style: none;`;
	slider.append(dots);

	for (let i = 1; i <= sliderElem.length; i++) {
		const dot = document.createElement("li");
		dot.setAttribute("data-slide-to", i);
		dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;`;
		dots.append(dot);
		dotsArr.push(dot);

		if (i == index) {
			dot.style.opacity = 1;
		}
	}

	function changeDot() {
		dotsArr.forEach((item, i) => {
			item.style.opacity = "0.5";
			if (i + 1 == index) {
				item.style.opacity = "1";
			}
		});
	}

	dotsArr.forEach((item) => {
		item.addEventListener("click", (e) => {
			const slideTo = e.target.getAttribute("data-slide-to");
			index = +slideTo;

			translated = parseInt(width, 10) * slideTo;
			console.log(translated);
			slidesField.style.transform = `translateX(-${translated - parseInt(width, 10)}px)`;

			changeDot();
			changeNum(index);
		});
	});
}

export default slider;
