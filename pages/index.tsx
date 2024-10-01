import { useState, useEffect } from 'react';
import Image from 'next/image'
import Search from './Search';
import logo from './pokedex_logo.png'
import axios from 'axios';
import styles from './index.module.css';
import './globals.css';
import PokemonCard from './PokemonCard';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cardsLoaded, setCardsLoaded] = useState(0);
  const [filteredPokemons, setFilteredPokemons] = useState(pokemons);

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=2000');
      setPokemons(response.data.results);
    };

    fetchPokemons();
  }, []);

  useEffect(() => {
    console.log("Length : " + pokemons.length);
    console.log("Loaded : " + cardsLoaded);
    if (pokemons.length > 0 && (cardsLoaded === pokemons.length)) {
      setIsLoading(false);
      console.log("ALL LOADED.");
    }
  }, [cardsLoaded, pokemons.length]);

  const handleSearch = (search) => {
    const filtered = pokemons.filter(pokemon =>
      pokemon && (
        (pokemon.id && pokemon.id.toString().includes(search))
      )
    );
    const sortedFiltered = filtered.sort((a, b) => a.id - b.id);

    setFilteredPokemons(sortedFiltered);
  };

  return (
    <div>
      {isLoading && (
        <div className={styles.loadingScreen}>
          <p>Loading...</p>
        </div>
      )}
      <div className={styles.bg}>
      </div>
      <div className={styles.nav}>
        <Image src={logo} className={styles.logo} alt="logo" />
        <Search pokemons={pokemons} onSearch={handleSearch} />

      </div>
      <div className={styles.DEX}>
      </div>
      <div className={styles.dex}>
        {pokemons.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} onCardLoad={() => setCardsLoaded(prev => prev + 1)} />
        ))}
      </div>
    </div>
  );
}