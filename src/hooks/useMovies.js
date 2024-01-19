import withresult from "../mocks/with-result.json";
import withoutresult from "../mocks/without-result.json";

function useMovies() {
  const peliculas = withresult.Search;
  console.log(peliculas.length);
  const mappedMovies = peliculas?.map((movie) => ({
    id: movie.imdbID,
    title: movie.Title,
    year: movie.Year,
    poster: movie.Poster,
  }));
  return { mappedMovies };
}

export default useMovies;
