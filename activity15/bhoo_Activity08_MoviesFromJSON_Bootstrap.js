/* Name : Bo Oo April 14, 2024 Activity08 */

// Fetch all robots initially
fetch("http://localhost:8081/listRobots")
  .then((response) => response.json())
  .then((robots) => loadRobots(robots));

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("allRobot").addEventListener("click", function () {
    fetch("http://localhost:8081/listRobots")
      .then((response) => response.json())
      .then((robots) => loadRobots(robots));
  });
});

// Add event listener for the search button
document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("searchButton")
    .addEventListener("click", searchRobot);
});

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("addRobot").addEventListener("click", function () {
    const robotData = {
      id: 4,
      name: "Robot Abraham",
      price: 100.9,
      description: "I robot is one example of an image for my exercise",
      imageUrl: "https://robohash.org/Abraham",
    };

    fetch("http://localhost:8081/addRobot", {
      method: "POST", // Use POST method
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(robotData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Robot added successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Failed to add robot");
      });
  });
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

function deleteOneRobot() {
  let id = document.getElementById("deleteRobotById").value;
  if (!id) {
    alert("Please enter a Robot ID");
    return;
  }

  console.log(`Deleting robot with ID: ${id}`);
  fetch(`http://localhost:8081/deleteRobot/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Delete successful", data);
      alert(`Robot with ID ${id} deleted.`);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error during delete:", error);
      alert("Failed to delete robot: " + error.message);
    });
}

app.put("/updateRobot/:id", async (req, res) => {
  const id = Number(req.params.id);
  const query = { id: id };
  await client.connect();
  console.log("Robot to Update :", id);
  console.log(req.body);
  const updateData = {
    $set: {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
    },
  };
  const options = {};
  const results = await db
    .collection("robot")
    .updateOne(query, updateData, options);
  res.status(200);
  res.send(results);
});

function updateOneRobot() {
  let id = document.getElementById("updateRobotById").value;
  if (!id) {
    alert("Please enter a Robot ID to update");
    return;
  }
  console.log(`Updating robot with ID: ${id}`);
  const updatedData = {
    name: "Robot Abraham ALDACO-GASTELUM",
    price: 100.9,
    description: "I robot is one example of an image for my exercise",
    imageUrl: "https://robohash.org/Abraham",
  };

  fetch(`http://localhost:8081/updateRobot/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((updateThisRobot) => {
      console.log("Update successful", updateThisRobot);
      updateOneRobotById(updateThisRobot);
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error during update:", error);
      alert("Failed to update robot: " + error.message);
    });
}

function updateOneRobotById(robotData) {
  console.log("Updated Robot:", robotData);
}
