const endpoint = "http://localhost:3000/";

const sliderHomePage = document.querySelector("#sliderHomePage");

const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

const swiperWrapper = document.querySelector("#swiperWrapper");


const displayMovies = () => {
    axios.get(endpoint + 'artGallery').then((res) => {
        // swiperWrapper.innerHTML = "";
        res.data.forEach(({image_url}) => {
        swiperWrapper.innerHTML += `
        
        <div class="swiper-slide">
        <a href="galleryPage.html" class="getGallery"></a>
        <img src="${image_url}" alt="">
        </div>`
    })
    })
    
}
displayMovies();





const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 2000,
    autoplay: {
        delay: 1000,
        disableOnInteraction: false,
    },
    slidesPerView: 2,
    spaceBetween: 10,
    allowTouchMove: true,
});











// const getAxiosArray = () => {
//     axios.get(endpoint + "artGallery").then((res) => {
//         painting = res.data;
//         painting.forEach((paintings) => {
//             sliderHomePage.innerHTML = `
//                     <img src="${paintings.image_url}" alt="">`
//         })
//         // displayPaintings();
//         // sliderHomePage.innerHTML = `
//         // <img src="${image_url}" alt="">`





//         // const displayPaintings = () => {
//         //     axios.get(endpoint + "artGallery").then((res) => {
//         //         res.data.forEach(({image_url}, ) => {
                    
                    
//         //         });
//         //     });
            
//         // };
        
//         // const updateCarusel = () => {
//         //     sliderHomePage.style.transform = `translateX(-${currentIndex * 100}%)`;
//         // }
        
//         nextBtn.addEventListener("click", () => {
//             if (currentIndex < painting.length - 1) {
//                 currentIndex++;
//             } else {
//                 currentIndex = 0;
//             }
//             updateCarusel();
//         });
        
//         prevBtn.addEventListener("click", () => {
//             if (currentIndex > 0) {
//                 currentIndex--;
//             } else {
//                 currentIndex = painting.length - 1
//             }
//             updateCarusel();
//         });



//     })
// };
// getAxiosArray()

// -------------------------

