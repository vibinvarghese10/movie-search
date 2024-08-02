// App.js or Routes.js
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';




function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
   </Routes>
    </div>
  );
}

export default App;
