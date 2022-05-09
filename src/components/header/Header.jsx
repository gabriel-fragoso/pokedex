import React, { useState } from "react";
import './styles.scss'
import { toast, ToastContainer } from 'react-toastify';
import axios from "axios";

import searchImg from '../../assets/search.png'

function Header({ getResults }) {
  const [input, setInput] = useState("");

  function submit(e) {
    e.preventDefault()

      axios.get(`https://pokeapi.co/api/v2/pokemon/${input.toLowerCase()}/`).then((resp) => {
        getResults(resp.data)
        toast.success(`${input.toUpperCase()} encontrado com sucesso`)
      })
      .catch( error => {
        toast.error(`${input.toUpperCase()} não encontrado.`)
      } )
  }

  return (
    <header className="header">
      <h1>Pokedex</h1>

      <div className="input-container">
        <img src={searchImg} alt="Icone de lupa" />
        <form onSubmit={(e) => submit(e)}>
          <input
          type="text"
          name="pokemon"
          placeholder="Search a pokemon..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        </form>
      </div>
      <ToastContainer 
        text-transform="uppercase"
      />
    </header>
  );
}

export default Header;
