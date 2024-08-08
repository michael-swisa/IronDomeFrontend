let missile;

const lodMissilesJson = async () => {
  const response = await fetch("missiles.json");
  const result = await response.json();
  missile = result;
};

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

const socket = new WebSocket("ws://localhost:3108/MissileHandler");

const publishMessage = (miss) => {
  socket.send(JSON.stringify(miss));
};
