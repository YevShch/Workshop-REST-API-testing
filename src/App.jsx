import {
  useDebug, useAutoKeys, useStates, useOnMount
} from "react-easier";
import { Outlet, useNavigate } from 'react-router-dom';
import LeftMenu from './LeftMenu';

export default function App() {
  //useDebug();
  useAutoKeys();

  useStates('store', { sortOrder: 'topRated' });

  const navigate = useNavigate();
  useOnMount(() => location.pathname === '/'
    && navigate('/kategori/frukt-och-gront'));

  return <>
    <LeftMenu />
    <Outlet />
  </>;
};