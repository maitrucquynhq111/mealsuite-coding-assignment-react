import 'whatwg-fetch';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import Tickets from './tickets';

describe('Tickets', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <Tickets />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
