function getResidentsLink(apilinks){
    document.getElementById('modalcontent').innerHTML = "";
    getHeaders();
    let links = JSON.parse(apilinks.replace(/'/g, '"'));

    for (let link of links) {
        fetch(link)
            .then(response => response.json())
            .then(residents => {
              let name = residents.name;
              let height = residents.height;
              let mass = residents.mass;
              let hairColor = residents.hair_color;
              let skinColor = residents.skin_color;
              let eyeColor = residents.eye_color;
              let birthYear = residents.birth_year;
              let gender = residents.gender;

              const resident = showResident(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender);
              document.getElementById('modalcontent').appendChild(resident);
    })
    .catch(error => console.log(error));
}



}
function getHeaders(){
    document.getElementById('modalcontent').innerHTML = `
              <div class="row">

                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Name</b>
                </div>
                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Height</b>
                </div>
                  <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Mass</b>
                </div>
                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Hair color</b>
                </div>
                    <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Skin color</b>
                </div>
                    <div class="col p-3 mb-2 bg-light text-dark border text-center">
                      <b>Eye color</b>
                </div>
                    <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Birth year</b>
                </div>
                <div class="col p-3 mb-2 bg-light text-dark border text-center">
                  <b>Gender</b>
                </div>
            </div>
        </div>`
}


function showResident(name, height, mass, hairColor, skinColor, eyeColor, birthYear, gender) {
  const row = document.createElement('div');
  row.classList.add('row');

  function createColumnWithSpan(content) {
    const col = document.createElement('div');
    col.classList.add('col', 'bg-light', 'text-dark', 'border');

    const span = document.createElement('span');
    span.style.display = 'inline-block';
    span.style.textAlign = 'center';
    span.textContent = content;

    col.appendChild(span);
    return col;
  }

  const nameCol = createColumnWithSpan(name);
  const heightCol = createColumnWithSpan(height);
  const massCol = createColumnWithSpan(mass);
  const hairColorCol = createColumnWithSpan(hairColor);
  const skinColorCol = createColumnWithSpan(skinColor);
  const eyeColorCol = createColumnWithSpan(eyeColor);
  const birthYearCol = createColumnWithSpan(birthYear);
  const genderCol = createColumnWithSpan(gender);

  row.appendChild(nameCol);
  row.appendChild(heightCol);
  row.appendChild(massCol);
  row.appendChild(hairColorCol);
  row.appendChild(skinColorCol);
  row.appendChild(eyeColorCol);
  row.appendChild(birthYearCol);
  row.appendChild(genderCol);

  return row;
}

