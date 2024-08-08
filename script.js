let missile;

// Loding missiles.json
const lodMissilesJson = async () => {
  const response = await fetch("missiles.json");
  const result = await response.json();
  missile = result;
};


// Inserting missile into html option one and send missile to server
const AddMissile = () => {
  if (missile.length > 0) {
    const missilesDiv = document.getElementById("missiles-div");
    const p = document.createElement("p");
    const OneMissiles = missile.shift();
    if (OneMissiles) {
      publishMessage(OneMissiles);
      Object.keys(OneMissiles).forEach((key) => {
        if (typeof OneMissiles[key] == "object") {
          p.innerText += `${key} : \n`;
          Object.keys(OneMissiles[key]).forEach((key1) => {
            p.innerText += `${key1} : ${OneMissiles[key][key1]} , \n`;
          });
        } else {
          p.innerText += `${key} : ${OneMissiles[key]} , \n`;
        }
      });
    }
    missilesDiv.appendChild(p);
  }
};


// Inserting missile into html option two and send missile to server
const addmissile = () => {
  const missilesdiv = document.getElementById("missiles-div");
  const p = document.createElement("p");
  const OneMissiles = missile.shift();
  if (OneMissiles) {
    p.innerText = JSON.stringify(OneMissiles, null, 8);
    publishMessage(OneMissiles);
    missilesdiv.appendChild(p);
  }
};


// conecstion to server
const socket = new WebSocket("ws://localhost:3108/MissileHandler");


// sending missile to server
const publishMessage = (miss) => {
  socket.send(JSON.stringify(miss));
};
