import { render } from '@testing-library/react';
import Main from '../main';

describe('Components Rendered by main.tsx', () => {
    beforeEach(() => {
        localStorage.clear();
    })
    it('should render Landing component for path /', () => {
        render(<Main/>);
    });
    it('check if localstorage theme is dark', () => {
        localStorage.setItem('theme', 'dark');
        render(<Main/>);
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    })
  });