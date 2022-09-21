import React from 'react';
import Game from "../game-item"
import imgNamee from '../../images/gallery/A-Plague-Tale-Innocence.jpg';

const GameAPlague = () => {
  const screenLanguages = ['French'];
  const platforms = [
    {
      name: 'PlayStation 4',
      link: 'https://www.amazon.fr/photos/share/h16qdp6RtwqQj3RcIY8Y0Vqzun5godbE4h1iVpeTKDI',
    },
  ];

  return (
    <Game name="A Plague" releaseYear="2019" screenLanguages={screenLanguages} igdb="https://www.igdb.com/games/a-plague-tale-innocence" platforms={platforms} imgName={imgNamee} />
  );
};

export default GameAPlague;