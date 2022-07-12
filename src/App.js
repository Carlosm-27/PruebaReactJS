import logo from './logo.svg';
import './App.css';
import header from './layout/header';
import sidebar from './layout/sidebar';
import Users from './components/Users';
import Albums from './components/Albums';

function App() {
  return (
    <>
      <Users></Users>
      <Albums></Albums>
    </>
  );
}

export default App;
