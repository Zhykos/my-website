import React from 'react';
import GamePlayStation4 from '../game-item-playstation-4';

const GameItemIcons = ({ sreensURL, platformName }) => {
  return <div>
          {
            {
            'PlayStation 4': <GamePlayStation4 sreensURL={sreensURL} platformName={platformName} />,
            }[platformName]
      	  }   
      </div>;
};

export default GameItemIcons;
