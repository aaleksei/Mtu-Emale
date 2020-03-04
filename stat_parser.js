fetch('http://andmebaas.stat.ee/sdmx-json/data/PA627')
  .then(function (response) {
    return response.json();
  })
    .then(function (data) {
      let positions_ids = [4, 6, 30]
      let positions = data.structure.dimensions.series[0].values
      positions.forEach((position) => {
        positions_ids.forEach((positions_id) => {
          if (position.id == positions_id) {
            console.log(position);
          }
        });
      });
    })
  .catch(function (err) {
    console.log(err);
});
