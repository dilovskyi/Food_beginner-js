import { closeModal, openModal } from "./modal";

function forms(modaltimerId) {
	//forms

	const forms = document.querySelectorAll("form");
	const message = {
		loading: "icons/spinner.svg",
		success: "Спасибо! Скоро мы с вами свяжемся",
		failure: "Что-то пошло не так...",
	};

	forms.forEach((item) => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: data,
		});

		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
              display: block;
              margin: 0 auto;
          `;
			form.insertAdjacentElement("afterend", statusMessage);

			const formData = new FormData(form);

			// Новый способ
			let json = JSON.stringify(Object.fromEntries(formData.entries()));
			// старый способ
			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
				console.log(key);
				console.log(value);
			});

			console.log(object);

			postData("http://localhost:3000/requests", json)
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});
		});
	}

	function showThanksModal(message) {
		// Получаем старое окно и скрываем его;
		const prevModalDialog = document.querySelector(".modal__dialog");

		prevModalDialog.classList.add("hide");
		openModal(".modal", modaltimerId);

		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
      `;
		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			closeModal(".modal");
			prevModalDialog.classList.remove("hide");
		}, 4000);
	}
}

export default forms;
