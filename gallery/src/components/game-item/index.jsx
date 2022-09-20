import React from 'react';

const Game = ({ name, releaseYear, screenLanguages, igdb, platforms, imgSrc}) => {
  return (
    <div className="mb-12 lg:mb-0">
      <img className="rounded-lg shadow-lg mb-6 mx-auto" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(9).jpg"
        alt="avatar" style={{width: '150px'}} />
      <h5 className="text-lg font-bold mb-4">{name}</h5>
      <div className="mb-6">
        <div>Release year: {releaseYear}</div>
        {screenLanguages.map((language) => (
          <div key={language} className="mb-6">Screen language: {language}</div>
        ))}
      </div>
      <ul className="list-inside flex mx-auto justify-center">
        <a href={igdb} className="px-2">
          <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">IGDB</button>
        </a>
        {platforms.map((platform) => (
          <a key={platform.name} href={platform.link} className="px-2">
            <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">{platform.name}</button>
          </a>
        ))}
      </ul>
    </div>
  );
};

export default Game;
