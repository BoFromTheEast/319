/* 
Name : Bo Oo
Feb 21, 2024
Activity07
*/

function getInputValue() {
  let movieName = document.forms["my_form"]["inputMovieName"];
  let inputMovieName = movieName.value;

  fetch("./bhoo_Activity08_MoviesFromJSON.json")
    .then((response) => response.json())
    .then((myMovies) => loadMovies(myMovies));

  function loadMovies(myMovies) {
    var mainContainer = document.getElementById("goodmovies");
    for (var i = 0; i < myMovies.movies.length; i++) {

      if (myMovies.movies[i].title === inputMovieName) {

        var div = document.createElement("div");
        
        var movie = myMovies.movies[i];

       
        div.innerHTML = `<br>
          MovieId = ${movie.movieId} <br>
          Title = ${movie.title} <br>
          Year = ${movie.year} <br>`;

        
        var img = document.createElement("img");
        
        img.src = movie.url;
        
        div.appendChild(img);

        
        mainContainer.appendChild(div);
      }
    }
  }
}
