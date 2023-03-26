import React from 'react';
import GameItemIcons from '../game-item-icons';

// https://tailwind-elements.com/snippets/tailwind/tailwindelements/3766077
const Game = ({ name, releaseYear, igdbURL, coverURL, screenshots }) => {
  return (
    <div className="mb-6 lg:mb-0">
      <div className="relative block rounded-lg shadow-lg bg-white p-6">
        <div className="lg:flex flex-row items-center">
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 lg:pr-6">
            <img src={coverURL} alt={name} />
          </div>
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
            <h5 className="text-lg font-bold mb-2">{name}</h5>
            <div>
              <div className="text-gray-500">
                Release year: {releaseYear}
              </div>
              <div className="text-gray-500 mb-4">
                <a href={igdbURL} className="px-2 lg:pl-0 lg:pr-2">Open IGDB website</a>
              </div>
              <div className="text-gray-500 mb-4">
                Screenshots link{screenshots.length === 1 ? '' : 's'}: 
                <ul className="list-inside flex mx-auto justify-center lg:justify-start">
                  {screenshots.map((screenshot) => (
                    <GameItemIcons key={screenshot.platform + '-' + screenshot.version} screenshotsURL={screenshot.link} platformName={screenshot.platform} languages={screenshot.languages} version={screenshot.version} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;