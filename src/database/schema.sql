CREATE DATABASE moviesdb;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS movies (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  overview VARCHAR NOT NULL,
  release_date VARCHAR NOT NULL,
  was_used BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS movie_of_day (
  id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  movie_id UUID NOT NULL,
  clues VARCHAR[4] NOT NULL,
  FOREIGN KEY(movie_id) REFERENCES movies(id)
);
