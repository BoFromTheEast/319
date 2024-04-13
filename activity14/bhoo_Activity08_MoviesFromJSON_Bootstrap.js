/* Name : Bo Oo April 14, 2024 Activity08 */

// Fetch all robots initially
fetch("http://localhost:8081/listRobots")
  .then((response) => response.json())
  .then((robots) => loadRobots(robots));

// Add event listener for the search button
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("searchButton")
    .addEventListener("click", searchRobot);
});

function searchRobot() {
  const robotIdInput = document.getElementById("robotIdInput");
  const robotId = robotIdInput.value.trim();
  if (!robotId) {
    alert("Please enter a Robot ID");
    return;
  }
  // console.log("Robot ID:", robotId);

  if (robotId) {
    fetch(`http://localhost:8081/${robotId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 404) {
          throw new Error("Robot not found");
        } else {
          throw new Error("Error searching for robot");
        }
      })
      .then((robot) => {
        if (!Array.isArray(robot)) {
          robot = [robot]; // Ensure it's an array
        }
        loadRobots(robot);
      })

      .catch((error) => {
        console.error("Error:", error);
        alert(error.message);
      });
  } else {
    alert("Please enter a Robot ID");
  }
}

function loadRobots(robots) {
  var CardRobot = document.getElementById("col");
  CardRobot.innerHTML = ""; // Clear previous cards

  for (var i = 0; i < robots.length; i++) {
    let robotName = robots[i].name;
    let robotDescription = robots[i].description;
    let robotImageUrl = robots[i].imageUrl;
    let robotPrice = robots[i].price;

    let AddCardRobot = document.createElement("div");
    AddCardRobot.classList.add("col");
    AddCardRobot.innerHTML = `
      <div class="card shadow-sm">
        <img src="${robotImageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <p class="card-text">
            <strong>${robotName}</strong>
            ${robotDescription}
            <br>
            Price: $${robotPrice}
          </p>
          <div class="d-flex justify-content-between align-items-center">
            <div class="btn-group">
              <!--<button type="button" class="btn btn-sm btn-outline-secondary">View</button>
              <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>-->
            </div>
            <!--<small class="text-body-secondary">9 mins</small>-->
          </div>
        </div>
      </div>
    `;
    CardRobot.appendChild(AddCardRobot);
  }
}
