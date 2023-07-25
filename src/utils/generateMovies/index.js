import fetch from "node-fetch";
import fs from "fs";

const movies = [];

const getMovies = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.APP_MOVIE_DB_AUTH}`,
    },
  };

  const fetchMovies = async (pageIndex) => {
    const res = await fetch(`${url}?page=${pageIndex}`, options);
    const data = await res.json();
    return data.results;
  };

  const numPages = 45;
  const fetchPromises = [];
  for (let index = 1; index <= numPages; index++) {
    fetchPromises.push(fetchMovies(index));
  }

  const resultsArray = await Promise.all(fetchPromises);
  const updatedArray = resultsArray.flat();
  movies.push(...updatedArray);

  const simplifiedMovies = movies.reduce((acc, movie, index) => {
    const { overview, release_date, title } = movie;
    const formattedMovie = `('${title.replace(
      /'/g,
      "''"
    )}', '${overview.replace(/'/g, "''")}', '${release_date}')`;

    if (index === 0) {
      return (acc += `INSERT INTO movies(title, overview, release_date) VALUES\n  ${formattedMovie}`);
    } else {
      return (acc += `,\n  ${formattedMovie}`);
    }
  }, "\n");

  const sqlScript = simplifiedMovies + ";";

  if (!fs.existsSync("./movies.sql")) {
    fs.writeFile("movies.sql", sqlScript, (err) => {
      if (err) {
        console.error("Erro ao escrever o arquivo script.sql:", err);
      } else {
        console.log("O arquivo script.sql foi criado com sucesso!");
      }
    });
  }
};

getMovies();
