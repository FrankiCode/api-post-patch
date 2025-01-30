const urlParams = new URLSearchParams(window.location.search);
const paintingId = urlParams.get("painting");
const endpoint = "http://localhost:3000/";

const productDetail = document.querySelector("#productDetail");

axios.get(endpoint + "artGallery/" + paintingId).then((res) => {
    if(res.status === 200 && res.statusText === "OK") {
        productDetail.innerHTML = `
            <div class="product-inner-detail">
                <div><img src="${res.data.image_url}" alt=""></div>
                <div class="buyDetail">
                    <p>${res.data.artist}</p>
                    <p>${res.data.title}</p>
                    <h3>€${res.data.price}<span>Free shipping</span></h3>
                    <a href="" class="buyNow">Buy now</a>
                    <a href="" class="addToCart">Add to cart</a>
                </div>
            </div>`
    };
});