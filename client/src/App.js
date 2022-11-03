
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';

import { Toaster } from 'react-hot-toast'

import { Button } from 'antd'
import Home from './pages/Home';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import ApplyEvent from './pages/ApplyEvent';


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Notifications from './pages/Notifications';
import EventList from './pages/Admin/EventList';
import CheckStatus from './pages/CheckStatus';
import Slots from './pages/Admin/Slots';
import ShowEvent from './components/ShowEvent';

export const userContext = React.createContext()
export const channelContext = React.createContext()
export const notificationContext = React.createContext()

function App() {

  const { loading } = useSelector(state => state.alerts)

  const [details, setDetails] = useState({})





  const getData = async () => {

    try {
      const response = await axios.get('/api/user/get-user-info-by-id',
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        })
      console.log(response.data, 'haii');


      setDetails(response.data)

    } catch (error) {
      console.log('eroorrr');
      console.log(error);
    }
  }



  useEffect(() => {

    getData()

  }, [])

  return (
    <userContext.Provider value={details.data}>
      <channelContext.Provider value={details.data ? details.data.isAdmin : 'ooooo'}>
        <notificationContext.Provider value={details.data ? details.data.unSeenNot : 'ooooo'}>

          <BrowserRouter>
            {loading && (
              <div className="spinner-parent">
                <div class="spinner-border text-danger" role="status">

                </div>
              </div>
            )}
            <Toaster position="top-center" reverseOrder={false} />

            <Routes>
              <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
              <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
              <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path='/applyevent' element={<ProtectedRoute><ApplyEvent /></ProtectedRoute>} />
              <Route path='/notifications' element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path='/checkStatus' element={<ProtectedRoute><CheckStatus /></ProtectedRoute>} />
              <Route path='/admin/eventList' element={<ProtectedRoute><EventList /></ProtectedRoute>} />
              <Route path='/admin/slots' element={<ProtectedRoute><Slots /></ProtectedRoute>} />
              <Route path='/showevents' element={<ProtectedRoute><ShowEvent /></ProtectedRoute>} />

            </Routes>
          </BrowserRouter>
        </notificationContext.Provider>
      </channelContext.Provider>
    </userContext.Provider>

  );
}

export default App;
