import Image from 'next/image';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Image
        src={'/loading.svg'}
        width={200}
        height={200}
        alt="loading animation svg"
      />
    </div>
  );
};

export default Loading;
