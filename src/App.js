import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Join from './pages/join';
import Login from './pages/login';
import MainCreate from './pages/mainCreate';
import Layout from './components/layout';
import Create from './pages/create';
import CreateGrape from './pages/createGrape';
import HTGrape from './pages/HTGrape';
import Main from './pages/main';
import MainList from './pages/mainList';
import HTwm from './pages/HTwm';
import CreateWM from './pages/createWM';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 공통 레이아웃 없음*/}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Join />} />
          <Route path="/login" element={<Login />} />

          {/* 공통 레이아웃 적용 */}
          <Route element={<Layout />}>
            <Route path="mainCreate" element={<MainCreate />} />
            <Route path="create" element={<Create />} />
            <Route path="createGrape" element={<CreateGrape />} />
            <Route path="createWM" element={<CreateWM />} />
            <Route path="HTGrape" element={<HTGrape />} />
            <Route path="main" element={<Main />} />
            <Route path="mainList" element={<MainList />} />
            <Route path="HTwm" element={<HTwm />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
