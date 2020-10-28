import React from 'react';
import { firebase } from '../firebase';

export const Checkbox = ({ id, taskDesc }) => {
	const archiveTask = () => {
		firebase.firestore().collection('tasks').doc(id).update({
			archived: true,
		});
	};

	return (
		<div className='checkbox__holder' data-testid='checkbox-action' aria-label={`Mark ${taskDesc} as done.`} onClick={() => archiveTask()}>
			<span className='checkbox'></span>
		</div>
	);
};
