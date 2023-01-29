import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
 
  // 1. Extract the city id from the URL's Query Param and return it
  // const city = search.split('=');
  // return city[1];

  const params = new URLSearchParams(search);
  return params.get('city');
  
}


//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  
  // 1. Fetch adventures using the Backend API and return the data
  try{
    const response = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    const data = await response.json();
    return data;
    // console.log(city);
  }
  catch(err){
    return null;
  }
  
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const elem = document.getElementById("data");
    adventures.forEach((key) => {
    const childElem = document.createElement("div");
    childElem.setAttribute("class","col-xs-12 col-6 col-lg-3 mb-3");
    childElem.innerHTML = `
    <a href="detail/?adventure=${key.id}" id="${key.id}">
      <div class="card" style="border-radius: 8px;">
        <img class="activity-card img" src="${key.image}" />
        <div class="card-body text-center d-md-flex justify-content-between">
            <h5 class="card-title">${key.name}</h5>
            <p class="card-text">₹${key.costPerHead}</p>
        </div>
        <div class="card-body text-center d-md-flex justify-content-between pt-0">
          <h5 class="card-title">Duration</h5>
          <p class="card-text">${key.duration} Hours</p>
        </div>
        <div class="category-banner">${key.category}</div>
      </div>
    </a>
    `;

    elem.appendChild(childElem);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
 
  // 1. Filter adventures based on Duration and return filtered list
  let arr = [];

  list.filter((key) => {
    if(key.duration >= low && key.duration <= high)
      arr.push(key);
  });

  return arr;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  
  // 1. Filter adventures based on their Category and return filtered list
    let arr = [];

    for(let content of categoryList){
      list.filter((key) => {
        if(key.category === content)
          arr.push(key);
      });
    }

    return arr;

}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods  


  if(filters.duration && filters.category.length){
    let arr = filters.duration.split('-');
    let l = arr[0];
    let h = arr[1];
    let a = [];

    for(let content of filters.category){
      list.filter((key) => {
       if(content === key.category && key.duration >= l && key.duration<=h)
        a.push(key);
      });
    }

    return a;
  }

  if(filters.duration){
    let arr = filterByDuration(list, filters.duration.split('-')[0], filters.duration.split('-')[1]);
    return arr;
  }

  if(filters.category.length){
    let arr = filterByCategory(list,filters.category);
    return arr;
  }

  return list;

  
  // Place holder for functionality to work in the Stubs
  // return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {

  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  
  // 1. Get the filters from localStorage and return String read as an object


  return JSON.parse(localStorage.getItem("filters"));    

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  if(filters.category.length){
    filters.category.forEach((key) => {
      const elem = document.getElementById("category-list");
      const childElem = document.createElement("div");
      childElem.setAttribute("class", "category-filter");
      childElem.innerHTML = `
        ${key}
      `;
      elem.appendChild(childElem);
    });  
  }

  const formElem = document.getElementById("duration-select");
  formElem.value = filters.duration;      
}


export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
