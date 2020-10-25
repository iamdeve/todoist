import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Content } from './layout/Content';
import { useDarkmodeValue } from '../context';
export const Main = () => {
	const { darkmode, setDarkmode } = useDarkmodeValue();
	return (
		<main data-testid='application' className={darkmode ? 'darkmode' : ''}>
			<Header darkMode={darkmode} setDarkMode={setDarkmode} />
			<Content />
		</main>
	);
};
