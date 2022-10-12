function home() {
  window.location.href = "index.html";
}

const toggleSpinner = (spinner) => {
  document.getElementById("spinner").style.display = spinner;
};

//error check

const searchButton = () => {
  const searchField = document.getElementById("search-field");
  const error = document.getElementById("result");
  toggleSpinner("block");

  const searchText = searchField.value;
  searchField.value = "";
  // console.log(searchText);

  // if (isNaN(searchText)) {
  //   error.innerText = "error";
  // }

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMobile(data.data));
};

const displayMobile = (mobiles) => {
  // console.log(mobiles);

  const searchResult = document.getElementById("display-result");
  searchResult.textContent = "";
  for (const mobile of mobiles) {
    // console.log(mobile);
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `

  <div class="col">
    <div class="card">
      <img src="${mobile.image}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${mobile.phone_name}</h5>
        <p class="card-text">Brand: ${mobile.brand}</p>        
      </div>
      <button onclick="singleMobileInfo('${mobile.slug}')">More Details </button>
    </div>
  </div>
  `;
    searchResult.appendChild(div);
  }
  toggleSpinner("none");
};

const element = ["${mobile.image}", "${mobile.phone_name}", "${mobile.brand}"];
// console.log(element.slice(0, 20));

// single Mobile Details

const singleMobileInfo = (Detail) => {
  console.log(Detail);
  const url = `https://openapi.programming-hero.com/api/phone/${Detail}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => SingleMobileDetail(data.data));
};

const SingleMobileDetail = (moreDetail) => {
  console.log(moreDetail);
  const displayDetail = document.getElementById("more-details");
  displayDetail.textContent = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <div class="">
  <div class="row">
    <div class="col p-4 m-3">
       <p class="card-text">
          <h6>Name: ${moreDetail.name}</h6>
          Brand: ${moreDetail.brand}<br>
          Storage: ${moreDetail.mainFeatures.storage} <br>
          Memory:${moreDetail.mainFeatures.memory}<br>
          Display: ${moreDetail.mainFeatures.displaySize}<br>
          ChipSet: ${moreDetail.mainFeatures.chipSet}<br>
          WLAN:${moreDetail.others.WLAN}<br>
          Bluetooth: ${moreDetail.others.Bluetooth}<br>
          GPS: ${moreDetail.others.GPS}<br>
          Release Date: ${moreDetail.releaseDate} <br>
    </div>
    <div class="col container text-center p-3 w-50 mx-auto">
      <img src="${moreDetail.image}" class="card-img-top" alt="...">
    </div>
  </div>
  </div>
  `;

  displayDetail.appendChild(div);
};
// Search With ID
