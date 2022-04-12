//Select DOM elements to manipulate
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]'); 

//Color text by assigned type 
const typeColors = {
  electric: '#FFEA70',
  normal: '#B09398',
  fire: '#FF675C',
  water: '#0596C7',
  ice: '#AFEAFD',
  rock: '#999799',
  flying: '#7AE7C7',
  grass: '#4A9681',
  psychic: '#FFC6D9',
  ghost: '#561D25',
  bug: '#A2FAA3',
  poison: '#795663',
  ground: '#D2B074',
  dragon: '#DA627D',
  steel: '#1D8A99',
  fighting: '#2F2F2F',
  default: '#2A1A1F',
};  

//Prevent browser from default refresh after form submit action
const searchPokemon = event => {
  event.preventDefault();
  //Fetch value of pokemon in search
  const { value } = event.target.pokemon;
  fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
  //Request data if success run renderPokemon function if not 
  .then(data => data.json())
  .then(response => renderPokemonData(response))
  
}

//Render Pokemon data
const renderPokemonData = data => {
  const sprite = data.sprites.front_default;
  //Data sets to display
  const { stats, types } = data;  

  //Set text name from name to node 'pokeName' DOM element
  pokeName.textContent = data.name;
  //Set image sprite attribute from API to 'pokeImg' DOM element
  pokeImg.setAttribute('src', sprite);
  //Set text number from API id to 'pokeId' DOM element
  pokeId.textContent = `Nº ${data.id}`;
  //Function calls styling to cards 
  setCardColor(types);
  //Function calls styling to types 
  renderPokemonTypes(types);
  //Function displays stats text
  renderPokemonStats(stats);
}

const setCardColor = types => {
  //Call object 'typeColors' - obtain type color based on type
  const colorOne = typeColors[types[0].type.name];
  //Check if second type exists if so obtain type color based on type, if not display default color
  const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;

  pokeImg.style.background =  `radial-gradient(${colorTwo} 33%, ${colorOne} 33%)`;
  
  pokeImg.style.backgroundSize = ' 5px 5px';
}

// Display the available pokémon types
const renderPokemonTypes = types => {
  //Remove value for each user search
  pokeTypes.innerHTML = '';
  //For each of the types received, possible up to 2
  types.forEach(type => {
    //Create div element for each element type 
    const typeTextElement = document.createElement("div");
    //Assign color to text based on type
    typeTextElement.style.color = typeColors[type.type.name];
    typeTextElement.textContent = type.type.name;
    //Append 'typeTextElement' styling to pokeTypes
    pokeTypes.appendChild(typeTextElement);
  });
}

//Function executes stats
const renderPokemonStats = stats => {
  //Remove value for each user search
  pokeStats.innerHTML = '';
  //Iterate each stat of stats
  stats.forEach(stat => {
    //Div element container two elements 'name' + 'amount'
    const statElement = document.createElement("div");
    //Div element display element name
    const statElementName = document.createElement("div");
    //Div element display element amount
    const statElementAmount = document.createElement("div");
    //Collect name from database and add to stat element
    statElementName.textContent = stat.stat.name;
    //Collect base stat from database to stat element
    statElementAmount.textContent = stat.base_stat;
    //Append 'StatElementName' div to 'statElement' div container
    statElement.appendChild(statElementName);
    //Append 'statElementAmount' div to 'statElement'div container
    statElement.appendChild(statElementAmount);
    //Append HTML div element 'statElement' to entire element 'pokeStats'
    pokeStats.appendChild(statElement);
  });
}

const renderNotFound = () => {
  pokeName.textContent = 'No encontrado';
  pokeImg.setAttribute('src', 'poke-shadow.png');
  pokeImg.style.background =  '#fff';
  pokeTypes.innerHTML = '';
  pokeStats.innerHTML = '';
  pokeId.textContent = '';
}