import { useState, useRef } from "react";
import Searcher from "./components/Searcher";
import "./App.css";
import { Movies } from "./components/Movies";
import useMovies from "./hooks/useMovies";
function App() {
  const { mappedMovies } = useMovies();
  const counter = useRef(0);
  counter.current++;
  console.log("counter: ", counter.current);
  return (
    <>
      <Searcher />
      <Movies peliculas={mappedMovies} />
    </>
  );
}

export default App;
