import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import Layout from '../components/Layout';
import { userContext } from '../App';



function Home() {

  const user = useContext(userContext);

 


  return (

    <Layout>
      <h1>HOMEPAGE<hr />{user ? user.name : " "}</h1>
      <h2></h2>
    </Layout>

  )
}

export default Home
