import React, { createContext } from 'react';
import faker from 'faker';
import cookies from 'js-cookie';

export const NicknameContext = createContext(null);

const NicknameProvider = ({ children }) => {
  const randomName = faker.name.findName();
  cookies.set('name', randomName);

  return (
    <NicknameContext.Provider value={cookies.get('name')}>
      {children}
    </NicknameContext.Provider>
  );
};

export default NicknameProvider;
