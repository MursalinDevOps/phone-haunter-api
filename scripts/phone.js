const loadPhone = async (searchText = "iphone 13", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
};
const displayPhones = (phones, isShowAll) => {
  // console.log(phones);
  const phoneContainer = document.getElementById("phone-container");
  // clear thr container cards before adding new cards
  phoneContainer.textContent = "";
  // display show all but if there are more than 12 cards
  const showAllContainer = document.getElementById("show-all-container");
  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // console.log("is show all", isShowAll);
  // display only first 12 cards
  if (!isShowAll) {
    phones = phones.slice(0, 12);
  }
  phones.forEach((phone) => {
    // 1. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 w-full bg-gray-100 shadow-xl`;
    // 2. set innerHTML
    phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Phones" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <div class="card-actions justify-center">
            <button onclick="handleDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
          </div>
        </div>
        `;
    phoneContainer.appendChild(phoneCard);
  });

  // calling this fn to stop loading spinner after loading  \\

  toggleLoadingSpinner();
};
// handle details
const handleDetails = async (id) => {
  // console.log(id);
  // load single phone data
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};
// show phone details in modal
// <button class="btn" onclick="my_modal_5.showModal()">open modal</button>
const showPhoneDetails = (phone) => {
  console.log(phone);
  // const showPhoneImage = document.getElementById('show-image');
  // showPhoneImage.innerText = phone.image;
  const showPhoneName = document.getElementById("show-phone-name");
  showPhoneName.innerText = phone.name;

  const showReleaseDate = document.getElementById("show-release-date");
  showReleaseDate.innerText = phone.releaseDate;

  const showChipSet = document.getElementById("show-chipset");
  showChipSet.innerText = phone?.mainFeatures?.chipSet;

  const showDisplaySize = document.getElementById("show-display-size");
  showDisplaySize.innerText = phone?.mainFeatures?.displaySize;

  const showMemory = document.getElementById("show-memory");
  showMemory.innerText = phone?.mainFeatures?.memory;

  const showStorage = document.getElementById("show-storage");
  showStorage.innerText = phone?.mainFeatures?.storage;

  const showSensors = document.getElementById("show-sensors");
  showSensors.innerText = phone?.mainFeatures?.sensors[0];

  my_modal_5.showModal();
};
// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

// Loading spinner
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
// handle show all
const handleShowAll = () => {
  handleSearch(true);
};

loadPhone();
