import React, { useState, useEffect } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import "./app.scss";
import arrowImg from "./assets/arrow.png";
import Header from "./components/header";
import Card from "./components/card/Card";
import axios from "axios";

function App() {
  const [data, setData] = useState();
  const [page, setPage] = useState(0);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
      .then((resp) => {
        setData(resp.data);
      });
  }, []);

  useEffect(() => {
    if (page === -1) setPage(0)
    axios
    .get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${page * 20}`)
    .then((resp) => {
      setData(resp.data);
    });
  }, [page]);

  function getResults(result){
    setData({results: [result]})
  }

  function renderCards() {
    return data?.results.map((pokemon) => {
      return <Card name={pokemon.name} url={pokemon.url} />;
    });
  }

  return (
    <div className="App">
      <Header getResults={getResults}/>
      <div className="card-container">{renderCards()}</div>
      <div className="btn-container">
        <button onClick={() => setPage(page - 1)}>
          <img src={arrowImg} alt="seta" />
        </button>
        <div className="display">{page}</div>
        <button onClick={() => setPage(page + 1)}>
          <img src={arrowImg} alt="" />
        </button>
      </div>
    </div>
  );
}

export default App;
