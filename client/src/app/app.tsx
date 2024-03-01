import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import useApp from '../hooks/useApp';
import { MAIN_ROUTE_API } from '../config';

import styles from './app.module.css';
import Tickets from './tickets/tickets';
import TicketDetail from './ticket-details/ticket-details';
import Loading from './components/loading';

const App = () => {
  const { setListUsers, loading } = useApp();

  // Very basic way to synchronize state with server.
  // Feel free to use any state/fetch library you want (e.g. react-query, xstate, redux, etc.).
  useEffect(() => {
    async function fetchUsers() {
      const data = await fetch(MAIN_ROUTE_API.GET_USERS).then();
      setListUsers(await data.json());
    }

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['app']}>
      {loading && <Loading />}
      <Routes>
        <Route path="/" element={<Tickets />} />
        {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
        <Route path="/:id" element={<TicketDetail />} />
      </Routes>
    </div>
  );
};

export default App;
