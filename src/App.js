import './App.css';
import CreateClient from './components/createclient';
import CreateAgent from './components/createagent';
import CreateReport from './components/createreport';
import CreateObject from './components/createobject';
import CreateTransaction from './components/createtransaction';

import ReadClients from './components/readclients';
import ReadAgents from './components/readagents';
import ReadReports from './components/readreports';
import ReadObjects from './components/readobjects';
import ReadTranscations from './components/readtransactions';

import UpdateClient from './components/updateclient';
import UpdateAgent from './components/updateagent';
import UpdateObject from './components/updateobject';
import UpdateReport from './components/updatereport';
import UpdateTransaction from './components/updatetransaction';
import Nav from './components/Nav'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="main">
        <Nav />
        <Routes>
          <Route exact path='/createclient' element={<CreateClient />} />
          <Route exact path='/createagent' element={<CreateAgent />} />
          <Route exact path='/createreport' element={<CreateReport />} />
          <Route exact path='/createobject' element={<CreateObject />} />
          <Route exact path='/createtransaction' element={<CreateTransaction />} />
          
          <Route exact path='/readclients' element={<ReadClients />} />
          <Route exact path='/readagents' element={<ReadAgents />} />
          <Route exact path='/readreports' element={<ReadReports />} />
          <Route exact path='/readobjects' element={<ReadObjects />} />
          <Route exact path='/readtransactions' element={<ReadTranscations />} />
          
          <Route path='/updateclient' element={<UpdateClient />} />
          <Route path='/updateagent' element={<UpdateAgent />} />
          <Route path='/updateobject' element={<UpdateObject />} />
          <Route path='/updatereport' element={<UpdateReport />} />
          <Route path='/updatetransaction' element={<UpdateTransaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
