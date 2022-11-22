const pokemonUi = (function (){
    
    // This function, when callled, will show the details of the pokemon (event listener click)
    // Dependencies functions: loadDetails
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
          showPokemonModal(pokemon);
        });
    }
    //When called this function will return the information with the given pokemon
     function loadDetails(item) {
        let url = item.detailsUrl;
        console.log(url);
        return fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (details) {
            item.imageUrl = details.sprites.other.dream_world.front_default;
            // console.log = details.sprites
            item.height = details.height + " m";
            item.types = get_types(details);
            item.weight = details.weight + " kg";
            item.abilities = get_abilities(details);
        })
        .catch(function (e) {
            console.error(e);
        });
    }

    function showPokemonModal(pokemon) {
        //Define modal body and title
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        // let modalHeader = $('.modal-header');

        //Clear existing information
        modalTitle.empty();
        modalBody.empty();

        //Create the different elements inside the modal
        const pokemonName = $("<h1>" + pokemon.name + "</h1>");
        const imagePokemon = $('<img class = "modal-image" style = "widht:50%">');

        const heightPokemon = $("<p>" + "Height: " + pokemon.height + "</p>");
        const weightPokemon = $("<p>" + "Weight: " + pokemon.weight + "</p>");
        const typesPokemon = $("<p>" + "Types: " + pokemon.types + "</p>");
        const abilitiesPokemon = $(
        "<p>" + "Abilities: " + pokemon.abilities + "</p>"
        );

        //append the different elements into the modal
        imagePokemon.attr("src", pokemon.imageUrl);
        modalTitle.append(pokemonName);
        modalBody.append(imagePokemon);
        modalBody.append(heightPokemon);
        modalBody.append(weightPokemon);
        modalBody.append(typesPokemon);
        modalBody.append(abilitiesPokemon);
    }

    function get_types(details){
        let x = '';
        details.types.forEach((element) =>{
            x += element.type.name + ", ";
        })
        x = x.slice(0, -2);
        return x;
      }
    
      function get_abilities(details){
        let x = '';
        details.abilities.forEach((element) =>{
            x += element.ability.name + ", ";
        })
        x = x.slice(0, -2);
        return x;
      }

    return {
        showDetails,
        loadDetails,
    };
})();
