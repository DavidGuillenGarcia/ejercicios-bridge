const searchInput = document.getElementById("searchInput");
const searchForm = document.getElementById("searchForm");
const results = document.getElementById("content");

async function search(event) {
	event.preventDefault();

	if (!searchInput.value) {
		results.innerHTML = "Escriba un país para buscar";
		return;
	}

	showLoading();
	const nombreABuscar = searchInput.value;
	const response = await fetch(
		`https://restcountries.com/v3.1/name/${nombreABuscar}`
	);
	if (!response.ok) {
		results.innerHTML = "No se encontraron resultados";
		removeLoading();
		return;
	}
	const data = await response.json();
	results.innerHTML = "";
	const fragment = document.createDocumentFragment();
	data.forEach((country) => {
		let countryName = country.name.common;
		let flag = country.flags.png;
		let alt = country.flags.alt;

		const card = document.createElement("div");
		card.classList.add("card");
		card.innerHTML = `
        <h3>${countryName}</h3>
        <img src="${flag}" alt="${alt}" />
        `;
		fragment.appendChild(card);
	});
	results.appendChild(fragment);
	removeLoading();
}

searchForm.addEventListener("submit", search);

function showLoading() {
	results.innerHTML = "";
	const spinner = document.createElement("div");
	spinner.classList.add("loader");
	spinner.id = "loadingSpinner";
	results.appendChild(spinner);
}

function removeLoading() {
	const spinner = document.getElementById("loadingSpinner");
	if (spinner) {
		spinner.remove();
	}
}
