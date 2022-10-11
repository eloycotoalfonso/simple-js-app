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
        // let unorderedList = document.querySelector('.pokemon-list');
        let unorderedList = document.querySelector('.list-group');
        let liItem = document.createElement('li');
        liItem.classList.add('group-list-item');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.setAttribute("data-toggle", 'modal');
        button.setAttribute("data-target", '#pokemon-modal');
        // button.classList.add('pokebutton');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        addClic(button, pokemon);
        liItem.appendChild(button);
        unorderedList.appendChild(liItem);
    }

    // This function, when callled, will show the details of the pokemon (event listener click)
    // Dependencies functions: loadDetails
    function showDetails(pokemon){
        loadDetails(pokemon).then(function () {
            showPokemonModal(pokemon);
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

    //When called this function will return the information with the given pokemon
    function loadDetails(item) {
        let url = item.detailsUrl;
        console.log(url);
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = [];
            let x = '';
            details.types.forEach(element =>{x += element.type.name + ', '});
            x = x.slice(0,-2);
            item.weight = details.weight;
            let y = '';
            details.abilities.forEach(element => {y += element.ability.name + ', '});
            y = y.slice(0,-2);

            item.types = x;
            item.abilities = y;



            


        // Now we add the details to the item
        //    let image = modalContainer.querySelector('.modal-image');
        //    let modalDetails = modalContainer.querySelector('.modal-details');
        //    let modalDetails = modalContainer.querySelector('.modal');
        //    let detailsHeight = document.createElement('p');
        //    let detailsTypes = document.createElement('p');
           
        //    image.src = details.sprites.front_default;
        //    detailsHeight.innerText = 'Height: ' + details.height;
        //    let x = '';
        //    details.types.forEach(element =>{x += element.type.name + ', '});
        //    x = x.slice(0,-2);
        //    detailsTypes.innerText = 'Types: ' + x + '.'; /*details.types.forEach(detail => detail.name);*/
        //    console.log(details.types);
        //   item.imageUrl = details.sprites.front_default;
        //   item.height = details.height;
        //   item.types = details.types;

            // modalDetails.appendChild(detailsHeight);
            // modalDetails.appendChild(detailsTypes);
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showPokemonModal(pokemon){

        //Define modal body and title
        let modalBody = $('.modal-body');
        let modalTitle  = $('.modal-title');
        // let modalHeader = $('.modal-header');

        //Clear existing information
        modalTitle.empty();
        modalBody.empty();

        //Create the different elements inside the modal
        let pokemonName = $('<h1>' + pokemon.name + '</h1>');
        let imagePokemon = $('<img class = "modal-image" style = "widht:50%">');
        let heightPokemon = $("<p>" + "Height: " + pokemon.height + "</p>");
        let weightPokemon = $("<p>" + "Weight: " + pokemon.weight + "</p>");
        let typesPokemon = $("<p>" + "Types: " + pokemon.types + "</p>");
        let abilitiesPokemon = $("<p>" + "Abilities: " + pokemon.abilities + "</p>");
        

        //append the different elements into the modal
        imagePokemon.attr('src', pokemon.imageUrl);
        modalTitle.append(pokemonName);
        modalBody.append(imagePokemon);
        modalBody.append(heightPokemon);
        modalBody.append(weightPokemon);
        modalBody.append(typesPokemon);
        modalBody.append(abilitiesPokemon);


    
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
    };
})();


    // Including all the pokemons into the repository with an external API
    pokemonRepository.loadList().then(function(){
        pokemonRepository.getAll().forEach(function(pokemon){
            pokemonRepository.addListItem(pokemon);
        });
    });

    //Printing all pokemons with hight criteria
    pokemonRepository.getAll();