const endpoint = "http://localhost:3000/";

const searchInp = document.querySelector("#searchInp");
const genreContainer = document.querySelector("#genreContainer");
const galleryContainer = document.querySelector("#galleryContainer");

const productModal = document.querySelector("#productModal");
const addNewProduct = document.querySelector("#addNewProduct");
const modalCloseBtn = document.querySelector("#modalCloseBtn");


// ----------------------------HOlD ADD INPUT-------------------------

const form = document.querySelector("#form");
const nameInp = document.querySelector("#nameInp");
const yearInp = document.querySelector("#yearInp");
const priceInp = document.querySelector("#priceInp");
const titleInp = document.querySelector("#titleInp");
const imageInp = document.querySelector("#imageInp");
const catSelect = document.querySelector("#catSelect");


// ----------------------------HOlD ADD INPUT-------------------------

// ----------------------------FOREACH ARRAY-------------------------

const showArtGallery = (arr) => {
  galleryContainer.innerHTML = "";
  arr.forEach(({id, title, price, artist, genre, date, image_url}) => {
    galleryContainer.innerHTML += `
      <div class="galleryBox">
          <a href="./paintingDetail.html?painting=${id}"><img src="${image_url}" alt="${title}"></a>        
            <div class="description-Container">  
              <div>
                <a href="./paintingDetail.html?painting=${id}"><h4>${artist}</h4></a>
                <p class="productTitle">"${title}"</p>
                <p>${genre}</p>
                <p>${date}</p>
                <p class="price">€${price}</p>
              </div>  
              <div class="edit-delete-Btn">
                <i class="fa-regular fa-pen-to-square" onclick="editProduct(${id})"></i> <i class="fa-regular fa-square-minus" onclick="deleteProduct(${id})"></i>
              </div>
            </div>  
      </div>
     
    `
  });
};


const showGenre = (arr) => {
  genreContainer.innerHTML = "";
  arr.forEach((genre, i) => {
    genreContainer.innerHTML += `
    <p>${genre.name}</p>`
  });
};


// ----------------------------FOREACH ARRAY-------------------------

// ---------------------------- SEARCH --->> FILTER -------------------------


searchInp.addEventListener("input", (e) => {
  axios.get(endpoint + 'artGallery').then((res) => {
    if (res.status === 200 && res.statusText === "OK") {
      const filteredData = res.data.filter((artGallery) => 
        artGallery.title.toLowerCase().includes(e.target.value.toLowerCase()) 
      || artGallery.artist.toLowerCase().includes(e.target.value.toLowerCase()) || artGallery.genre.toLowerCase().includes(e.target.value.toLowerCase()) || artGallery.price.toLowerCase().includes(e.target.value.toLowerCase())
    )
      showArtGallery(filteredData)
    }
  });
});
// ---------------------------- SEARCH -------------------------



// ----------------------------AXIOS.GET-------------------------


const getGalleryPainting = () => {
  axios.get(endpoint + 'artGallery').then((res) => {
    if (res.status === 200 && res.statusText === "OK") {
      showArtGallery(res.data)
    }
  });
};
getGalleryPainting()

axios.get(endpoint + 'genre').then((res) => {
  if (res.status === 200 && res.statusText === "OK") {
    showGenre(res.data);
    res.data.slice(1).forEach((genre) => {
      catSelect.innerHTML += `<option value="${genre.name}" class="addOptionCategory">${genre.name}</option>`
    })
  };
});

// ----------------------------AXIOS.GET-------------------------


// ----------------------------AXIOS.POST --->> ADD NEW PRODUCT -------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    title: titleInp.value,   
    price: priceInp.value,
    artist: nameInp.value,
    genre: catSelect.value,
    date: yearInp.value,
    // image_url: imageInp.value,
  };
  axios.post(endpoint + 'artGallery', obj).then((res) => {
    if (res.status === 201 && res.statusText === "Created") {
      getGalleryPainting();
    };
  });
  productModal.classList.add("hidden");
});



// ----------------------------AXIOS.POST ADD NEW PRODUCT-------------------------


// ---------------------------- DELEET PRODUCT -------------------------
const deleteProduct = (id) => {
  axios.delete(endpoint + 'artGallery/' + id).then((res) => {
    if (res.status === 200 && res.statusText === "OK") {
      getGalleryPainting();
    }
  });
}

// ---------------------------- DELETE PRODUCT -------------------------

// ---------------------------- EDIT PRODUCT -------------------------
const editProduct = (id) => {
  axios.get(endpoint + 'artGallery/' + id).then((res) => {
    if (res.status === 200 && res.statusText === "OK") {
      const newTitle = prompt("Edit new title", res.data.title);
      const newPrice = prompt("Edit new price", res.data.price);


      const obj = {
        title: newTitle,
        price: newPrice,
      };
      axios.patch(endpoint + 'artGallery/' + id, obj).then((res) => {
        if (res.status === 200) {
          getGalleryPainting();
        };
      });
    };
  });
};

// ---------------------------- EDIT PRODUCT -------------------------






// ----------------------------ADD MODAL-------------------------

let isModal = true;

addNewProduct.addEventListener("click" , () => {
  if (isModal) {
    productModal.classList.add("activeModal");
    productModal.classList.remove("hidden")
  };
});

const setModalClose = () => {
  modalCloseBtn.addEventListener("click", () => {
    productModal.classList.add("hidden");
  });
}
setModalClose()

// ----------------------------ADD MODAL-------------------------





