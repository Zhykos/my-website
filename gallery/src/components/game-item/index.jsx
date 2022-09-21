import React from 'react';
import GameItemIcons from '../game-item-icons';
import imgNamee from '../../images/gallery/A-Plague-Tale-Innocence.jpg';

// Gamepad icon from: https://www.svgrepo.com/svg/111711/videogame-controller
const Game = ({ name, releaseYear, screenLanguages, igdb, platforms, imgName }) => {
  return (
    <div className="mb-6 lg:mb-0">
      <div className="relative block rounded-lg shadow-lg bg-white p-6">
        <div className="lg:flex flex-row items-center">
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 lg:pr-6">
            <img src={imgNamee} alt={name} />
          </div>
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
            <h5 className="text-lg font-bold mb-2">{name}</h5>
            <div>
              <div className="text-gray-500">Release year: {releaseYear}</div>
              <div className="text-gray-500 mb-4">Screen language{screenLanguages.length === 1 ? '':'s'}: {screenLanguages.join(', ')}</div>
            </div>
            <ul className="list-inside flex mx-auto justify-center lg:justify-start">
              <p className='mr-2'>Links:</p>
              <a href={igdb} className="px-2 lg:pl-0 lg:pr-2" title='Open IGDB website'>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 35.569 35.569" className="w-6 h-6 text-blue-600">
                  <path d="M24.847,5.245c-5.164,2.551-8.593,2.347-13.934-0.042c-9.353,0-14.715,25.162-7.719,25.162
                    c5.903,0,6.697-7.358,14.782-7.358c6.538,0,10.376,7.265,14.737,7.265C39.706,30.271,32.603,5.245,24.847,5.245z M10.974,17.782
                    c-2.589,0-4.688-2.1-4.688-4.685c0-2.584,2.099-4.684,4.688-4.684c2.588,0,4.686,2.1,4.686,4.684
                    C15.659,15.682,13.562,17.782,10.974,17.782z M22.71,13.581c-0.766-0.239-1.191-1.053-0.949-1.819
                    c0.238-0.762,1.053-1.188,1.817-0.948c0.765,0.237,1.194,1.049,0.952,1.814C24.29,13.399,23.476,13.819,22.71,13.581z
                    M30.067,14.804c-0.244,0.765-1.055,1.189-1.82,0.951c-0.762-0.238-1.19-1.052-0.952-1.822c0.243-0.765,1.059-1.187,1.819-0.951
                    C29.88,13.224,30.307,14.036,30.067,14.804z M28.199,11.405c-0.245,0.767-1.056,1.189-1.821,0.953
                    c-0.763-0.238-1.191-1.053-0.953-1.821c0.243-0.766,1.059-1.188,1.82-0.953C28.011,9.827,28.438,10.638,28.199,11.405z
                    M26.249,15.909c-0.246,0.767-1.056,1.191-1.821,0.952c-0.763-0.238-1.19-1.051-0.952-1.82c0.242-0.764,1.057-1.188,1.818-0.953
                    C26.06,14.331,26.486,15.141,26.249,15.909z M13.342,13.168c0,1.335-1.079,2.416-2.412,2.416c-1.336,0-2.415-1.081-2.415-2.416
                    c0-1.331,1.079-2.413,2.415-2.413C12.263,10.755,13.342,11.837,13.342,13.168z"/>
                </svg>
              </a>
              {platforms.map((platform) => (
                <GameItemIcons key={platform.name} sreensURL={platform.link} platformName={platform.name} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;