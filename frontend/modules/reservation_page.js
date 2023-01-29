import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
 
  // 1. Fetch Reservations by invoking the REST API and return them

  const response = await fetch(config.backendEndpoint + `/reservations`);
  try{
    const data = await response.json();
    return data;
  }
  
  catch(err){
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {

  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  if(!reservations.length){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";

    console.log(reservations);
    reservations.forEach((key) => {
      const elem = document.createElement("tr");
      elem.innerHTML = `
      <td scope="col">${key.id}</td>
      <td scope="col">${key.name}</td>
      <td scope="col">${key.adventureName}</td>
      <td scope="col">${key.person}</td>
      <td scope="col">${new Intl.DateTimeFormat('en-IN').format(new Date(key.date))}</td>
      <td scope="col">${key.price}</td>
      <td scope="col">${new Date(key.time).toLocaleString('en-IN', {day:'numeric', month:'long', year:'numeric'}) + ", " + new Date(key.time).toLocaleTimeString().toLowerCase()}</td>
      <td scope="col"><button type="button" id="${key.id}" class="reservation-visit-button"><a href="../detail/?adventure=${key.adventure}">Visit Adventure</a></button></td>
      `;

      document.getElementById("reservation-table").appendChild(elem);
    });   

    const date2 = Date('Thu, 01 Jan 1970 00:00:00 GMT') 
    console.log(date2);
    
  }
  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
