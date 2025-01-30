const endpoint = "http://localhost:3000/";

const searchInp = document.querySelector("#searchInp");
const genreContainer = document.querySelector("#genreContainer");
const galleryContainer = document.querySelector("#galleryContainer");


const form = document.querySelector("#form");
const nameInp = document.querySelector("#nameInp");
const yearInp = document.querySelector("#yearInp");
const priceInp = document.querySelector("#priceInp");
const titleInp = document.querySelector("#titleInp");
const imageInp = document.querySelector("#imageInp");
const catSelect = document.querySelector("#catSelect");


// ----------------------------FOREACH ARRAY-------------------------

const showArtGallery = (arr) => {
  galleryContainer.innerHTML = "";
  arr.forEach(({id, title, price, artist, genre, date, image_url}) => {
    galleryContainer.innerHTML += `
      <div class="galleryBox">
            <a href="./paintingDetail.html?painting=${id}"><img src="${image_url}" alt="${title}"></a>        
            <a href="./paintingDetail.html?painting=${id}"><h4>${artist}</h4></a>
            <p>"${title}"</p>
            <p>${genre}</p>
            <p>${date}</p>
            <p class="price">€${price}</p>
      </div>
     
    `
  });
};


const showGenre = (arr) => {
  genreContainer.innerHTML = "";
  arr.forEach((genre, i) => {
    genreContainer.innerHTML += `
    <p>${genre}</p>`
  });
};


// ----------------------------FOREACH ARRAY-------------------------

// ---------------------------- SEARCH -------------------------


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
      catSelect.innerHTML += `<option value="${genre}">${genre}</option>`
    })
  };
});

// ----------------------------AXIOS.GET-------------------------


// ----------------------------AXIOS.ADD NEW PRODUCT-------------------------

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    title: titleInp.value,   
    price: priceInp.value,
    artist: nameInp.value,
    genre: catSelect.value,
    date: yearInp.value,
    image_url: imageInp.value,
  };
  axios.post(endpoint + 'artGallery', obj).then((res) => {
    if (res.status === 201 && res.statusText === "Created") {
      getGalleryPainting();
    };
  });
});



// ----------------------------AXIOS.ADD NEW PRODUCT-------------------------


// const artGAllery = [

//         {
//           "title": "Impression, Sunrise",
//           "price": "5000 USD",
//           "artist": "Claude Monet",
//           "genre": "landscape",
//           "date": "1872",
//           "image_url": "https://commons.wikimedia.org/wiki/File:Claude_Monet,_Impression,_soleil_levant.jpg"
//         },
//         {
//           "title": "Mona Lisa",
//           "price": "850000000 USD",
//           "artist": "Leonardo da Vinci",
//           "genre": "portrait",
//           "date": "1503",
//           "image_url": "https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg"
//         },
//         {
//           "title": "Starry Night",
//           "price": "100000000 USD",
//           "artist": "Vincent van Gogh",
//           "genre": "post-impressionism",
//           "date": "1889",
//           "image_url": "https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
//         },
// ]