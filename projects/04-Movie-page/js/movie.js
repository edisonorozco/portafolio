const URL_PATH = "https://api.themoviedb.org";
const API_KEY = "7598fc3a578b6d0ead10f8129c61bc2a";
let MOVIE_ID = "";

document.addEventListener("DOMContentLoaded", () => {
  MOVIE_ID = getUrlVars().id;
  renderMovieDetails(MOVIE_ID);
});

const getUrlVars = () => {
  let vars = {};
  window.location.href.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    function (movie_ID, key, value) {
      vars[key] = value;
    }
  );
  return vars;
};

const getMovieDetails = (movieId) => {
  const url = `${URL_PATH}/3/movie/${movieId}?api_key=${API_KEY}&language=es-ES`;

  return fetch(url)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log(error));
};

const renderMovieDetails = async (movieId) => {
  const movieDetail = await getMovieDetails(movieId);
  const { backdrop_path, poster_path, title, overview, genres, release_date } =
    movieDetail;
  renderBackGround(backdrop_path);
  renderPoster(poster_path, title);
  renderMovieData(title, overview, genres, release_date);
  getTeaser(movieId);
};

const renderBackGround = (backdrop_path) => {
  const urlBackground = `https://image.tmdb.org/t/p/original/${backdrop_path}`;

  document.getElementsByClassName(
    "movie-info"
  )[0].style.backgroundImage = `url("${urlBackground}")`;
};

const renderPoster = (poster_path, title) => {
  const urlPoster = `https://image.tmdb.org/t/p/original/${poster_path}`;
  const html = `<img src="${urlPoster}" class="img-fluid movie-info__poster-img" alt="${title}">`;
  document.getElementsByClassName("movie-info__poster")[0].innerHTML = html;
};

const renderMovieData = (title, overview, genres, release_date) => {
  const dataSplit = release_date.split("-");

  let htmlGeneres = "";

  genres.forEach((genre) => {
    htmlGeneres += `<li>${genre.name}</li>`;
  });

  const html = `
    <h1>
        ${title}
        <span class="date-any">${dataSplit[0]}</span>
        <span class="teaser" data-toggle="modal" data-target="#video-teaser">
           <i class="fas fa-play"></i> Ver trailer
        </span>
    </h1>
    <h5>General</h5>
    <p>${overview}</p>
    <h5>Generos</h5>
    <ul>
        ${htmlGeneres}
    </ul>
  `;

  document.getElementsByClassName("movie-info__data")[0].innerHTML = html;
};

const getTeaser = (movieId) => {
  const url = `${URL_PATH}/3/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`;

  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      renderTeaser(result);
    })
    .catch((error) => console.log(error));
};

const renderTeaser = (objVideo) => {
  let keyVideo = "";
  objVideo.results.forEach((video) => {
    if (video.type === "Trailer" && video.site === "YouTube") {
      keyVideo = video.key;
    }
  });

  let urlframe = "";

  if (keyVideo !== "") {
    urlframe = `
        <iframe width="100%" height="440px" src="https://www.youtube.com/embed/${keyVideo}"
        frameborder="0" allow="accelerometer"; autoplay; ecrypted-media;
        gryscope; picture-in-pincture"allowfullscreen></iframe>
      `;
  } else {
    urlframe = `<div class="no-teaser">La pelicula no tiene trailer</div>`;
  }

  document.getElementsByClassName("video-teaser-iframe")[0].innerHTML =
    urlframe;
};
