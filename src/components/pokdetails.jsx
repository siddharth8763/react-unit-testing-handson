import React, { Component, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Pokecard from './pokecard';

import config from '../config.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';

export default function PokDetails() {
  let { pokId } = useParams();
  const [pok, setPok] = useState({});
  const [prev_evolution, setPrev_evolution] = useState([]);
  const [next_evolution, setNext_evolution] = useState([]);

  useEffect(() => {
    fetch(config.dataUrl)
      .then((response) => response.json())
      .then(async(json) => {
        setPrev_evolution([]);
        setNext_evolution([]);
        let selectedPok = json.pokemon.find((pok) => pok.id == pokId);

        if (selectedPok.prev_evolution && selectedPok.prev_evolution.length) {
          let prevEvolutionNumArr = selectedPok.prev_evolution.map(
            (po) => po.num
          );

          let preEvolution = json.pokemon.filter((pok) =>
            prevEvolutionNumArr.includes(pok.num)
          );
          setPrev_evolution(preEvolution);
        }

        if (selectedPok.next_evolution && selectedPok.next_evolution.length) {
          let nextEvolutionNumArr = selectedPok.next_evolution.map(
            (po) => po.num
          );

          let nextEvolution = json.pokemon.filter((pok) =>
            nextEvolutionNumArr.includes(pok.num)
          );
          setNext_evolution(nextEvolution);
        }

        setPok(selectedPok);
        global.scrollTo(0, 0)
      });
  }, [pokId]);

  return (
    <div id="pok-details-container" data-testid="pok-details-container">
      <div>
        <div id="pokIdName">
          {pok.name}
          <span data-testid="pok-details-pok-num" className="pokemon-number">#{pok.num}</span>
        </div>
        <section className="section pokedex-pokemon-details">
          <div className="column-6 push-1">
            {pok.img && <div key={`pok-profile-image-${pok.name}`} className="pokedex-pokemon-profile">
              <div className="profile-images">
                <img className="active" src={pok.img} alt={pok.name} />
              </div>
            </div>}

            <div className="abilities">
              <div className="height-weight">
                <div>
                  <div className="pokdetails-cat-title">Height</div>
                  <div className='pok-details-pok-height pokdetails-cat-value' data-testid="pok-details-pok-height">{pok.height}</div>
                </div>
                <div>
                  <div className="pokdetails-cat-title">Weight</div>
                  <div className='pok-details-pok-weight pokdetails-cat-value' data-testid="pok-details-pok-weight">{pok.weight}</div>
                </div>
              </div>

              <div className="pokdetails-cat-title">Type</div>
              <div className='abilities-pokdetails-type-container'>
              {pok.type &&
                pok.type.map((t, tind) => (
                  <span
                    data-testid={`pok-details-pok-types-${tind}`}
                    key={`pok-type-${tind}`}
                    className={`pill background-color-${t.toLowerCase()} pok-details-pokemon-type`}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="pokdetails-cat-title">Weaknesses</div>
              <div className='abilities-pokdetails-weakness-container'>
                {pok.weaknesses &&
                pok.weaknesses.map((t, tind) => (
                  <span
                    data-testid={`pok-details-pok-weaknesses-${tind}`}
                    key={`pok-weaknesses-${tind}`}
                    className={`pill background-color-${t.toLowerCase()} pok-details-pokemon-weakness`}
                  >
                    {t}
                  </span>
                ))}
                </div>
            </div>
          </div>
          <div className="evolution-container">
            <div className="evolution-title">Evolution</div>
            <div className="evolution-cards">
              <ul>
                {prev_evolution && prev_evolution.length ? (
                  prev_evolution.map((prePok, ind) => {
                    return (
                      <React.Fragment key={`evo-chevron-pre-${ind}`}>
                        <Pokecard {...prePok} />
                        <li                          
                          className="li-chevron"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </li>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <></>
                )}

                {pok && pok.type && (
                  <Pokecard key={`evo-pok-card-current`} {...pok} />
                )}
                {next_evolution && next_evolution.length ? (
                  next_evolution.map((prePok, ind) => {
                    return (
                      <React.Fragment key={`evo-pok-card-next-${ind}`}>
                        <li                          
                          className="li-chevron"
                        >
                          <FontAwesomeIcon icon={faChevronRight} />
                        </li>
                        <Pokecard                          
                          {...prePok}
                        />
                      </ React.Fragment>
                    );
                  })
                ) : (
                  <></>
                )}
              </ul>
            </div>
          </div>
          <Link className='backbtnlink' to={'/'}>
            <button  className="backbtn">
              <FontAwesomeIcon className='back-btn-chevron-left' icon={faChevronLeft} />
              Back To Home
            </button>
          </Link>
        </section>
      </div>
    </div>
  );
}
