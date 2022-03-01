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

const displayPhone = (phones) => {
  /* console.log(phones.data[0].brand) */

  const resultField = document.getElementById("search-result");

  phones.forEach((phone) => {
   // console.log(phone);

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
};


const moreDetails = details =>{
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(response => response.json())
    .then(data => displayPhoneDetails(data.data))
}

const displayPhoneDetails = phoneDetails =>{
  console.log(phoneDetails.image);
  const singlePhone = document.getElementById('phone-info');
  const div = document.createElement("div");
  const others = phoneDetails.others;
    div.classList.add("col");
    div.innerHTML =  `
    <div class="card h-100 border border-success border-3 rounded-3">
        <img src="${phoneDetails.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h3 class="card-title">Phone Name: ${phoneDetails.name}</h3>

          
          <p5 class="card-title fs-4">Brand Name: <span class="fs-5">${phoneDetails.brand}</span></p5>
          <h5 class="card-title fs-4">Release Date: <span class="fs-5">${phoneDetails.releaseDate ? phoneDetails.releaseDate : "Release Not Yet"}</span></h5>
          <h5 class="card-title fs-4">Storage: <span class="fs-5">${phoneDetails.mainFeatures.storage}</span></h5>
          <h5 class="card-title fs-4">ChipSe: <span class="fs-5">${phoneDetails.mainFeatures.chipSet ? phoneDetails.mainFeatures.chipSet : "Not Available"}</span></h5>
          <h5 class="card-title fs-4">DisplaySize: <span class="fs-5">${phoneDetails.mainFeatures.displaySize}</span></h5>
          
          <h5 class="card-title fs-4">MainFeatures: <span class="fs-5">${phoneDetails.mainFeatures.memory}</span></h5>
          <h6 class="card-text">
            Sensor: ${phoneDetails.mainFeatures.sensors ? phoneDetails.mainFeatures.sensors : "Not Available"}
          </h6>
          <h6> Other: <span class="fs-5"></span></h6>
        </div>
      </div>`;
    singlePhone.appendChild(div);

}
