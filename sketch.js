// let unfilteredData;
let unfilteredData;
let scaleFactor = 50;
const categories = [
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Guam",
  "Hawaii",
  "Idaho",
  "Kentucky",
  "Maine",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Mexico",
  "North Carolina",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Puerto Rico",
  "Tennessee",
  "Texas",
  "U.S. Virgin Islands",
  "Utah",
  "Washington",
  "Wyoming",
];

function preload() {
  unfilteredData = loadTable(
    "./assets/FinalData.csv",
    "csv",
    "header",
    filterData
  );
  // data = loadTable("./assets/all_monthFiltered.csv", "csv", "header");
  // data = loadTable("./assets/allMonth.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("black");
  angleMode(RADIANS); // Set angle mode to radians
  noLoop();
  processData();
  labelMagnitudes();
  labelCategories();
  labelGraph();
}

function filterData() {
  let filteredData = unfilteredData.rows.filter((row) =>
    categories.includes(row.obj.placeCondensed)
  );
  data = filteredData;

  //debug
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].obj.placeCondensed);
  }
}

function processData() {
  data.sort((a, b) => new Date(a.obj.time) - new Date(b.obj.time));
  const startDate = new Date(data[0].obj.time);
  const endDate = new Date(data[data.length - 1].obj.time);
  // print(startDate);
  // print(endDate);

  //for each datapoint
  for (let i = 0; i < data.length; i++) {
    let r = data[i].obj;
    // let latitude = parseFloat(r.latitude);
    // let longitude = parseFloat(r.longitude);
    let magnitude = parseFloat(r.mag);
    // print(magnitude);
    let placeCondensed = r.placeCondensed;

    let dateE = new Date(r.time);
    let time = dateE.getDate();

    // print(time);

    // Map latitude and longitude to polar coordinates
    let angle =
      time / (10 * scaleFactor) + mapPlaceCondensedToAngle(placeCondensed);
    let radius = magnitude * scaleFactor; // Adjust the scale factor as needed

    // set color based on state
    let color = getColorForLocation(placeCondensed);

    // convert polar coordinates to Cartesian coordinates
    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);

    // draw the point
    fill(color);
    noStroke();
    ellipse(x, y, 5, 5);
  }
}

function mapPlaceCondensedToAngle(placeCondensed) {
  let index = categories.indexOf(placeCondensed);
  let totalCategories = categories.length;
  return map(index, 0, totalCategories, 0, TWO_PI);
}

function getColorForLocation(placeCondensed) {
  // Assign colors based on location
  // You can customize this based on your specific requirements
  let colors = {
    Alaska: color(169, 250, 110),
    Arizona: color(185, 243, 95),
    Arkansas: color(200, 236, 81),
    California: color(214, 228, 69),
    Colorado: color(227, 220, 60),
    Guam: color(239, 211, 53),
    Hawaii: color(250, 202, 50),
    Idaho: color(255, 193, 51),
    Kentucky: color(255, 183, 55),
    Maine: color(255, 173, 61),
    Missouri: color(255, 163, 69),
    Montana: color(255, 153, 79),
    Nebraska: color(255, 143, 89),
    Nevada: color(255, 132, 100),
    "New Mexico": color(255, 123, 111),
    "North Carolina": color(255, 114, 123),
    Ohio: color(255, 106, 136),
    Oklahoma: color(255, 99, 148),
    Oregon: color(255, 94, 161),
    "Puerto Rico": color(255, 91, 174),
    Tennessee: color(255, 91, 187),
    Texas: color(255, 92, 199),
    "U.S. Virgin Islands": color(246, 95, 211),
    Utah: color(230, 99, 222),
    Washington: color(245, 95, 212),
    Wyoming: color(245, 95, 212),
  };

  return colors[placeCondensed] || "gray"; // Default to gray if not found
}

function labelMagnitudes() {
  for (let i = 1; i <= 7; i++) {
    let r = i * scaleFactor * 2;
    strokeWeight(0.1);
    noFill();
    stroke("white");
    ellipse(width / 2, height / 2, r, r);
    push();
    textSize(7);
    fill("white");
    textAlign(CENTER);
    text(i, width / 2, height / 2 + r / 2 + 2.5);
    pop();
  }
}

function labelCategories() {
  // Label categories along the innermost radius
  for (let i = 0; i < categories.length; i++) {
    let angle = mapPlaceCondensedToAngle(categories[i]);
    let radius = scaleFactor * 6; // Innermost radius
    let x = width / 2 + radius * cos(angle);
    let y = height / 2 + radius * sin(angle);

    push();
    textSize(8);
    fill("white");
    textAlign(CENTER, CENTER);
    translate(x, y);
    rotate(angle + HALF_PI); // Rotate text to match angle
    text(categories[i], 0, 0);
    pop();
  }
}

function labelGraph() {
  push();
  translate(width / 2, height / 2);
  textSize(9);
  fill("white");
  textAlign(CENTER);
  text("U.S. Earthquakes", 0, 0);
  textSize(5);
  text("September 2023 - October 2023", 0, 10);
  pop();
}
