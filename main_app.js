const GENDER = {
    MEN:1,
    MEN_AND_WOMEN:0,
    WOMEN:2
  }
  const CENTRAL_TENDENCY = {
    MEAN: 1,
    AVERAGE: 0
  }
  const TEN = 0
  const FOURTEEN = 1

  let total = 0
  
  fetch('./PA627.json')
    .then(function (response) {
      return response.json();
    })
      .then(function (data) {
        const positions_ids = [39, 36, 8, 35, 23, 32, 31, 6, 28, 11, 13, 28, 21, 32, 14, 21, 11, 37, 18, 41]
        const texts = ["Nõudepesija", "Koristaja", "Õpetaja", "Autojuht", "Lapsehoidja", "Kokk", "Elektrik", "Tehnik", "Maaler", "Nõustaja", "Arst", "Ehitaja", "Ettelugeja", "Õmbleja", "Raamatupidaja", "Juuksur", "Psühholoog", "Aednik", "Logistik", "Torumees"]
        let positions = data.structure.dimensions.series[0].values
        let salaries = data.dataSets[0].series
        let positionsDescriptions = []
        let i = 0
        let key = ""
        positions_ids.forEach((positions_id) => {
          let line = getPositionById(positions_id, positions);
          key = (line.id-1).toString()+":"+GENDER.MEN_AND_WOMEN.toString()+":"+CENTRAL_TENDENCY.MEAN.toString()
          let k = salaries[key];
          let item = {"id":line.id, "name":line.name, "text":texts[i], "salary":k.observations[0]}
          positionsDescriptions.push(item)
          i++
        });
        positionsDescriptions.forEach((position) => {
          appendData(position)
        });
        
      })
    .catch(function (err) {
      console.log(err);
  });
  
  function appendData (data) {
    const mainContainer = document.getElementById("container")
    let positionContainer = document.createElement('div')
    positionContainer.classList.add('row')
    positionContainer.innerHTML = '<div class="job">' + data.text + '</div>' + '<div class="hour">' + '<input type="number">' + '</div>'+'<div class="sum">' + '</div>'
    mainContainer.append(positionContainer)
    positionContainer.querySelector(".hour input").addEventListener("change", function(){ calculate(event, data.salary, positionContainer.querySelector(".sum")) })
    

  }
  
  function getPositionById (number, obj) {
    let result
    obj.forEach((line) => {
      if (line.id == number) {
        result = line
      }
    });
    return result
  }

  function calculate (event, rate, sumDiv) {
    const sum = event.currentTarget.value * rate[0]
    total -= sumDiv.innerHTML.replace(",", ".")
    sumDiv.innerHTML = (Math.round(sum * 100) / 100).toString().replace(".", ",")
    if (sum === 0) {
      sumDiv.innerHTML = ""
    }
    total += sum
    console.log(total)
    document.querySelector(".kogu-summa").innerHTML = (Math.round(total * 100) / 100).toString().replace(".", ",")


  }
