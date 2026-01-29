import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

// Simple smoke test to verify the app renders without crashing
describe('App', () => {
    it('renders without crashing', () => {
        const { toJSON } = render(<App />);
        expect(toJSON()).toBeTruthy();
    });
});
