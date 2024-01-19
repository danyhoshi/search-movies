import React from "react";

function Content({ peliculas }) {
  return (
    <main>
      {peliculas.map((p) => {
        return (
          <div key={p.ImdbID}>
            <h2>{p.Title}</h2>
            <p>{p.Year}</p>
            <p>{p.Type}</p>
            <img src={p.Poster} alt={p.Title} />
          </div>
        );
      })}
    </main>
  );
}

export default Content;
