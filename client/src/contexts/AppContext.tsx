import { createContext, useMemo, useState } from 'react';
import { Ticket, User } from '@acme/shared-models';
import { MAIN_ROUTE_API } from '../config';

type AppContextProps = {
  listTickets: Ticket[];
  setListTickets: (value: Ticket[]) => void;
  listUsers: User[];
  setListUsers: (value: User[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const AppContext = createContext<AppContextProps>({
  listTickets: [],
  setListTickets: () => null,
  listUsers: [],
  setListUsers: () => null,
  loading: false,
  setLoading: () => null,
});

type AppProviderProps = {
  children: React.ReactElement;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [listTickets, setListTickets] = useState([] as Ticket[]);
  const [listUsers, setListUsers] = useState([] as User[]);
  const [loading, setLoading] = useState<boolean>(false);

  const contextData = useMemo(() => {
    return {
      listTickets,
      setListTickets,
      listUsers,
      setListUsers,
      loading,
      setLoading,
    };
  }, [
    listTickets,
    setListTickets,
    listUsers,
    setListUsers,
    loading,
    setLoading,
  ]);
  return (
    <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
  );
};
export default AppProvider;
