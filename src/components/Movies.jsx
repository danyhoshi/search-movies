import React from "react";
import withresult from "../mocks/with-result.json";
import withoutresult from "../mocks/without-result.json";

// function NoMoviesResult() {
//   return <p>No se encontraron películas para su búsqueda</p>;
// }
export function Content({ peliculas }) {
  // console.log("cantidad de peliculas en movies ", peliculas.Search[0].poster);
  return (
    <main className="listMovies">
      <ul className="movies">
        {peliculas.map((p) => {
          return (
            <li className="movie" key={p.id}>
              <h2>{p.title}</h2>
              <p>{p.year}</p>
              <img src={p.poster} alt={p.title} />
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export function NoResult() {
  return (
    <p style={{ textAlign: "center" }}>Not found movies for this search...</p>
  );
}

export function Movies({ peliculas }) {
  // console.log(peliculas);
  const hasMovies = peliculas?.length > 0;
  // console.log("Has movies, ", hasMovies);
  return hasMovies ? <Content peliculas={peliculas} /> : <NoResult />;
}
