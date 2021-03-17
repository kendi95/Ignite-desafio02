import { useState } from 'react';

import SideBar from './components/SideBar';
import Content from './components/Content';

import './styles/global.scss';

export interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export interface MovieProps {
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar onSelectGenre={setSelectedGenreId} />
      <Content selectedGenreId={selectedGenreId} />
    </div>
  )
}