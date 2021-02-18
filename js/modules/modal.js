function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.toggle("show");
	document.body.style.overflow = "hidden";

	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.toggle("show");
	document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	const openBtn = document.querySelectorAll(triggerSelector);
	const closeBtn = document.querySelector("[data-close]");

	openBtn.forEach((item) => {
		item.addEventListener("click", () => openModal(modalSelector, modalTimerId));
	});

	closeBtn.addEventListener("click", () => closeModal(modalSelector));

	modal.addEventListener("click", (e) => {
		if (e.target.matches(".show") || e.target == modal) {
			closeModal(modalSelector);
		}
	});

	document.documentElement.addEventListener("keydown", (e) => {
		if (e.code == "Escape" && modal.matches(".show")) {
			closeModal(modalSelector);
		}
	});

	function showModalByScroll() {
		const d = document.documentElement;
		if (d.scrollTop + d.clientHeight >= d.scrollHeight) {
			openModal(modalSelector, modalTimerId);
			document.removeEventListener("scroll", showModalByScroll);
		}
	}

	document.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { openModal, closeModal };
