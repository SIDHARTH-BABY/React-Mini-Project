import Table from "react-bootstrap/Table";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from 'axios';
import { hideLoading, showLoading } from '../redux/alertsSlice'

import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'



function Example() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [slot, setSlots] = useState([]);
  const [apps, setapps] = useState([]);
  const dispatch = useDispatch();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getSlot = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/getslot", {});
      dispatch(hideLoading());
      if (response.data.success) {
        setSlots(response.data.data);
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const getApps = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.get("/api/admin/getapps");
      dispatch(hideLoading());
      if (response.data.success) {
        setapps(response.data.data);
        toast.success(response.data.message)

      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  const slotBook = async (app, slot, status) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/admin/slotbook",
        { appId: app, slotId: slot, status: "Booked" },
        {}
      );
      dispatch(hideLoading());
      toast.success(response.data.message)
      window.location.reload();
    } catch (error) {
      dispatch(hideLoading());
      toast.error('something went wrong')

    }
  };
  console.log(slot);

  useEffect(() => {
    getSlot();
    getApps();
  }, []);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Id</th>
          <th>Slot</th>
          <th>Slot status</th>
          <th>Booked Slot</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {slot.map((slot, index) => {
          return (
            <tr>
              <td>{slot._id}</td>
              <td>{slot.section}</td>
              <td>{slot.no}</td>
              <td><h5 style={{ cursor: 'pointer' }}><span class="badge bg-info text-dark">{slot.status}</span></h5></td>
              <td>
                <>
                  {
                    slot.status === 'Booked' ? <h5 style={{ cursor: 'pointer' }}><span class="badge bg-warning text-dark">Done</span></h5> :

                      <Button variant="primary" onClick={handleShow}>
                        Book Slot
                      </Button>}

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Book Slot</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                      {apps.map((apps, index) => {
                        return (
                          <div
                            className="box"
                            onClick={() =>
                              slotBook(apps._id, slot._id, slot.status)
                            }
                          >
                            <span>{apps.name}</span>
                            <br />
                            <span>{apps.phone}</span>
                          </div>
                        );
                      })}
                    </Modal.Body>

                    <Modal.Footer>

                      <Button variant="primary" onClick={handleClose}>
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default Example;
