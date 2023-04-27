import React from 'react';

const Game = ({ name, platformVersion, platformPlayedOn, releaseYear, igdbURL, flickrURL, version, countPhotos, countVideos, primaryLocalImg, coverLocalImg }) => {
  return (
    <div class="flex flex-col justify-start items-start my-8">
      <div class="relative flex flex-col items-center rounded-[20px] w-[400px] mx-auto p-4 bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:!shadow-none">
          <div class="relative flex h-48 w-full justify-center rounded-xl bg-cover" >
              <img src={primaryLocalImg} alt={name} /> 
              <div class="absolute -bottom-12 flex h-[87px] w-[87px] items-center justify-center rounded-full border-[4px] border-white bg-pink-400 dark:!border-navy-700">
                  <a href={igdbURL}>
                    <img class="h-full w-full rounded-full" src={coverLocalImg} alt={name} />
                  </a>
              </div>
          </div> 
          <div class="mt-16 flex flex-col items-center text-center">
              <h4 class="text-xl font-bold text-navy-700">
              {name}
              </h4>
              <p class="text-base font-normal text-gray-600">Release year: {releaseYear}</p>
              <p class="text-base font-normal text-gray-600">Platform: {platformVersion}</p>
              <p class="text-base font-normal text-gray-600">Played on: {platformPlayedOn}</p>
              <p class="text-base font-normal text-gray-600">Version: {version}</p>
          </div> 
          <div class="mt-6 mb-3 flex gap-14 md:!gap-14">
              <div class="flex flex-col items-center justify-center">
              <p class="text-2xl font-bold text-navy-700">{countPhotos}</p>
              <p class="text-sm font-normal text-gray-600">Photos</p>
              </div>
              <div class="flex flex-col items-center justify-center">
              <p class="text-2xl font-bold text-navy-700">
                {countVideos}
              </p>
              <p class="text-sm font-normal text-gray-600">Videos</p>
              </div>
              <div class="flex flex-col items-center justify-center">
              <p class="text-2xl font-bold text-navy-700">
                  <a href={flickrURL}>Flickr</a>
              </p>
              <p class="text-sm font-normal text-gray-600">Link</p>
              </div>
          </div>
      </div>  
      {/* <p class="font-normal text-navy-700 mt-20 mx-auto w-max">Profile Card component from <a href="https://horizon-ui.com?ref=tailwindcomponents.com" target="_blank" class="text-brand-500 font-bold">Horizon UI Tailwind React</a></p>   */}
    </div>
  );
};

export default Game;