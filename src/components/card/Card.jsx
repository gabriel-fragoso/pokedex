import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from "axios";

import Modal from "../modal/Modal";

function Card({ name, url }) {
  const [pokemon, setPokemon] = useState();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((resp) => {
      setPokemon(resp.data);
    });
  }, [url]);
  return (
    <>
      <div className="card" id={name} onClick={() => setIsOpen(true)}>
        <div className="name">{name}</div>
        <img src={pokemon?.sprites.front_default} alt="Pokemon sprite" />
        <div className="types">{pokemon?.types[0].type.name}</div>
      </div>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <img src={pokemon?.sprites.front_default} alt="Pokemon sprite" />
        <table>
          <tbody>
            <tr>
              <td className="names">Name:</td>
              <td className="resposta">{name}</td>
            </tr>
            <tr>
              <td className="names">Weight:</td>
              <td className="resposta">{pokemon?.weight}</td>
            </tr>
            <tr>
              <td className="names">Type:</td>
              <td className="resposta">{pokemon?.types[0].type.name}</td>
            </tr>
            <tr>
              <td className="names">Basic Experience:</td>
              <td className="resposta">{pokemon?.base_experience}</td>
            </tr>
            <tr>
              <td className="names">Height:</td>
              <td className="resposta">{pokemon?.height}</td>
            </tr>
          </tbody>
        </table>
      </Modal>
    </>
  );
}

export default Card;
