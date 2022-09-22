import React from 'react';

// https://www.svgrepo.com/svg/394284/microsoft
const GameWindows = ({ screenshotsURL, languages, version }) => {
  const title = `Open screenshots taken on Windows (game version: ${version}, languages: ${languages})`;
  return (
    <a key="windows" href={screenshotsURL} className="px-2 lg:pl-0 lg:pr-2" title={title}>
      <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24" className="w-4 h-4 text-blue-600">
        <path d="m0 0v10.719h10.719v-10.719zm13.279 0v10.719h10.719v-10.719zm-13.279 13.281v10.719h10.719v-10.719zm13.279 0v10.719h10.719v-10.719z"/>
      </svg>
    </a>
  );
};

export default GameWindows;
