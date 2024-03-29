const urlParams = new URLSearchParams(window.location.search);
let page = parseInt(urlParams.get("page")) || 1;
const getDiv = document.getElementById("divCards");
const pageActual = document.getElementById("pageActual");

const getCharacters = async () => {
  try {
    const previousPage = document.getElementById("previousPage");
    const nextPage = document.getElementById("nextPage");

    const data = {
      page,
    };

    const response = await api.get("/character/", { params: data });
    const limit = response.data.info.pages;
    const characters = response.data.results;
    characters.forEach((character) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("cardStyle");

      newDiv.innerHTML = `<div class="insideCard"><img src ="${character.image}"><div class="textCard"><h1> ${character.name}</h1><p>Status - ${character.status}</p><p>${character.species}</p></div></div>`;
      getDiv.appendChild(newDiv);
    });

    previousPage.disabled = page === 1;
    nextPage.disabled = limit === page;
    pageActual.textContent = `Pagina atual ${page}`;
  } catch (error) {
    console.log(error);
  }
};

getCharacters();

const nextButton = () => {
  const novaPagina = page + 1;
  window.location.href = `?page=${novaPagina}`;
};

const prevButton = () => {
  if (page > 1) {
    const novaPagina = page - 1;
    window.location.href = `?page=${novaPagina}`;
  }
};
