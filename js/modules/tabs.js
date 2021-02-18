function tabs() {
	//Tabs
	const tabsParent = document.querySelector(".tabheader__items"), //Контейнер табов
		tabs = document.querySelectorAll(".tabheader__item"), //Каждая кнопка
		tabsContent = document.querySelectorAll(".tabcontent"); //Контент таба(фото)

	function hideTabs() {
		tabsContent.forEach((item) => {
			item.classList.remove("show", "fade");
			item.classList.add("hide");
		});

		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active");
		});
	}

	function showTabs(i = 1) {
		tabs[i].classList.add("tabheader__item_active");
		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");
	}

	hideTabs();
	showTabs();

	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.matches(".tabheader__item")) {
			tabs.forEach((item, i) => {
				if (item === target) {
					hideTabs();
					showTabs(i);
				}
			});
		}
	});
}

export default tabs;
