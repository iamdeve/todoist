import React, { useState } from 'react';
import { auth, provider } from '../firebase';
import { useUser } from '../hooks';
export const Login = () => {
	const { setUser } = useUser();
	const login = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				localStorage.setItem('todoistUser', JSON.stringify(result.user));
				setUser(JSON.stringify(result.user));
				window.location = '/';
			})
			.catch((err) => {
				alert(err.message);
				console.log(err);
			});
	};
	return <button onClick={() => login()}>Sign In with Google</button>;
};
