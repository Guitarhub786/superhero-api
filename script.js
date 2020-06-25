const super_container = document.getElementById('super_container');
const searchBar = document.getElementById('searchBar');
let hpCharacters = [];

const colors = {
  good: '#DEF3FD',
  bad: '#FDDFDF',
  undefined: '#DEFDE0'
}

const main_types = Object.keys(colors)
// console.log(main_types)

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredCharacters = hpCharacters.filter((character) => {
    return (
      character.name.toLowerCase().includes(searchString) ||
      character.slug.toLowerCase().includes(searchString)
    );
  });
  displayCharacters(filteredCharacters);
});

const loadCharacters = async () => {
  try {
    const res = await fetch('./superhero.json');
    hpCharacters = await res.json();
    // console.log(hpCharacters)

    displayCharacters(hpCharacters);
  } catch (err) {
    console.error("Harry Potter Said", err);
  }
};

const displayCharacters = (characters) => {

  const htmlString = characters
    .map((superhero) => {

      const super_types = superhero.biography.alignment
      // console.log(super_types)

      // Goes over types and finds first one in the array
      const type = main_types.find(
        type => super_types.indexOf(type) > -1
      )
      // console.log(type)
      const colorize = colors[type]
      // console.log(colorize)
      // super_container.style.backgroundColor = "orange";

      // fix lowercase "bad" to "Bad"
      const myAlignment = superhero.biography.alignment[0].toUpperCase() + superhero.biography.alignment.slice(1)

      return `
    <div class="superhero"  style="background-color: ${colorize}">           
      <div class="img-container">
        <img src=${superhero.images.lg} style="background-color: ${colorize}"/>
      </div>
      <div class="info">
          <span class="number">#${superhero.id.toString().padStart(3, '0')}</span>
        <h3 class="name">${superhero.name}</h3>
        <!-- <p>${superhero.slug}</p> -->
        
      <h3 class="fullname">${superhero.biography.fullName}</h3>
       <small class="type">Type: <span>${type}</span></small>
      <h3 class="publisher">${superhero.biography.publisher}</h3>
      <h3 class="alignment">${myAlignment} Guy</h3>
     </div>
    </div>
        `;
    })
    .join('');
  super_container.innerHTML = htmlString;
};

loadCharacters();