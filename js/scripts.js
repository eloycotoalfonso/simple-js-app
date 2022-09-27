//Creation of the array of pokemons
let pokemonsList = [];


//creating the objects for each of the pokemons
let pokemon1 = {
    name: 'Butterfree',
    height: 1.1,
    type: ['bug', 'flying']

}

let pokemon2 = {
    name: 'Geodude',
    height: 0.4,
    type: ['rock', 'ground']

}

let pokemon3 = {
    name: 'Magneton',
    height: 1,
    type: ['electric', 'steel']

}

//Including pokemons into the array
pokemonsList.push(pokemon1);
pokemonsList.push(pokemon2);
pokemonsList.push(pokemon3);


/*Alternative way of adding the pokemons to the array
pokemonsList[0] = pokemon1;
pokemonsList[1] = pokemon2;
pokemonsList[2] = pokemon3;
*/

//Display the arrays of pokemons
console.log(pokemonsList);