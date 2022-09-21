import React from 'react';
import GamePlayStation4 from '../game-item-playstation-4';

const GameItemIcons = ({ screenshotsURL, platformName, languages, version }) => {
  return <div>
          {
            {
            'PlayStation 4': <GamePlayStation4 screenshotsURL={screenshotsURL} languages={languages} version={version} />,
            }[platformName]
      	  }   
      </div>;
};

export default GameItemIcons;
