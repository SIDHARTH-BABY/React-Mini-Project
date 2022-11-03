import Layout from '../components/Layout';
import React, { useContext, useEffect, useState } from 'react'
import { Tabs } from 'antd';
import { notificationContext } from '../App';

function Notifications() {
    const [value, setValue] = useState([])

    const user = useContext(notificationContext);

   



    useEffect(() => {

        setValue(user ? user : '')

    }, [])

   


    return (
        <div>
            <Layout>
                <h1 className='page-title'>Notifications</h1>

               
                 

                <Tabs>
                    <Tabs.TabPane tab='Messages' key={0}>
                        <div className='d-flex justify-content-end'>
                           
                        </div>


                        {value.map(notification =>
                            <div className='card p-2'>
                                <div className='card-text'>{notification.message}</div>
                            </div>
                        )}

                    </Tabs.TabPane>

                   
                </Tabs>
            </Layout>

        </div>
    )
}

export default Notifications
