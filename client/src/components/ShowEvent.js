
import Layout from './Layout'


import { Card, Badge } from 'antd';
import React, { useState } from "react";

import axios from "axios";
import { useEffect, } from "react"
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertsSlice";


function ShowEvent() {
    const [apps, setApps] = useState([])

    const dispatch = useDispatch()
    const oneApplication = async () => {
        try {

            const response = await axios.post('/api/user/get-one-apps', {}, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                }
            })
            dispatch(showLoading())
            if (response.data.success) {
                toast.success(response.data.message)
                setApps(response.data.data)
                dispatch(hideLoading())
            }
        } catch (error) {
            dispatch(hideLoading())
            toast.error("something went wrong");
        }
    }
    useEffect(() => {
        oneApplication()
    }, [])
    return (
        <Layout>


            <div className="site-card-border-less-wrapper ">
                {
                    apps.map((apps, index) => {
                        return (
                            <Card
                                title="" className='d-flex flex-row'
                                bordered={true}
                                style={{
                                    display: 'flex',
                                    width: 300, margin: 5
                                }}
                            >
                                <p>{apps.name}</p>
                                <p>{apps.address}</p>
                                <p>{apps.city}</p>
                                <p>{apps.state}</p>
                                <p>{apps.phone}</p>
                                <p>{apps.subject}</p>
                                <p>{apps.qualification}</p>
                                <p>{apps.experience}</p>
                                <h5>Your status     <span class="badge rounded-pill bg-primary">  {apps.status}</span></h5>

                                {apps.slot ? <h4>Your Slot - <span class="badge bg-success">{apps.slot.section} - {apps.slot.no}</span></h4> : <h3>Slot not allocated</h3>}
                            </Card>

                        )
                    })
                }
            </div>

        </Layout>

    )
}

export default ShowEvent
