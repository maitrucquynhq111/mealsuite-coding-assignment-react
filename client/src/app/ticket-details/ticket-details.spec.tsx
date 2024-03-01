import 'whatwg-fetch';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import TicketDetails from './ticket-details';

describe('TicketDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BrowserRouter>
        <TicketDetails />
      </BrowserRouter>
    );
    expect(baseElement).toBeTruthy();
  });
});
