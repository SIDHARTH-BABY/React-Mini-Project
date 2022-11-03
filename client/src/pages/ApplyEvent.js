
import { Button, Col, Form, Input, Row } from 'antd';
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import Layout from '../components/Layout';
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App';
import React, { useContext } from "react"; 
import axios from 'axios';



function ApplyEvent() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useContext(userContext);


  console.log(user, 'apply event annneeeeee');
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/apply-event', { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
      dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message)
        toast("redirecting to login page")
        navigate('/login')
        console.log(values);
      } else {
        toast.error(response.data.message)
      }

    } catch (error) {
      dispatch(hideLoading())
      toast.error('something went wrong')

    }

  }

  return (
    <Layout>
      <h1 className='page-title'>Apply for Event</h1>
      <hr />
      <Form layout='vertical' onFinish={onFinish}>
        <h1 className='card-titlee'>Personal Information</h1>
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Name' name='name' rules={[{ require: true }]}>
              <Input placeholder='Name' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Address' name='address' rules={[{ require: true }]}>
              <Input placeholder='Address' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='City' name='city' rules={[{ require: true }]}>
              <Input placeholder='City' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='State' name='state' rules={[{ require: true }]}>
              <Input placeholder='State' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='E-mail' name='email' rules={[{ require: true }]}>
              <Input placeholder='E-mail' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Phonenumber' name='phonenum' rules={[{ require: true }]}>
              <Input placeholder='Phonenumber' />
            </Form.Item>
          </Col>

        </Row>
        <hr />
        <h1 className='card-titlee'>Company Information</h1>

        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Company Name' name='companyName' rules={[{ require: true }]}>
              <Input placeholder='Company Name' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Describe Company' name='DescribeCompany' rules={[{ require: true }]}>
              <Input placeholder='DescribeCompany' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Unique About Your Solution' name='uniqueAboutSolution' rules={[{ require: true }]}>
              <Input placeholder='Unique About Your Solution' />
            </Form.Item>
          </Col>

          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Explain Your Revenue Model' name='revenueModel' rules={[{ require: true }]}>
              <Input placeholder='Explain Your Revenue Model' />
            </Form.Item>
          </Col>



        </Row>
        <div className="d-flex justify justify-content-end">
          <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
        </div>
      </Form>
    </Layout>
  )
}

export default ApplyEvent
