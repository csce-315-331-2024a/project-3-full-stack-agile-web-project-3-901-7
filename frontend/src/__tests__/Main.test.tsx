import { render } from '@testing-library/react';
import Main from '../main';


describe('Components Rendered by main.tsx', () => {
    it('should render Landing component for path /', () => {
        render(<Main/>);
    });
  });