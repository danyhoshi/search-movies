import { useState, useRef, useEffect } from "react";
import Searcher from "./components/Searcher";
import "./App.css";
import { Movies } from "./components/Movies";
import { useMovies, useSearch } from "./hooks/useMovies";

function App() {
  const { search, updateSearch, error } = useSearch(); // custome Hook

  const { movies, loading, getMovies } = useMovies(search);

  return (
    <>
      <Searcher
        search={search}
        error={error}
        updateSearch={updateSearch}
        getMovies={getMovies}
      />
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading ...</p>
      ) : (
        <Movies peliculas={movies} />
      )}
    </>
  );
}

export default App;
