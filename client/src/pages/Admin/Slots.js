import React from 'react'
import Layout from '../../components/Layout'



import { useState,useEffect } from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { useDispatch} from "react-redux";
import axios from "axios";

import { hideLoading, showLoading } from '../../redux/alertsSlice'
import toast from "react-hot-toast";
import { Table, Tag } from "antd";
import Slotform from '../../components/Slotform';


function Slots() {

  
    const dispatch = useDispatch();
    const addSlot = async (values) => {
      try {
        dispatch(showLoading());
        const response = await axios.post("/api/admin/slot", values);
        dispatch(hideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          window.location.reload(); 
        }
      } catch (error) {
        toast.error("something went wrong");
      }
    };
  
  return (
   <Layout>
     <div className="slotadd">
        <div className="slot-form card p-2">
          <h1 className="card-title">Add Slots</h1>
          <Form layout="verticall" onFinish={addSlot}>
            <Form.Item label="Section" name="section">
              <Input type="text" placeholder="section" />
            </Form.Item>
            <Form.Item label="Number" name="no">
              <Input placeholder="Number" type="Number" />
            </Form.Item>
            <Button className="primary-button" htmlType="submit">
              Choose
            </Button>
          </Form>
        </div>
      </div>

  <Slotform/>
   </Layout>

  )
}

export default Slots
