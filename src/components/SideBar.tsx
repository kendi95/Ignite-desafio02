import { FC, useEffect, useState } from "react";

import { Button } from "./Button";

import { api } from '../services/api';

import { GenreResponseProps } from '../App';

import '../styles/sidebar.scss';

interface SideBarProps {
  onSelectGenre: (genre_id: number) => void;
}

const SideBar: FC<SideBarProps> = ({ onSelectGenre }) => {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
    onSelectGenre(id);
  }

  useEffect(() => {
    async function getGenres() {
      const response = await api.get<GenreResponseProps[]>('/genres');
      setGenres(response.data);
    }

    getGenres();
  }, []);

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={genre.id}
            id={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}

export default SideBar;