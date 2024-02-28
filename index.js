const loadData = async (isShowAll) => {
    const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
    const data = await res.json();
    let phones = data.data.tools;
    console.log(phones);
    disPlayData(phones, isShowAll);
  };
  
  const disPlayData = (phones, isShowAll) => {
    const phoneContainer = document.getElementById("phone-container");
    phoneContainer.innerHTML = ''; // clear existing data
  
    const showAllContainer = document.getElementById("show-all-container");
    if (phones.length > 4 && !isShowAll) {
      showAllContainer.classList.remove("hidden");
    } else {
      showAllContainer.classList.add("hidden");
    }
  
    // display only first 12 phones if not show all
    if (!isShowAll) {
      phones = phones.slice(0, 4);
    }
  
    phones.forEach((phone) => {
      console.log(phone);
      const phoneCard = document.createElement("div");
      phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
      phoneCard.innerHTML = `
      <figure><img src="${phone.image}" alt="Not Found" /></figure>
      <div class="card-body">
      <h2 class="card-title">Features</h2>
      <li class="card-text">${phone.features[0]}</li>
      <li class="card-text">${phone.features[1]}</li>
      <li class="card-text">${phone.features[2]}</li>
      <hr class="border-dashed">
      <div class="flex justify-between items-center">
      <div>
      <h2 class="card-title mb-5">${phone.name}</h2>
      <p class="card-text">${phone.published_in}</p>
      </div>
      <div>
          <div class="card-actions justify-end">
          <button onclick="handleShowDetails('${phone.id}')" class="btn btn-primary">Show Details</button>
          </div>
      </div>
  </div>
  </div>
  `;
      phoneContainer.appendChild(phoneCard);
    });
  };
  
  // show details
  const handleShowDetails = async (id) => {
    console.log("show details", id);
    //   load single phone data from
    const res = await fetch(
      `https://openapi.programming-hero.com/api/ai/tool/${id}`
    );
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    showDetails(phone);
  };
  
  const showDetails = (phone) => {
    console.log(phone);
    const showAllContainer = document.getElementById("Show-all-container");
    showAllContainer.innerHTML = `
  <div class="flex gap-5">
      <div class="bg-pink-300 p-10 w-2/4 rounded-2xl">
           <h1 class="text-[#111] font-semibold">${phone.description}</h1>
          <div class="flex gap-2 pt-3">
           <div class="bg-[#FFF] rounded-xl p-5">
           <p class="text-[#03A30A] font-semibold">${phone.pricing? phone.pricing[0].price: ""}</p>
           </div>
           <div class="bg-[#FFF] rounded-xl p-5">
           <p class="text-[#F28927] font-semibold">${phone.pricing? phone.pricing[1].price: "" }</p>
           </div>
           <div class="bg-[#FFF] rounded-xl p-5">
           <p class="text-[#EB5757] font-semibold">${phone.pricing? phone.pricing[2].price: ""}</p>
           </div>
         </div>
         <div class="flex gap-4 pt-10">
           <div>
            <h2 class="card-title">Features</h2>
            <li class="card-text">${phone.features? phone.features[1].feature_name: ""}</li>
            <li class="card-text">${phone.features? phone.features[2].feature_name: ""}</li>
            <li class="card-text">${phone.features? phone.features[3].feature_name: ""}</li>
            </div>
            <div>
            <h2 class="card-title">Integrations</h2>
            <li class="card-text">${phone.integrations? phone.integrations[0]: ""}</li>
            <li class="card-text">${phone.integrations? phone.integrations[1]: ""}</li>
            <li class="card-text">${phone.integrations? phone.integrations[2]: ""}</li>
            </div>
          </div>
     </div>
  
      <div class="p-10">
        <div class="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img src="${phone.image_link[0]}" alt="Not Found" /></figure>
            <div class="card-body">
            <h2 class="card-title">${phone.input_output_examples?phone.input_output_examples[0].input: ""}</h2>
            <p>${phone.input_output_examples? phone.input_output_examples[0].output: ""}</p>
            </div>
        </div>
      </div>
  </div>
      `;
    // show the model
    my_modal_1.showModal();
  };
  
  // showAll Button
  const handleShowAll = () => {
      console.log("show all");
      loadData(true); // Pass true to indicate showing all data
  }
  
  // Call handleShowAll when the button is clicked
  document.getElementById("show-all-button").addEventListener("click", handleShowAll);
  
  loadData();
  