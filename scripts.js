const urlParams = new URLSearchParams(window.location.search);
let page = parseInt(urlParams.get("page")) || 1;
const getDiv = document.getElementById("divCards");

const getCharacters = async () => {
  try {
    const previousPage = document.getElementById("previousPage");
    const nextPage = document.getElementById("nextPage");

    const data = {
      page,
    };
    console.log(data);
    const response = await api.get("/character/", { params: data });
    const limit = response.data.info.pages;
    const characters = response.data.results;
    characters.forEach((character) => {
      const newDiv = document.createElement("div");
      newDiv.classList.add("cardStyle");

      newDiv.innerHTML = `<div id="insideCard"><img src ="${character.image}"><div id="textCard"><h1> ${character.name}</h1><p>Status - ${character.status}</p><p>${character.species}</p></div></div>`;
      getDiv.appendChild(newDiv);
    });

    previousPage.disabled = page === 1;
    nextPage.disabled = limit === page;
  } catch (error) {
    console.log(error);
  }
};

getCharacters();

const nextButton = () => {
  page++;
  getDiv.innerHTML = ``;
  getCharacters();
};

const prevButton = () => {
  if (page > 1) {
    page--;
    getDiv.innerHTML = ``;
    getCharacters();
  }
};


