import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from './index.module.css';


const PokemonCard = ({ pokemon, onCardLoad }) => {
  const [pokemonData, setPokemonData] = useState(null);
  
  const router = useRouter();

  useEffect(() => {
    const fetchPokemonData = async () => {
      const response = await axios.get(pokemon.url);
      setPokemonData(response.data);
    };

    fetchPokemonData().then(() => {
      onCardLoad();
    });
  }, [pokemon.url]);

  if (!pokemonData) return <div>Loading...</div>;

  const handleClick = () => {
    router.push(`/pokemon/${pokemonData.id}`);
  };

  return (
    <div className={styles.PokemonCard} onClick={handleClick}>
      <img className={styles.Sprite} src={pokemonData.sprites.front_default} alt={pokemonData.name} />
      <p className={styles.PokemonID}># {pokemonData.id.toString().padStart(4, '0')}</p>
      <h3>{pokemonData.name}</h3>
      <div className="type-badges">
        {pokemonData.types.map((type, index) => (
          <span key={index} className={styles.type} data-type={type.type.name.toLowerCase()}> {type.type.name} </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;