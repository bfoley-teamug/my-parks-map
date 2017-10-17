 
const myMap = L.map('map');
 
const myBasemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
 
myBasemap.addTo(myMap);
 
myMap.setView([37.5222722, -122.3224665], 14);


const request = new XMLHttpRequest();

request.open('GET', 'parks.json', true);

request.onload = function() {
  
    const data = JSON.parse(this.response);
  
    const parkCount = data.parks.reduce((sums, park) => {
      sums[park.city] = (sums[park.city] || 0) + 1;
      return sums;
    }, {});
  
    console.log(parkCount); 
  
    for (let city in parkCount) {
      console.log(city, parkCount[city])
    }

    const parks = data.parks.map(function(park) {

    L.marker([park.lat, park.long]).bindPopup(`
      <h4>${park.name}</h4> 
      <p>${park.city}</p>
  `).openPopup().addTo(myMap);
    });
  }  


request.send(); 