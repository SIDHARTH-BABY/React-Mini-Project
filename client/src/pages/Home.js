import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout';

export const userContext =React.createContext()

function Home() {
 
  const [details, setDetails] = useState({})

  console.log(details.data? details.data.name: 'ello');

  const getData = async () => {
 
    try {
      const response = await axios.post('/api/user/get-user-info-by-id', {},
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          }
        })
      console.log(response.data, 'haii');
      console.log('hello');

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
    <userContext.Provider value={details.data? details.data.isAdmin: 'Error'}>
    <Layout>
      <h1>HOMEPAGE</h1>
<h2>{details.data? details.data.name:''}</h2>
    </Layout>
    </userContext.Provider>
  )
}

export default Home
