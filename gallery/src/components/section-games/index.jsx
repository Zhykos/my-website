import React from 'react';

import Section from '../section';
import Game from '../game-item';

const SectionGames = ({ games }) => {
  if (!games.length) return null;

  return (
    <Section title="Games">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-xl-12 text-center">
        {games.map((item) => (
          <Game
            key={item.name}
            name={item.name}
            releaseYear={item.releaseYear}
            screenLanguages={item.screenLanguages}
            igdb={item.igdb}
            platforms={item.platforms}
            imgSrc={item.imgSrc}
          />
        ))}
      </div>
    </Section>
  );
};

export default SectionGames;
