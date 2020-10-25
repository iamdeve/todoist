import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Content } from './layout/Content';
export const Main = ({ darkModeDefault = false }) => {
	const [darkMode, setDarkMode] = useState(darkModeDefault);
	return (
		<main data-testid='application' className={darkMode ? 'darkmode' : ''}>
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<Content />
		</main>
	);
};
