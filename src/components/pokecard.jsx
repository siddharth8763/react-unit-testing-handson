import React from 'react';
import { Link } from 'react-router-dom';

export default function Pokecard(props) {
  return (
    <li data-testid={`pokecard-${props.id}`} className="li">
      <figure className="pokimg">
        <Link  data-testid={`link-${props.num}`} to={'/details/' + props.id}>
          <img className='.pok-card-image' src={props.img} alt={`pok-image`} />
        </Link>
      </figure>
      <div className="pok-info">
        <p data-testid="pokid" className="pok-id">#{props.num}</p>
        <h5 data-testid="pokname" className="pok-name">{props.name}</h5>
        <div className="abilities">
          {props.type.map((t, tindex) => (
            <span
              key={`ability-${tindex}`}
              className={`pill background-color-${t.toLowerCase()}`}
              id = {`ability${t}`}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}
