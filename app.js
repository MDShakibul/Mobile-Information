/* fetch data from api */
document.getElementById("btn-search").addEventListener("click", () => {
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      document.getElementById("mobile-name").value
    }`
  )
    .then((response) => response.json())
    .then((data) => displayPhone(data.data));
    document.getElementById("mobile-name").value = "";
});


/* display all phone */
const displayPhone = (phones) => {
  const resultField = document.getElementById("search-result");
  resultField.textContent = "";
  const singlePhone = document.getElementById('phone-info');
  singlePhone.textContent = ""
  document.getElementById('text_single_phone_details').innerText= "";
  document.getElementById('text_show_result').innerText = 'All Mobile Phone';
  var limit_Phones = phones.slice(0,20);

  if(limit_Phones.length === 0){
    document.getElementById("error_message").innerText = "This Phone of brand are not available"
    document.getElementById('text_show_result').innerText="";
  }else{
    limit_Phones.forEach((phone) => {
      document.getElementById("error_message").innerText = ""
      document.getElementById('error_single_phone_details').innerText = '';
      
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
          <div class="card h-100 border border-success border-3 rounded-3">
              <img src="${phone.image}" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">Phone Name: ${phone.phone_name}</h5>
                <p class="card-text">
                  Brand Name: ${phone.brand}
                </p>
                <button onclick="moreDetails('${phone.slug}')" class="btn btn-primary rounded-3">More Info</button>
              </div>
            </div>`;
            
  
      resultField.appendChild(div);
    });
  }

  
};


/* find a single mobile details */
const moreDetails = details =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(response => response.json())
    .then(data => displayPhoneDetails(data.data))
}


/* display single mobile details */
const displayPhoneDetails = phoneDetails =>{
  const singlePhone = document.getElementById('phone-info');
  document.getElementById('text_single_phone_details').innerText = 'Single Mobile Phone Details';
  singlePhone.textContent = "";
  const div = document.createElement("div");
    div.classList.add("col");
    if(!phoneDetails.others){
      document.getElementById('error_single_phone_details').innerText = 'This Phone have some feature missing';
      document.getElementById('text_single_phone_details').innerText = '';
    }else{
      document.getElementById('error_single_phone_details').innerText="";
      div.innerHTML =  `
    <div class="card h-100 border border-success border-3 rounded-3">
        <img src="${phoneDetails.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h3>Phone Name: <span class="fs-5">${phoneDetails.name}</span></h3><hr>

          
          <h3>Brand Name: <span class="fs-5">${phoneDetails.brand}</span></h3><hr>
          <h3>Release Date: <span class="fs-5">${phoneDetails.releaseDate ? phoneDetails.releaseDate : "Release Not Yet"}</span></h3><hr>
          <h3>Storage: <span class="fs-5">${phoneDetails.mainFeatures.storage}</span></h3><hr>
          <h3>ChipSe: <span class="fs-5">${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : "Not Available"}</span></h3><hr>
          <h3>DisplaySize: <span class="fs-5">${phoneDetails.mainFeatures.displaySize}</span></h3><hr>
          
          <h3>MainFeatures: <span class="fs-5">${phoneDetails.mainFeatures.memory}</span></h3><hr>
          <h3>Sensor: <span class="fs-5">
             ${phoneDetails.mainFeatures.sensors ? phoneDetails.mainFeatures.sensors : "Not Available"}</span>
          </h3><hr>
          <h3> Other: <span class="fs-5">Wlan: ${phoneDetails.others.WLAN ? phoneDetails.others.WLAN : "Not Available"},  Bluetooth: ${phoneDetails.others.Bluetooth}, GPS: ${phoneDetails.others.GPS}, USB: ${phoneDetails.others.USB}</span></h3>
        </div>
      </div>`;
    singlePhone.appendChild(div);
    }
    

}
