import React, { createContext, useContext } from 'react';

import { useDarkmode } from '../hooks';

export const DarkmodeContext = createContext();

export const DarkmodeProvider = ({ children }) => {
	const { darkmode, setDarkmode } = useDarkmode();
	return <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>{children}</DarkmodeContext.Provider>;
};

export const useDarkmodeValue = () => useContext(DarkmodeContext);
