import { Table } from 'antd'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Layout from '../../components/Layout'
import { hideLoading, showLoading } from '../../redux/alertsSlice'
import toast from 'react-hot-toast'

function EventList() {
    const [events, setEvents] = useState([])
    const dispatch = useDispatch()

    const getEventdata = async () => {
        try {
            dispatch(showLoading())
            const response = await axios.get('/api/admin/get-all-events',
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                console.log(response.data.data, 'event deatailsss ');
                setEvents(response.data.data)

            }

        } catch (error) {
            dispatch(hideLoading())
        }
    }

    const changeEventStatus = async (record, status) => {
        try {
            dispatch(showLoading())
            const response = await axios.post('/api/admin/change-events-status', { eventId: record._id, userId: record.userId, status: status },
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token'),
                    }
                })
            dispatch(hideLoading())
            if (response.data.success) {
                toast.success(response.data.message)
               
                getEventdata()

            }

        } catch (error) {
            toString.error('something went wrong')
            dispatch(hideLoading())
        }
    }

    useEffect(() => {
        getEventdata()
    }, [])

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'name'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenum'
        },
        {
            title: 'Comapny Name',
            dataIndex: 'companyName'
        },
        {
            title: 'About Company',
            dataIndex: 'DescribeCompany'
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt'
        },
        {
            title: 'Status',
            dataIndex: 'status'
        },
        {
            title: 'Actions',
            dataIndex: 'actions',
            render: (text, record) => (
                <div className='d-flex'>

                    {record.status === "pending" && <h1 className='anchor' onClick={() => changeEventStatus(record, 'approved')} >Approved</h1>}
                    {record.status === "approved" && <h1 className='anchor' onClick={() => changeEventStatus(record, 'Block')}>Block</h1>}

                </div>
            )
        },

    ]

    return (

        <Layout>
            <h1 className='page-header'>Event List</h1>
            <Table columns={columns} dataSource={events} />
        </Layout>


    )
}

export default EventList
