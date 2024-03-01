import { useContext } from 'react';

import { AppContext } from '../contexts/AppContext';

const useApp = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useApp;
