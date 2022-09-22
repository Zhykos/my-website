import React from 'react';
import GamePlayStation4 from '../game-item-playstation-4';
import GameNintendoSwitch from '../game-item-nintendo-switch';
import GameWindows from '../game-item-windows';
import GameXboxSeriesX from '../game-item-xbox-series-x';
import GameAndroid from '../game-item-android';
import GameXboxOne from '../game-item-xbox-one';
import GamePSVita from '../game-item-ps-vita';

const GameItemIcons = ({ screenshotsURL, platformName, languages, version }) => {
  const functionWithSwitch = (parameter) => {
    switch(parameter){
      case "PlayStation 4":
        return <GamePlayStation4 screenshotsURL={screenshotsURL} languages={languages} version={version} />;
      case "Nintendo Switch":
        return <GameNintendoSwitch screenshotsURL={screenshotsURL} languages={languages} version={version} />;
      case "Windows":
        return <GameWindows screenshotsURL={screenshotsURL} languages={languages} version={version} />;
      case "Xbox Series X":
        return <GameXboxSeriesX screenshotsURL={screenshotsURL} languages={languages} version={version} />;
      case "Android":
        return <GameAndroid screenshotsURL={screenshotsURL} languages={languages} version={version} />;
      case "Xbox One":
        return <GameXboxOne screenshotsURL={screenshotsURL} languages={languages} version={version} />;
      case "PS Vita":
        return <GamePSVita screenshotsURL={screenshotsURL} languages={languages} version={version} />;
      default:
        throw new Error(`Icone introuvable pour la plateforme : '${platformName}'.`);
    }
  }
  return functionWithSwitch(platformName);
};

export default GameItemIcons;
