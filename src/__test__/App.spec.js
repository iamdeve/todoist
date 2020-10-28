import React from 'react';

import { render, cleanup, fireEvent } from '@testing-library/react';

import { Main } from '../components/Main';

beforeEach(cleanup);

describe('<Main />', () => {
	it('renders the application', () => {
		const { queryByTestId, debug } = render(<Main />);
		expect(queryByTestId('application')).toBeTruthy();
	});
});
