import React, { useEffect, useRef, useState } from "react";
import { userSearch } from "../hooks/useMovies";

function Searcher() {
  // const inputRef = useRef();

  // const [query, setQuery] = useState("");
  // const [error, setError] = useState(null);
  const { search, updateSearch, error } = userSearch(); // custome Hook
  const counter = useRef(0);
  counter.current++;
  console.log("counterSearcher: ", counter.current);
  const handleSubmit = (event) => {
    event.preventDefault();
    //USANDO REACT DE FORMA CONTROLADA
    console.log(search);
    //USANDO EL DOM Y DE FORMA NO CONTROLADA
    // const input = inputRef.current;
    // const valorInput = input.value;
    // const fields = new window.FormData(event.target); // sacar los campos del formulario, event.target es el formulario porque es lo que viene el onSubmit
    //const fields = Object.fromEntries(new window.FormData(event.target)); //creo un objeto de todos los campos del form
    // console.log(fields); //Object { query: "algo", otro: "Harry", otroMas: "Ron" }
    // console.log(fields.get("query"));
  };
  const handleChange = (event) => {
    if (event.target.value.startsWith(" ")) return; //prevalidacion
    updateSearch(event.target.value);
  };
  // useEffect(() => {
  //   if (query === "") {
  //     console.log("aqui");
  //     setError(" No se puede buscar una película vacía");
  //     return;
  //   }
  //   if (query.match(/^\d+$/)) {
  //     setError("No se puede buscar una película con sólo números");
  //     return;
  //   }
  //   if (query.length < 3) {
  //     setError("La búsqueda debe tener al menos 3 caracteres");
  //     return;
  //   }
  //   setError(null);
  // }, [query]);

  return (
    <header className="searcher">
      <form action="" onSubmit={handleSubmit}>
        <input
          className="input-searcher"
          // ref={inputRef}
          style={{
            border: "solid 1px transparent",
            borderColor: error ? "red" : "transparent",
          }}
          onChange={handleChange}
          type="text"
          name="search"
          placeholder="Harry Potter and the Sorcerer's Stone"
          value={search}
        />

        {/* <input
          className="input-searcher"
          type="text"
          name="otro"
          placeholder="Harry Potter"
        />
        <input
          className="input-searcher"
          type="text"
          name="otroMas"
          placeholder="Ron Weasly"
        /> */}
        <button type="submit">search</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </header>
  );
}

export default Searcher;
