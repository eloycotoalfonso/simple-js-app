//Creation of the array of pokemons
let pokemonRepository = (function (){
   
    let pokemonsList = [];
    
    function add(pokemon){
        pokemonsList.push(pokemon);
    }
    function getAll(){
        return pokemonsList;
    }
    
    return{
        getAll: getAll,

        add: add
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

    //Including pokemons into the repository
    pokemonRepository.add(pokemon1);
    pokemonRepository.add(pokemon2);
    pokemonRepository.add(pokemon3);

    // for.each function

    pokemonRepository.getAll().forEach(function (pokemon){
    
        if(pokemon.height > 1 ){
            document.write(pokemon.name + ' (height: ' + pokemon.height + ') - Wow! That\'s big!!! <br>');
        }else{
            // document.write(pokemonsList[i].name + ' (height: ' + pokemonsList[i].height + ') \n');
            document.write(`${pokemon.name} (height: ${pokemon.height}) <br>`);
        }
        
    });

