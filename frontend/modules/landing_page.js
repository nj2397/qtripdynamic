import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
 
  // 1. Fetch cities using the Backend API and return the data
  try {
    const response = await fetch(config.backendEndpoint + "/cities");
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (err) {
    return null;
  }
}


//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  
  // 1. Populate the City details and insert those details into the DOM
  const elem = document.getElementById("data");
  const childElem = document.createElement("div");
  childElem.setAttribute("class", "col-6 col-lg-3 mb-4");
  childElem.innerHTML = `
      <a href="pages/adventures/?city=${id}" id="${id}">
        <div class="tile">
          <div class="tile-text text-center">
            <h4>${city}</h4>
            <p>${description}</p>
          </div>
          <img class="img-fluid" src="${image}" />
        </div>
      </a>
  `;

  elem.append(childElem);
}

export { init, fetchCities, addCityToDOM };
