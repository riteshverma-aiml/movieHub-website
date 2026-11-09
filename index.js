const movieForm = document.querySelector("#movie");
const movieInput = document.querySelector("#movies")
const movieHub = document.querySelector("#movieHub")

movieForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let query = movieInput.value.trim();

    if (!query) {
        return
    }
    console.log(query);
    searchMovies(query)
});

async function searchMovies(movieName) {
    movieHub.innerHTML = `<div class="loader"></div>`
    let response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=1270e8a8&s=${encodeURIComponent(movieName)}`);
    let data = await response.json()
    console.log(data);
    displayMovies(data.Search)

    if(data.Response){
        displayMovies(data.Search);
    }
    else{
        movieHub.innerHTML= `<p>${data.Error}</p>`;
    }
}

function displayMovies(movies) {
    movieHub.innerHTML = ""
    movies.forEach((movie) => {

        const div = document.createElement("div")

        div.dataset.id=movie.imdbID
        div.setAttribute("class","movie-class")

        div.innerHTML = `
            <div>
                <img src=${movie.Poster} alt = "">
            </div>

            <div>
                <p>${movie.Title}</p>
                <p>${movie.Year}</p>
            </div>
            `
        movieHub.append(div)
    });
}

movieHub.addEventListener("click",(e) =>{
    e.stopPropagation();
    const movieCard = e.target.closest(".movie-class")
    if(!movieCard)return;
    const imdbID = movieCard.dataset.id;
    location.href = `moviedetail.html?id=${imdbID}`;
})