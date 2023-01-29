import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // 1. Get the Adventure Id from the URL
  const params = new URLSearchParams(search);
  return params.get('adventure');

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // 1. Fetch the details of the adventure by making an API call
  try{
    const response = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    const data = await response.json();
    return data;
  }

  catch(err){
    return null;
  }
  

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML=`${adventure.name}`;
  document.getElementById("adventure-subtitle").innerHTML=`${adventure.subtitle}`;
  const elem = document.getElementById("photo-gallery");
  adventure.images.forEach((key) => {
    const childElem = document.createElement("div");
    childElem.innerHTML = `
      <img src="${key}" class="activity-card-image" />
    `;

    elem.appendChild(childElem);
  });

  const elem2 = document.createElement("p");
  elem2.textContent = `
    ${adventure.content};
  `;

  document.getElementById("adventure-content").appendChild(elem2);
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML=`
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner" id="carousel-inner">
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  `;

  for(let i=0; i<images.length; i++){
    let image = document.createElement("div");
    image.setAttribute("class", `carousel-item ${i===0 ? "active" : ""}`);
    image.innerHTML = `
      <img src = "${images[i]}" class="activity-card-image" />
    `;

    document.getElementById("carousel-inner").appendChild(image);
  }

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    // console.log(adventure);
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = `${adventure.costPerHead}`;
  }
  
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {

  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  if(persons === 0){
    // document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-cost").innerHTML = `${adventure.costPerHead}`;
  }
   
  else{
    // document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-cost").innerHTML = `${adventure.costPerHead * persons}`;
  } 
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {

  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  const formElem = document.getElementById("myForm");
  formElem.addEventListener("submit", async(e) => {
    e.preventDefault();
    const{name, date, person} = formElem.elements;
    let data = {
      name: name.value,
      date: new Date(date.value),
      person: person.value,
      adventure: adventure.id
    }

    const response = await fetch(config.backendEndpoint + `/reservations/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-Type": "application/json"
      }
    });

    try{
      const data = await response.json();
      alert("Success!");
      return data; 
    }
    catch(err){
      alert("Failed!");
      return null;
    }
  });


}


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }

  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
