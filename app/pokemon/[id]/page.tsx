'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'
import axios from 'axios';
import logo from './pokedex_logo.png'
import arrow from './arrow.png'
import styles from './page.module.css';
import './globals.css';

export default function PokemonDetailsPage() {
  const pathname = usePathname();
  const [pokemonData, setPokemonData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const pathSegments = pathname.split('/');
      const pokemonId = pathSegments[pathSegments.length - 1];

      if (pokemonId) {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
          setPokemonData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching Pokemon data:", error);
        }
      }
    };

    fetchPokemonData();
  }, [pathname]);

  const currentPokemonId = parseInt(pathname.split('/').pop());
  const nextPokemonId = currentPokemonId + 1;
  const prevPokemonId = currentPokemonId - 1;

  if (!pokemonData) return <div className={styles.loadingScreen}>
    Loading...
  </div>;



  return (
    <div>
      <div className={styles.bg}>
      </div>

      <div className={styles.nav}>
        <Link href="/">
          <Image src={logo} className={styles.logo} alt="logo" />
        </Link>
      </div>
      <div className={styles.container}>

        <div className={styles.dex}>
          <div className={styles.leftside}>
            <div className={styles.pokemoninfo}>
              <div >
                <img src={pokemonData.sprites.front_default} className={styles.pokemonimage} alt={pokemonData.name} />
              </div>
              <div>
                <h3>Type</h3>
                <div className={styles.pokemontypes}>
                  {pokemonData.types.map((type, index) => (
                    <span
                      key={index}
                      className={styles.type}
                      data-type={type.type.name.toLowerCase()}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.middleside}>
            <div>
              <h2>{pokemonData.name} # {pokemonData.id.toString().padStart(3, '0')}</h2>
              <h3>Height:</h3>
              <p>{(pokemonData.height / 10).toFixed(1)} m</p>
            </div>

            <div>
              <h3>Weight:</h3>
              <p>{(pokemonData.weight / 10).toFixed(1)} kg</p>
            </div>

            <div>
              <h3>Abilities:</h3>
              <ul>
                {pokemonData.abilities.map((ability, index) => (
                  <li key={index}>
                    {ability.ability.name} {ability.is_hidden && '(hidden ability)'}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.rightside}>
            <div className={styles.pokemonstats}>
              <h3>Stats</h3>
              {pokemonData.stats.map((stat, index) => (
                <div key={index}>
                  <p>{stat.stat.name}: {stat.base_stat}</p>
                  <div className={styles.statbar}>
                    <div
                      className={styles.statbarfill}
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
        <div className={styles.arrow}>
          {prevPokemonId > 0 ? (
            <Link href={`/pokemon/${prevPokemonId}`}>
              <Image src={arrow} className={styles.arrowleft} alt="arrow" />
            </Link>
          ) : (
            <span>
              <Image src={arrow} className={styles.arrowleftDisabled} alt="arrow" />
            </span>
          )}
          {nextPokemonId <= 1025 && (
            <Link href={`/pokemon/${nextPokemonId}`}>
              <Image src={arrow} className={styles.arrowright} alt="arrow" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}