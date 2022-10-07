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
    }

    // This function, when callled, will show the details of the pokemon (event listener click)
    // Dependencies functions: loadDetails
    function showDetails(pokemon){
        showPokemonModal(pokemon);
        loadDetails(pokemon).then(function(){
            // console.log(pokemon.height);
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
          
           // Now we add the details to the item
           let image = modalContainer.querySelector('.modal-image');
        //    let modalDetails = modalContainer.querySelector('.modal-details');
           let modalDetails = modalContainer.querySelector('.modal');
           let detailsHeight = document.createElement('p');
           let detailsTypes = document.createElement('p');
           
           image.src = details.sprites.front_default;
           detailsHeight.innerText = 'Height: ' + details.height;
           let x = '';
           details.types.forEach(element =>{x += element.type.name + ', '});
           x = x.slice(0,-2);
           detailsTypes.innerText = 'Types: ' + x + '.'; /*details.types.forEach(detail => detail.name);*/
           console.log(details.types);
        //   item.imageUrl = details.sprites.front_default;
        //   item.height = details.height;
        //   item.types = details.types;

            modalDetails.appendChild(detailsHeight);
            modalDetails.appendChild(detailsTypes);
        }).catch(function (e) {
          console.error(e);
        });
    }

    function showPokemonModal(pokemon){
        //Set up the basic structure of the modal
        modalContainer.classList.add('is-visible');
        modalContainer.innerHTML = '';
        
        

        //Define the variables of the elements inside the modal
        let modal = document.createElement('div');
        let closeButton = document.createElement('button');
        let pokemonName = document.createElement('h1');
        // let pokemonDetails = document.createElement('div');
        let pokemonImage = document.createElement('img');

        //Define the class for the elements (if applies) 
        modal.classList.add('modal');
        closeButton.classList.add('modal-close');
        pokemonImage.classList.add('modal-image');
        // pokemonDetails.classList.add('modal-details');

        //Define the source for the pokemon image
        pokemonImage.src = "https://via.placeholder.com/50";
    
        //Define the text for the different elements (if applies)
        closeButton.innerText = "close";
        pokemonName.innerText = pokemon.name;
        // pokemonDetails.innerText = "";

        //Assigning other properties such as event listeners
        closeButton.addEventListener('click', hidePokemonModal);

        //Append each of the element to it's corresponding parent
        modal.appendChild(closeButton);
        modal.appendChild(pokemonName);
        // modal.appendChild(pokemonDetails);
        modal.appendChild(pokemonImage);
        modalContainer.appendChild(modal);

        modalContainer.addEventListener('click', (e)=>{
            let target = e.target;
            if(target === modalContainer){
                hidePokemonModal();
            }
        })
    }

    function hidePokemonModal(){
        modalContainer.classList.remove('is-visible');
    }

    window.addEventListener('keydown', (e)=>{
        if(e.key === 'Escape' && modalContainer.classList.contains('is-visible')){
            hidePokemonModal();
        }
    });


    return{
        getAll: getAll,
        add: add,
        filter: filter,
        addListItem: addListItem,
        showDetails: showDetails,
        addClic: addClic,
        loadList: loadList,
        loadDetails: loadDetails
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