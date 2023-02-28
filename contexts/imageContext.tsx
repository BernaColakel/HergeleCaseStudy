import React, { useState } from 'react';
import { createContext } from 'react';

export const ImageContext = createContext({
  imageUri: '',

});

export const ImageProvider = ({ children }: any) => {
  const [imageUri, setImageUri] = useState('');

  return (
    <ImageContext.Provider
      value={{
        imageUri,
        setImageUri,
      }}>
      {children}
    </ImageContext.Provider>
  );
};
