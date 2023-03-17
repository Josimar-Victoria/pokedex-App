import React, { useEffect } from "react";
import Wrapper from "../sections/Wrapper";
import { getInitialPokemonData } from "../app/reducers/getInitialPokemonData";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getPokemonsData } from "../app/reducers/getPokemonsData";
import PokemonCardGrid from "../components/PokemonCardGrid";
import { debounce } from "../utils/debounce";

function Search() {
  const dispatch = useAppDispatch();
  const { allPokemon, randomPokemons } = useAppSelector(
    ({ pokemon }) => pokemon
  );

  // console.log(allPokemon);

  useEffect(() => {
    dispatch(getInitialPokemonData());
  }, [dispatch]);

  useEffect(() => {
    if (allPokemon) {
      const clonedPokemons = [...allPokemon];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
      // console.log(randomPokemonsId)
    }
  }, [allPokemon, dispatch]);

  const getPokemon = async (value: string) => {
    if (value.length) {
      const pokemons = allPokemon?.filter((pokemon) =>
        pokemon.name.includes(value.toLowerCase())
      );
      // console.log(pokemons);
      dispatch(getPokemonsData(pokemons!));
    } else {
      const clonedPokemons = [...(allPokemon as [])];
      const randomPokemonsId = clonedPokemons
        .sort(() => Math.random() - Math.random())
        .slice(0, 20);
      dispatch(getPokemonsData(randomPokemonsId));
    }
  };

  const handleChange = debounce((value: string) => getPokemon(value), 300);

  // console.log(getPokemon)

  return (
    <>
      <div className="search">
        <input
          type="text"
          className="pokemon-searchbar"
          name="search"
          id="search"
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Search the Pokedex"
        />

        <PokemonCardGrid pokemons={randomPokemons!} />
      </div>
    </>
  );
}

export default Wrapper(Search);
