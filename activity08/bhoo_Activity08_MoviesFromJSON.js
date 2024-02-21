/* 
Name : Bo Oo
Feb 21, 2024
Activity07
*/

// Define a function named getInputValue
function getInputValue() {
  // Get the movie name from the form input field
  let movieName = document.forms["my_form"]["inputMovieName"];
  // Store the value of the input field in a variable
  let inputMovieName = movieName.value;

  // Fetch the JSON file
  fetch("./bhoo_Activity08_MoviesFromJSON.json")
    // When the fetch is complete, convert the response to JSON
    .then((response) => response.json())
    // When the conversion is complete, call the loadMovies function with the JSON data
    .then((myMovies) => loadMovies(myMovies));

  // Define a function named loadMovies
  function loadMovies(myMovies) {
    // Get the div where the movie details will be displayed
    var mainContainer = document.getElementById("goodmovies");
    // Loop through each movie in the JSON data
    for (var i = 0; i < myMovies.movies.length; i++) {
      // If the movie title matches the user's input
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
