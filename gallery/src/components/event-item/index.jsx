import React from 'react';

const Event = ({ name, year, country, website, photos, imgSrc }) => {
  return (
    <div className="mb-6 lg:mb-0">
      <div className="relative block rounded-lg shadow-lg bg-white p-6">
        <div className="lg:flex flex-row items-center">
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-5/12 lg:pr-6">
            <img src={imgSrc} alt={name} />
          </div>
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-7/12">
            <h5 className="text-lg font-bold mb-2">{name}</h5>
            <div>
              <div className="text-gray-500">
                Year: {year}<br />
                Country: {country}
              </div>
              <div className="text-gray-500 mb-4">
                <a href={website} className="px-2 lg:pl-0 lg:pr-2">Open official website</a>
              </div>
              <div className="text-gray-500 mb-4">
                <a href={photos} className="px-2 lg:pl-0 lg:pr-2">Open photos</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
