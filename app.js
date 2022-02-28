document.getElementById("btn-search").addEventListener("click", () => {
  fetch(
    `https://openapi.programming-hero.com/api/phones?search=${
      document.getElementById("mobile-name").value
    }`
  )
    .then((response) => response.json())
    .then((data) => displayPhone(data.data));
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
    console.log(details);
}
