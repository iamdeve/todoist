import React from 'react';
import { render } from 'react-dom';
import { App } from './App';
import './App.scss';
import { BrowserRouter } from 'react-router-dom';
import { ProjectsProvider, SelectedProjectProvider, UserProvider } from './context';
import history from './history';
render(
	<React.StrictMode>
		<BrowserRouter history={history}>
			<UserProvider>
				<SelectedProjectProvider>
					<ProjectsProvider>
						<App />
					</ProjectsProvider>
				</SelectedProjectProvider>
			</UserProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root'),
);
