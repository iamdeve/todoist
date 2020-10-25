import React, { useState, useEffect } from 'react';
import { FaPizzaSlice, FaSignOutAlt } from 'react-icons/fa';
import { AddTask } from '../AddTasks';
import { useUserValue, useDarkmodeValue } from '../../context';
import { auth } from '../../firebase';
export const Header = () => {
	const [shouldShowMain, setShouldShowMain] = useState(false);
	const [showQuickAddTask, setShowQuickAddTask] = useState(false);
	const { user, setUser } = useUserValue();
	const { darkmode, setDarkmode } = useDarkmodeValue();
	useEffect(() => {
		// console.log(user);
	}, [user]);

	const logout = () => {
		localStorage.removeItem('todoistUser');
		auth.signOut();
		setUser(null);
	};

	return (
		<header className='header' data-testid='header'>
			<nav>
				<div className='logo'>
					<img src='images/logo.png' alt='Todoist' />
				</div>
				<div className='settings'>
					<ul>
						<li
							title='Add Task'
							data-testid='quick-add-task-action'
							className='settings__add'
							onClick={() => {
								setShowQuickAddTask(true);
								setShouldShowMain(true);
							}}>
							+
						</li>
						<li title='Dark Mode' data-testid='dark-mode-action' className='settings__darkmode' onClick={() => setDarkmode(!darkmode)}>
							<FaPizzaSlice />
						</li>
						<li title='Profile'>
							<img className='profile__img' src={user?.photoURL} alt='profile' />
						</li>
						<li title='Signout' data-testid='logout-action' className='settings__logout' onClick={() => logout()}>
							<FaSignOutAlt />
						</li>
					</ul>
				</div>
			</nav>
			<AddTask showAddTaskMain={false} showShouldMain={shouldShowMain} showQuickAddTask={showQuickAddTask} setShowQuickAddTask={setShowQuickAddTask} />
		</header>
	);
};
