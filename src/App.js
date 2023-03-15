import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import PokemonEncounter from './components/PokemonEncounter';
import Trainer from './components/Trainer';
import Error404 from './components/Error404';
import Footer from './components/Footer';
import PokemonTeam from './components/PokemonTeam';

const App = () => {

  return (
    <>
      <Router basename={process.env.PUBLIC_URL}>
        <Header/>
          <Routes>
            <Route path='/Main' element={<Main/>}/>
            <Route path='/' element={<PokemonTeam/>}/>
            <Route path='/PokemonEncounter' element={<PokemonEncounter/>}/>
            <Route path='/Trainer' element={<Trainer/>}/>
            <Route path='*' element={<Error404/>}/>
          </Routes>
        <Footer/>
      </Router>
    </>
  );
}

export default App;