import { FC, useEffect, useState } from "react"

import { MovieCard } from "./MovieCard";

import { MovieProps, GenreResponseProps } from '../App';
import { api } from "../services/api";

import '../styles/content.scss';

interface ContentProps {
  selectedGenreId: number;
}

const Content: FC<ContentProps> = ({ selectedGenreId }) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    async function getMovies() {
      try {
        const resMovies = await api.get<MovieProps[]>(`/movies?Genre_id=${selectedGenreId}`);
        const resGenres = await api.get<GenreResponseProps>(`/genres/${selectedGenreId}`);
        setMovies(resMovies.data);
        setSelectedGenre(resGenres.data);
      } catch (error) {
        console.log('passou')
      }
    }

    getMovies();
  }, [selectedGenreId]);

  return (
    <div className="container">
      <header>
        <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie, index) => (
            <MovieCard
              key={index}
              title={movie.Title} 
              poster={movie.Poster} 
              runtime={movie.Runtime} 
              rating={movie.Ratings[0].Value} 
            />
          ))}
        </div>
      </main>
    </div>
  )
}

export default Content;