const GENDER = {
  MEN:2,
  MEN_AND_WOMEN:1,
  WOMEN:3
}
const CENTRAL_TENDENCY = {
  MEAN: 2,
  AVERAGE: 1
}

fetch('http://andmebaas.stat.ee/sdmx-json/data/PA627')
  .then(function (response) {
    return response.json();
  })
    .then(function (data) {
      const positions_ids = [39, 36, 8, 35, 23, 32, 31, 6, 28, 11, 13, 28, 21, 32, 14, 21, 11, 37, 18, 41]
      const texts = ["Nõudepesija", "Koristaja", "Õpetaja", "Autojuht", "Lapsehoidja", "Kokk", "Elektrik", "Tehnik", "Maaler", "Nõustaja", "Arst", "Ehitaja", "Ettelugeja", "Õmbleja", "Raamatupidaja", "Juuksur", "Psühholoog", "Aednik", "Logistik", "Torumees"]
      let positions = data.structure.dimensions.series[0].values
      let positionsDescriptions = []
      let i = 0

      positions.forEach((position) => {
        console.log(position);
        positions_ids.forEach((positions_id) => {
          if (position.id == positions_id) {
            console.log("pos id: ", position.id);
            console.log(positions_id);
            let item = {"id":position.id, "name":position.name, "text":texts[i]}
            positionsDescriptions.push(item)
            i++
          }
        });
      });
      console.log(positionsDescriptions);
      positionsDescriptions.forEach((position) => {
        appendData(position)
      });
    })
  .catch(function (err) {
    console.log(err);
});

function appendData (data){
  const mainContainer = document.getElementById("jobs")
  let positionContainer = document.createElement('div')
  positionContainer.classList.add('job')
  positionContainer.innerHTML = '<div class="title">' + data.text + '</div>'
  mainContainer.append(positionContainer)

}
