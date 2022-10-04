//Creation of the array of pokemons
let pokemonRepository = (function (){
   
    let pokemonsList = [];
    
    function add(pokemon){
        let pokemonModel = {
            name: '',
            height: -1,
            types: []
        };
        // console.log("This are the objects for pokemon model")
        if(typeof(pokemon) === 'object' && JSON.stringify(Object.keys(pokemon)) === JSON.stringify(Object.keys(pokemonModel))){
            pokemonsList.push(pokemon);
        }else{
            console.log('The Pokemon: ' + pokemon + 'is not in the right format');
        }
    }
    
    function getAll(){
        return pokemonsList;
    }

    function filter(input){
        let filtered = pokemonsList.filter(pokemon => pokemon.name === input);
        console.log(filtered);
    }

    
    return{
        getAll: getAll,
        add: add,
        filter: filter
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

    //Including pokemons into the repository
    pokemonRepository.add(pokemon1);
    pokemonRepository.add(pokemon2);
    pokemonRepository.add(pokemon3);
    pokemonRepository.add(pokemon4);
    pokemonRepository.add(pokemon5);

    // forEach function

    pokemonRepository.getAll().forEach(function (pokemon){
    
        if(pokemon.height > 1 ){
            document.write(pokemon.name + ' (height: ' + pokemon.height + ') - Wow! That\'s big!!! <br>');
        }else{
            // document.write(pokemonsList[i].name + ' (height: ' + pokemonsList[i].height + ') \n');
            document.write(`${pokemon.name} (height: ${pokemon.height}) <br>`);
        }
        
    });

