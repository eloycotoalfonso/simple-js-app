//Creation of the array of pokemons
let pokemonsList = [];


//creating the objects for each of the pokemons
let Pokemon1 = {
    name: 'Butterfree',
    height: 1.1,
    type: ['bug', 'flying']

}

let Pokemon2 = {
    name: 'Geodude',
    height: 0.4,
    type: ['rock', 'ground']

}

let Pokemon3 = {
    name: 'Magneton',
    height: 1,
    type: ['electric', 'steel']

}

//Including pokemons into the array
pokemonsList.push(Pokemon1);
pokemonsList.push(Pokemon2);
pokemonsList.push(Pokemon3);

//Display the arrays of pokemons
console.log(pokemonsList);