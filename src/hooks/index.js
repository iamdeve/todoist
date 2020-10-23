import { useState, useEffect } from 'react';
import { firebase, auth, provider } from '../firebase';
import { collatedTasksExist } from '../helpers';
import moment from 'moment';
export const useTasks = (selectedProject) => {
	const [tasks, setTasks] = useState([]);
	const [archivedTasks, setArchivedTasks] = useState([]);

	useEffect(() => {
		let unsubscribe = firebase.firestore().collection('tasks').where('userId', '==', '2vDTjqWsPQ2yj3sza5ju');

		unsubscribe =
			selectedProject && !collatedTasksExist(selectedProject)
				? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
				: selectedProject === 'TODAY'
				? (unsubscribe = unsubscribe.where('date', '==', moment().format('DD/MM/YYYY')))
				: selectedProject === 'INBOX' || selectedProject === 0
				? (unsubscribe = unsubscribe.where('date', '==', ''))
				: unsubscribe;

		unsubscribe = unsubscribe.onSnapshot((snapshot) => {
			const newTasks = snapshot.docs.map((task) => ({
				id: task.id,
				...task.data(),
			}));
			setTasks(selectedProject === 'NEXT_7' ? newTasks.filter((task) => moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 && task.archived !== true) : newTasks.filter((task) => task.archived !== true));
			setArchivedTasks(newTasks.filter((task) => task.archived !== false));
		});

		return () => unsubscribe();
	}, [selectedProject]);

	return { tasks, archivedTasks };
};

export const useProjects = () => {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		firebase
			.firestore()
			.collection('projects')
			.where('userId', '==', '2vDTjqWsPQ2yj3sza5ju')
			.orderBy('projectId')
			.get()
			.then((snapshot) => {
				const allProjects = snapshot.docs.map((project) => ({
					...project.data(),
					docId: project.id,
				}));

				if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
					setProjects(allProjects);
				}
			});
	}, [projects]);
	return { projects, setProjects };
};

export const useUser = (loggedInUser) => {
	loggedInUser = loggedInUser ? loggedInUser : JSON.parse(localStorage.getItem('todoistUser'))
	const [user, setUser] = useState({});
	useEffect(() => {
		setUser(loggedInUser);
	}, []);
	return { user, setUser };
};

export const useLogout = () => {
	const [user, setUser] = useState({});
	useEffect(() => {
		setUser(localStorage.removeItem('todoistUser'));
	}, []);
	return { user, setUser };
};
