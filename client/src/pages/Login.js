import React from 'react'
import './Register'
import { Form, Input, Button } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from "react-redux"
import axios from 'axios'
import { hideLoading, showLoading } from '../redux/alertsSlice'




function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values) => {

    try {
      dispatch(showLoading())
      const response = await axios.post('/api/user/login', values)
      dispatch(hideLoading())
      if (response.data.success) {


        toast.success(response.data.message)
        toast("redirecting to home page")
        localStorage.setItem("token", response.data.data)
        navigate('/')
        console.log(values);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error('something went wrong')

    }
  }
  return (
    <div className='authentication'>
      <div className='aunthentication-form card p-3'>
        <h1 className='card-title'>Welcome Back</h1>
        <Form layout='vertical' onFinish={onFinish}>

          <Form.Item label='Email' name='email'>
            <Input placeholder='Email' />
          </Form.Item>

          <Form.Item label='Password' name='password'>
            <Input placeholder='Password' type='password' />
          </Form.Item>
          <div className='d-flex flex-column'>
            <Button className='primary-button my-2 full-width-button' htmlType='submit'>Login</Button>

            <Link to='/register' className='anchor my-2'>Register</Link>
          </div>

        </Form>
      </div>

    </div>
  )
}

export default Login
