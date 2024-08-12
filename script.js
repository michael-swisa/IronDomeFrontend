let misseiles;

// Loding missiles.json
const LodMissilesJson = async () => {
  const response = await fetch("missiles.json");
  const miss = await response.json();
  misseiles = miss;
};

// inserting missile into html
const insertMissileToDispatch = () => {
  for (let i = 0; i < misseiles.length; i++) {
    let missilesDiv = document.getElementById("missiles-to-send");
    let p = document.createElement("p");
    p.innerText = `Missile name: ${misseiles[i]["Name"]}, time: ${misseiles[i]["Time"]}`;
    p.id = misseiles[i]["Id"];
    missilesDiv.appendChild(p);
  }
};

const setTime = (time) => {
  let count = time;
  setInterval(() => {
    count--;
  }, 1000);
};

// Inserting missile into html and send missile to server
const AddMissiles = async () => {
  await LodMissilesJson();
  insertMissileToDispatch()
  while (misseiles.length > 0) {
    let missilesDiv = document.getElementById("missiles-in-air");
    let p = document.createElement("p");
    const OneMissiles = misseiles.shift();
    if (OneMissiles) {
      let AmountTime = OneMissiles.Time;
      await new Promise((resolve) => setTimeout(resolve, AmountTime * 1000));
      removeMissile("missiles-to-send", OneMissiles["Id"]);
      publishMessage(OneMissiles);
      p.id = OneMissiles["Id"];
      p.innerText += `Missile name: ${OneMissiles["Name"]}.`;
      missilesDiv.appendChild(p);
    }
  }
};

// // Inserting missile into html option one and send missile to server
// const AddMissile = () => {
//   if (missile.length > 0) {
//     const missilesDiv = document.getElementById("missiles-div");
//     const p = document.createElement("p");
//     const OneMissiles = missile.shift();
//     if (OneMissiles) {
//       publishMessage(OneMissiles);
//       Object.keys(OneMissiles).forEach((key) => {
//         if (typeof OneMissiles[key] == "object") {
//           p.innerText += `${key} : \n`;
//           Object.keys(OneMissiles[key]).forEach((key1) => {
//             p.innerText += `${key1} : ${OneMissiles[key][key1]} , \n`;
//           });
//         } else {
//           p.innerText += `${key} : ${OneMissiles[key]} , \n`;
//         }
//       });
//     }
//     missilesDiv.appendChild(p);
//   }
// };

// // Inserting missile into html option two and send missile to server
// const addmissile = async () => {
//   while (missile.length > 0) {
//     const missilesdiv = document.getElementById("missiles-div");
//     const p = document.createElement("p");
//     const OneMissiles = missile.shift();
//     let AmountTime = OneMissiles.Time;
//     await new Promise((resolve) => setTimeout(resolve, AmountTime * 1000));

//     if (OneMissiles) {
//       p.innerText = JSON.stringify(OneMissiles, null, 8);
//       publishMessage(OneMissiles);
//       missilesdiv.appendChild(p);
//     }
//   }
// };

// conecstion to server
const socket = new WebSocket("ws://localhost:3108/MissileHandler");

// sending missile to server
const publishMessage = (miss) => {
  socket.send(JSON.stringify(miss));
};

// Handle messages from the backend
socket.onmessage = (event) => {
  console.log("got message", JSON.stringify(event.data));
  let result = JSON.parse(event.data);
  removeMissile("missiles-in-air", result.Id);
  printToScreenResult(result);
};


const removeMissile = (nameDiv, id) => {
  const missileOnAir = document.getElementById(nameDiv).children;
  for (let i = 0; i < missileOnAir.length; i++) {
    if (missileOnAir[i].id == id) {
      missileOnAir[i].remove();
    }
  }
};


// Print to the screen the result of the interception
const printToScreenResult = (result) => {
  if (result.intercepted) {
    const missilesDivs = document.getElementById("intercepted-missiles");
    const p = document.createElement("p");
    p.innerText = `Missile name: ${result.Missile}, intercepted: ${result.intercepted} by: ${result.by}`;
    p.id = result.Id;
    missilesDivs.appendChild(p);
  } else {
    const missilesDivs = document.getElementById("Fallen-missiles");
    const p = document.createElement("p");
    p.innerText = `Missile name: ${result.Missile}, intercepted: ${result.intercepted} by: ${result.by}`;
    p.id = result.Id;
    missilesDivs.appendChild(p);
  }
};