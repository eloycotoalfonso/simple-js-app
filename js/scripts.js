//Creation of the array of pokemons
const pokemonRepository = (function () {
  let pokemonsList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=50";
  //let modalContainer = document.querySelector('#modal-container');
  


  // When it's called, this function adds the pokemon "pokemon" object into the pokemon array
  function add(pokemon) {
    let validKeyNames = ["name", "detailsUrl"];
    // console.log("This are the objects for pokemon model")
    // if(typeof(pokemon) === 'object' && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(Object.keys(pokemonModel))){
    if (
      typeof pokemon === "object" &&
      Object.keys(pokemon).every((keyName) => validKeyNames.includes(keyName))
    ) {
      pokemonsList.push(pokemon);
    } else {
      console.log("The Pokemon: " + pokemon + "is not in the right format");
    }
  }

  // When it's called, this function will print the pokemon list in the browser window
  //  Dependencies functions: addListItem
  function getAll() {
    pokemonsList.forEach(function (pokemon) {
      addListItem(pokemon);
    });
    return pokemonsList;
  }

  // This function will filter the pokemon and log it in the console if the pokemon exists in the pokemonList array
  function filter(input) {
    let filtered = pokemonsList.filter((pokemon) => pokemon.name === input);
    console.log(filtered);
  }

  // When called this function will include in a list the pokemon passed as an argument to the browser.
  function addListItem(pokemon) {
    // let unorderedList = document.querySelector('.pokemon-list');
    let unorderedList = document.querySelector(".list-group");
    let liItem = document.createElement("li");
    liItem.classList.add("group-list-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.setAttribute("data-toggle", "modal");
    button.setAttribute("data-target", "#pokemon-modal");
    // button.classList.add('pokebutton');
    button.classList.add("btn", "btn-primary");
    addClic(button, pokemon);
    liItem.appendChild(button);
    unorderedList.appendChild(liItem);
  }

  function next () {
    const x = document.querySelector('#next-button');
    x.addEventListener("click", function () {
        console.log('xxx');
        return fetch(apiUrl)
        .then(function (response) {
        // apiUrl = response.json().next;
        return response.json();
        })
        .then(function(json){
            pokemonsList = [];
            apiUrl = json.next;
            // console.log(apiUrl);
            loadList().then(function () {
                getAll().forEach(function (pokemon) {
                    addListItem(pokemon);
                });
            });
        })
        .catch(function (e) {
        console.error(e);
        });
    });
  }


  // This function listens to a click and then it calls the function that will show the details if the pokemon
  function addClic(button, pokemon) {
    button.addEventListener("click", function () {
        pokemonUi.showDetails(pokemon);
    });
  }

  // This function will fetch the data from an external API, when fetched, it will include one by one the pokemons in the array pokemonList
  // Dependencies functions: add
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }


  return {
    getAll,
    add,
    filter,
    addListItem,
    addClic,
    loadList,
    next,
  };
})();

// Including all the pokemons into the repository with an external API
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

//Printing all pokemons with hight criteria
pokemonRepository.getAll();
pokemonRepository.next();



