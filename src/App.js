import React, { useEffect,useState } from 'react';
import { Header } from './components/layout/Header';
import { Content } from './components/layout/Content';
import { ProjectsProvider, SelectedProjectProvider, UserProvider } from './context';
import { useUser } from './hooks';

import { Switch, Route } from 'react-router-dom';
import { Login } from './components/Login'
export const App = ({ darkModeDefault = false }) => {
	const [darkMode, setDarkMode] = useState(darkModeDefault);
	const { user } = useUser();
	useEffect(() => {
		console.log(user)
	}, [user])
	return (
		<UserProvider>
			<SelectedProjectProvider>
				<ProjectsProvider>
					<main data-testid='application' className={darkMode ? 'darkmode' : ''}>
						<Switch>
							<Route
								exact
								to='/'
								render={() => {
									if (user) {
										return (
											<>
												<Header darkMode={darkMode} setDarkMode={setDarkMode} />
												<Content />
											</>
										);
									} else {
										return <Login />;
									}
								}}
							/>
						</Switch>
					</main>
				</ProjectsProvider>
			</SelectedProjectProvider>
		</UserProvider>
	);
};
