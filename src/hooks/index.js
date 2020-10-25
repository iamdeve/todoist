import { useState, useEffect } from 'react';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import { useUserValue } from '../context';
import moment from 'moment';
export const useTasks = (selectedProject) => {
	const [tasks, setTasks] = useState([]);
	const [archivedTasks, setArchivedTasks] = useState([]);
	const { user } = useUserValue();
	// console.log(user);

	useEffect(() => {
		let unsubscribe = firebase.firestore().collection('tasks').where('userId', '==', user.uid);

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
	const { user } = useUserValue();
	// console.log(user);

	useEffect(() => {
		if (user) {
			firebase
				.firestore()
				.collection('projects')
				.where('userId', '==', user.uid)
				.orderBy('projectId')
				.get()
				.then((snapshot) => {
					const allProjects = snapshot.docs.map((project) => ({
						...project.data(),
						docId: project.id,
					}));

					// console.log(allProjects)
					if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
						setProjects(allProjects);
					}
				});
		}
	}, [projects, user]);
	return { projects, setProjects };
};

export const useUser = (loggedInUser) => {
	const [user, setUser] = useState(null);
	useEffect(() => {
		if (loggedInUser) {
			localStorage.setItem('todoistUser', JSON.stringify(loggedInUser));
		}
		loggedInUser = loggedInUser ? loggedInUser : JSON.parse(localStorage.getItem('todoistUser'));
		setUser(loggedInUser);
	}, [loggedInUser]);
	return { user, setUser };
};

export const useDarkmode = (mode = false) => {
	const [darkmode, setDarkmode] = useState(mode);

	useEffect(() => {
		setDarkmode(mode);
	}, []);

	return { darkmode, setDarkmode };
};
