/* Name: Bo Oo Feb 21, 2024 Activity08 */
fetch("http://localhost:8081/listRobots")
  .then((response) => response.json())
  .then((robots) => loadRobots(robots));

function loadRobots(robots) {
  var CardRobot = document.getElementById("col");
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