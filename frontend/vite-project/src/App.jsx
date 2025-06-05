import { BrowserRouter } from 'react-router-dom';
import Router from './routes/Router';

function App() {
  console.log('App entered');
  return(
    <BrowserRouter>
      <h1>Hello</h1>
      <Router/>
    </BrowserRouter>
  );
}

export default App
