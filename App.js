import { useEffect } from 'react';
import Routes from './src/navigation';
import { createTables } from './src/database/migrations';

export default function App() {

  useEffect(() => {
    createTables();
  }, []);

  return <Routes />;
}