function myApp() {
    const key = "-zz2epZRuVEx0wp424GJnE8mi1Oq62pJJHDR-5V6w-8"
    const resultContainer = document.querySelector(".search-result");
    const input = document.querySelector(".input-box");
    const searchButton = document.querySelector(".search");
    const show = document.querySelector(".show");

    let keyword = "";
    let page = "";

    async function searchImages() {
        keyword = input.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${key}&per_page=12`;

        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if (page === 1) {
            resultContainer.innerHTML = ""
        }

        results.map((result) => {

            const image = document.createElement("img");
            image.src = result.urls.small;
            const imgLink = document.createElement("a");
            imgLink.herf = result.links.html;
            imgLink.target = "_blank"

            imgLink.appendChild(image);
            resultContainer.appendChild(imgLink);

            show.style.display = "block"
        })

    }

    searchButton.addEventListener("click", (e) => {
        page = 1;
        searchImages();
        gsap.from(".search-result", {
            opacity: 0,
            duration: 3,
        })
    }, false);

    show.addEventListener("click", (e) => {
        page++;
        searchImages()
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior:"auto"
        });
        gsap.from(".search-result", {
            opacity: 0,
            duration: 3,
        });
    })

}
myApp()

gsap.from(".logo, .search-form", {
    opacity: 0,
    duration: 3,
})

gsap.from(".show", {
    y: -50,
    repeat: -1,
    yoyo: "true"
})


const scroller = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
})


