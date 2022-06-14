let searchedMovies = [];

const movieItem = (movie) =>{
    const movieId = searchedMovies.indexOf(movie);
    return `<li class="list-item ml-3">
        <a class="li-container" id="${movieId}" onclick="addMovie(this)">${movie.title}</a>
    </li>`
}

const movieCard = (movie) =>{
    return `<div class="card m-2 border-0" style="width: 18rem;">
    <img class="card-img-top" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Image not found">
    <div class="card-body">
      <h3 class="card-title">${movie.title}</h3>
      <p>Release date : <b>${movie.release_date}</b></p>
      <p>Vote average : ${movie.vote_average}</p>
      <button class="btn btn-primary" onclick="deleteMovie(this)">Delete movie</button>
    </div>
  </div>`
}

const deleteMovie = (btn) =>{
    btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
}

const addMovie = (btn) =>{
    const selectedMovie = searchedMovies[btn.id];
    const movieList = document.querySelector('.movieList');
    movieList.innerHTML += movieCard(selectedMovie);
    const searchMovies = document.querySelector('.searchMovies');
    searchMovies.innerHTML = "";
}

const displayList = (data) =>{
    searchedMovies = data.results;
    const searchMovies = document.querySelector('.searchMovies');
    searchMovies.innerHTML = searchedMovies.map(movieItem).join("");
}

const loadMovie = (request) =>{
    fetch(request).then(res => res.json()).then(displayList);
}

const searchMovie = () =>{
    const movie = document.querySelector(".searchBox").value;
    const request = `https://api.themoviedb.org/3/search/movie?api_key=4bc18aa635a0b2e9012a0dfbb4485771&query=${movie}&language=en-US`;
    loadMovie(request);
}

const main = () =>{
    const btn = document.querySelector(".btn");
    btn.addEventListener('click', searchMovie);
}