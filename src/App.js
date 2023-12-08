import './App.css';
import CreateClient from './components/client/createclient';
import CreateAgent from './components/agent/createagent';
import CreateReport from './components/report/createreport';
import CreateObject from './components/estate_object/createobject';
import CreateTransaction from './components/transaction/createtransaction';

import ReadClients from './components/client/readclients';
import ReadAgents from './components/agent/readagents';
import ReadReports from './components/report/readreports';
import ReadObjects from './components/estate_object/readobjects';
import ReadTranscations from './components/transaction/readtransactions';

import UpdateClient from './components/client/updateclient';
import UpdateAgent from './components/agent/updateagent';
import UpdateObject from './components/estate_object/updateobject';
import UpdateReport from './components/report/updatereport';
import UpdateTransaction from './components/transaction/updatetransaction';
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
