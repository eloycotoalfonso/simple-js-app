//Creation of the array of pokemons
let pokemonsList = [];


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
// console.log(pokemonsList);

//Loop that iterates ovr the pokemonList items:
for (let i = 0; i < pokemonsList.length; i++){
    // document.write(pokemonsList[i].name + ' (height: ' + pokemonsList[i].height + ') \\n');
    document.write(`\n ${pokemonsList[i].name} (height: ${pokemonsList[i].height}) `);
}