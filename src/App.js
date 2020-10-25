import React, { useEffect, useState } from 'react';
import { useUserValue } from './context';
import { Main } from './components/Main';
import { Switch, Route } from 'react-router-dom';
import { Login } from './components/Login';
export const App = () => {
	const { user } = useUserValue();
	const [show, setShow] = useState(false);
	useEffect(() => {
		if (user) {
			setShow(true);
		}else{
			setShow(false)
		}
	}, [user]);
	return (
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
	);
};
