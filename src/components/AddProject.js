import React, { useState } from 'react';
import { firebase } from '../firebase';
import { generatePushId } from '../helpers';
import { useProjectsValue, useUserValue } from '../context';

export const AddProject = ({ shouldShow = false }) => {
	const [show, setShow] = useState(shouldShow);
	const [projectName, setProjectName] = useState('');
	const projectId = generatePushId();
	const { projects, setProjects } = useProjectsValue();
	const {user} = useUserValue()

	const addProject = () => {
		projectName &&
			firebase
				.firestore()
				.collection('projects')
				.add({
					projectId,
					name: projectName,
					userId:user.uid
					// userId: '2vDTjqWsPQ2yj3sza5ju',
				})
				.then(() => {
					setProjects([...projects]);
					setProjectName('');
					setShow(false);
				});
	};
	return (
		<div className='add-project' data-testid='add-project'>
			{show && (
				<div className='add-project__input'>
					<input type='text' value={projectName} onChange={(e) => setProjectName(e.target.value)} className='add-project__name' data-testid='project-name' placeholder='Name your project' />
					<button className='add-project__submit' type='button' onClick={() => addProject()} data-testid='add-project-submit'>
						Add Project
					</button>
					<span data-testid='hide-project-overlay' className='add-project__cancel' role="button" tabIndex={0} onKeyDown={()=> setShow(false)} onClick={() => setShow(false)}>
						Cancel
					</span>
				</div>
			)}
			<span className='add-project__plus'>+</span>
			<span data-testid='add-project-action' className='add-project__text' role="button" tabIndex={0} onKeyDown={() => setShow(!show)} onClick={() => setShow(!show)}>
				Add Project
			</span>
		</div>
	);
};
