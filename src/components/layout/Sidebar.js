import React, { useState } from 'react';
import { FaChevronDown, FaInbox, FaRegCalendarAlt, FaRegCalendar } from 'react-icons/fa';
import { useSelectedProjectValue } from '../../context';
import { AddProject } from '../AddProject';
import { Projects } from '../Projects';
export const Sidebar = () => {
	const { setSelectedProject } = useSelectedProjectValue() || '';
	const [active, setActive] = useState('inbox');
	const [showProjects, setShowProjects] = useState(true);
	return (
		<div className='sidebar' data-testid='sidebar'>
			<ul className='sidebar__generic'>
				<li
					data-testid='inbox'
					aria-label='Show inbox task'
					className={active === 'inbox' ? 'active' : ''}
					onClick={() => {
						setActive('inbox');
						setSelectedProject('INBOX');
					}}>
					<span>
						<FaInbox />
					</span>
					<span>Inbox</span>
				</li>
				<li
					data-testid='today'
					aria-label='Show today tasks'
					className={active === 'today' ? 'active' : ''}
					onClick={() => {
						setActive('today');
						setSelectedProject('TODAY');
					}}>
					<span>
						<FaRegCalendar />
					</span>
					<span>Today</span>
				</li>
				<li
					data-testid='next_7'
					aria-label='show next 7 days task'
					className={active === 'next_7' ? 'active' : ''}
					onClick={() => {
						setActive('next_7');
						setSelectedProject('NEXT_7');
					}}>
					<span>
						<FaRegCalendarAlt />
					</span>
					<span>Next 7 days</span>
				</li>
			</ul>
			<div className='sidebar__middle' aria-label="Show/Hide projects" onClick={() => setShowProjects(!showProjects)}>
				<span>
					<FaChevronDown className={!showProjects ? 'hidden-projects' : ''} />
				</span>
				<h2>Projects</h2>
			</div>
			<ul className='sidebar__projects'>{showProjects && <Projects />}</ul>
			{showProjects && <AddProject />}
		</div>
	);
};

//b = block
//e = element
//m = modifier
