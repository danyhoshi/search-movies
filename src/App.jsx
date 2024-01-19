import { useState } from "react";
import Searcher from "./components/Searcher";
import "./App.css";
import { Movies } from "./components/Movies";
import useMovies from "./hooks/useMovies";
function App() {
  const { mappedMovies } = useMovies();

  return (
    <>
      <Searcher />
      <Movies peliculas={mappedMovies} />
    </>
  );
}

export default App;
