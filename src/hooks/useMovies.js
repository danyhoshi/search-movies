import { useState, useEffect, useRef } from "react";
import { searchMovies } from "../services/movies";

export function useMovies(search) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const previusSearch = useRef(search);
  console.log("search, prevSearch ", search, previusSearch);
  const getMovies = async () => {
    if (search === previusSearch.current) {
      return;
    } // si el search actual es igual al search anterior, no hagas busqueda
    try {
      setLoading(true);
      setError(null);
      previusSearch.current = search;
      const newMovies = await searchMovies(search);
      setMovies(newMovies);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { movies, loading, getMovies };
}
