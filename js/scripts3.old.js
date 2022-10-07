//Creation of the array of pokemons
let pokemonRepository = (function (){
   
    let pokemonsList = [];
    let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
    let modalContainer = document.querySelector("#modal-container");

    // When it's called, this function adds the pokemon "pokemon" object into the pokemon array
    function add(pokemon){
        let validKeyNames = ['name', 'detailsUrl'];
        // console.log("This are the objects for pokemon model")
        // if(typeof(pokemon) === 'object' && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(Object.keys(pokemonModel))){
        if(typeof(pokemon) === 'object' && Object.keys(pokemon).every(keyName => validKeyNames.includes(keyName))){
            pokemonsList.push(pokemon);
        }else{
            console.log('The Pokemon: ' + pokemon + 'is not in the right format');
        }
    }
    
    // When it's called, this function will print the pokemon list in the browser window
    //  Dependencies functions: addListItem
    function getAll(){
        pokemonsList.forEach(function (pokemon){
           addListItem(pokemon);

            // if(pokemon.height > 1 ){
                // document.write(pokemon.name + ' (height: ' + pokemon.height + ') - Wow! That\'s big!!! <br>');
            // }else{
                // document.write(pokemonsList[i].name + ' (height: ' + pokemonsList[i].height + ') \n');
                // document.write(`${pokemon.name} (height: ${pokemon.height}) <br>`);
            // }    
        });
        return pokemonsList;
    }

    // This function will filter the pokemon and log it in the console if the pokemon exists in the pokemonList array
    function filter(input){
        let filtered = pokemonsList.filter(pokemon => pokemon.name === input);
        console.log(filtered);
    }

    // When called this function will include in a list the pokemon passed as an argument to the browser.
    function addListItem (pokemon){
        let unorderedList = document.querySelector('.pokemon-list');
        let liItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('pokebutton');
        addClic(button, pokemon);
        liItem.appendChild(button);
        unorderedList.appendChild(liItem);

            // if(pokemon.height > 1 ){
                // document.write(pokemon.name + ' (height: ' + pokemon.height + ') - Wow! That\'s big!!! <br>');
            // }else{
                // document.write(pokemonsList[i].name + ' (height: ' + pokemonsList[i].height + ') \n');
                // document.write(`${pokemon.name} (height: ${pokemon.height}) <br>`);
            // }
    }

    // This function, when callled, will show the details of the pokemon (event listener click)
    // Dependencies functions: loadDetails
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(){
            showPokemonModal(pokemon);
            console.log(pokemon);
        });
    }

    // This function listens to a click and then it calls the function that will show the details if the pokemon
    function addClic(button, pokemon){
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
          });

    }

    // This function will fetch the data from an external API, when fetched, it will include one by one the pokemons in the array pokemonList
    // Dependencies functions: add
    function loadList(){
        return fetch(apiUrl).then(function(response){
            return response.json();
        }).then(function (json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        console.log(url);
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
          // Now we add the details to the item
          console.log(details.sprites.front_default);
          console.log(details.height);
          console.log(details.types);
        //   item.imageUrl = details.sprites.front_default;
        //   item.height = details.height;
        //   item.types = details.types;
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showPokemonModal(pokemon){
        //Set up the basic structure of the modal
        modalContainer.classList.add('is-visible');
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        //Define the variables of the elements inside the modal
        let closebutton = document.createElement('button');
        let pokemonName = document.createElement('h1');
        let pokemonDetails = document.createElement('p');
        let pokemonImage = document.createElement('img');

        //Define the class for the elements (if applies) 
        closebutton.classList.add('modal-close');
        pokemonImage.classList.add('modal-image');

        //Define the source for the pokemon image
        pokemonImage.src = "https://via.placeholder.com/50";
    
        //Define the text for the different elements (if applies)
        closebutton.innerText = "close";
        pokemonName.innerText = pokemon.name;
        pokemonDetails.innerText = pokemon.height;


        //Append each of the element to it's corresponding parent
        modal.appendChild(closebutton);
        modal.appendChild(pokemonName);
        modal.appendChild(pokemonDetails);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);
    }

    function hidePokemonModal(){
        modalContainer.classList.remove('is-visible');
    }



    return{
        getAll: getAll,
        add: add,
        filter: filter,
        addListItem: addListItem,
        showDetails: showDetails,
        addClic: addClic,
        loadList: loadList,
        loadDetails: loadDetails,
        showPokemonModal: showPokemonModal,
        hidePokemonModal: hidePokemonModal
    };
})();



    //creating the objects for each of the pokemons
    let pokemon1 = {
        name: 'Butterfree',
        height: 1.1,
        types: ['bug', 'flying']
    }

    let pokemon2 = {
        name: 'Geodude',
        height: 0.4,
        types: ['rock', 'ground']
    }

    let pokemon3 = {
        name: 'Magneton',
        height: 1,
        types: ['electric', 'steel']
    }

    //Both this pokemon shouldn't go through the add function
    let pokemon4 = "Bulbasour";
    let pokemon5 = {
        name: "x",
        heig: 2.2,
        types:['a','b']
    }

    /* Here the pokemons are included one by one
    //Including pokemons into the repository
    pokemonRepository.add(pokemon1);
    pokemonRepository.add(pokemon2);
    pokemonRepository.add(pokemon3);
    pokemonRepository.add(pokemon4);
    pokemonRepository.add(pokemon5);
    */
    
    // Including all the pokemons into the repository with an external API
    pokemonRepository.loadList().then(function(){
        pokemonRepository.getAll().forEach(function(pokemon){
            pokemonRepository.addListItem(pokemon);
        });
    });

    //Printing all pokemons with hight criteria
    pokemonRepository.getAll();