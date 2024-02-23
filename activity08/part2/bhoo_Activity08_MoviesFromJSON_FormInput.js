/* 
Name : Bo Oo
Feb 21, 2024
Activity07
*/

function getInputValue() {
  fetch("./bhoo_Activity08_MoviesFromJSON.json")
    .then((response) => response.json())
    .then((myMovies) => loadMovies(myMovies));
  let movieName = document.forms["my_form"]["inputMovieName"];
  let inputMovieName = movieName.value;
  function loadMovies(myMovies) {
    var mainContainer = document.getElementById("goodmovies");
    for (var i = 0; i < myMovies.movies.length; i++) {
      if (myMovies.movies[i].title === inputMovieName) {
        // Create a new div
        var div = document.createElement("div");
        // Store the current movie in a variable
        var movie = myMovies.movies[i];

        // Set the inner HTML of the div to the movie details
        div.innerHTML = `<br>
          MovieId = ${movie.movieId} <br>
          Title = ${movie.title} <br>
          Year = ${movie.year} `;

        // Create a new img element
        var img = document.createElement("img");
        // Set the src of the img element to the movie's picture URL
        img.src = movie.url;
        // Append the img element to the div
        div.appendChild(img);

        // Append the div to the main container
        mainContainer.appendChild(div);

      }
    }
  }
}
