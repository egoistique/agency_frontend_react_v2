import './App.css';
import CreateClient from './components/createclient';
import ReadClients from './components/readclients';
import ReadAgents from './components/readagents';
import ReadReports from './components/readreports';
import Update from './components/update';
import Nav from './components/Nav'; // Импортируем компонент Nav
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="main">
        <Nav />
        <Routes>
          <Route exact path='/createclient' element={<CreateClient />} />
          <Route exact path='/readclients' element={<ReadClients />} />
          <Route exact path='/readagents' element={<ReadAgents />} />
          <Route exact path='/readreports' element={<ReadReports />} />
          <Route path='/update' element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
