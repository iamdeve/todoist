import React, { useEffect, useState } from 'react';
import { useUserValue } from './context';
import { Main } from './components/Main';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
export const App = () => {
	const { user } = useUserValue() || {};
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (user?.uid) {
			setShow(true);
		} else {
			setShow(false);
		}
	}, [user]);
	return (
		<BrowserRouter>
			<Switch>
				<Route
					exact={true}
					path='/'
					render={(props) => {
						if (show) return <Main />;
						else return <Login />;
					}}
				/>
			</Switch>
		</BrowserRouter>
	);
};
