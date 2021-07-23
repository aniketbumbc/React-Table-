import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import * as ReactBootStrap from 'react-bootstrap';

const Blocks = () => {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [blockInfo, setBlockInfo] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getBlocksData();
  }, []);

  const getBlocksData = async () => {
    try {
      const data = await axios.get(
        'https://blockchain.info/blocks/1627026861249?format=json'
      );
      setBlocks(data.data);
      setLoading(true);
    } catch (e) {
      console.log(e);
    }
  };

  const rowEvents = {
    onClick: (e, row) => {
      setBlockInfo(row);
      toggle();
    },
  };

  const toggle = () => {
    setShowModal(handleShow);
  };

  const ModalContent = () => {
    return (
      <ReactBootStrap.Modal show={show} onHide={handleClose}>
        <ReactBootStrap.Modal.Header>
          <ReactBootStrap.Modal.Title>Block Info</ReactBootStrap.Modal.Title>
        </ReactBootStrap.Modal.Header>
        <ReactBootStrap.Modal.Body>
          <ul>
            <li>{blockInfo.height}</li>
            <li>{blockInfo.time}</li>
          </ul>
        </ReactBootStrap.Modal.Body>
        <ReactBootStrap.Modal.Footer>
          <ReactBootStrap.Button variant='secondary' onClick={handleClose}>
            Close
          </ReactBootStrap.Button>
        </ReactBootStrap.Modal.Footer>
      </ReactBootStrap.Modal>
    );
  };

  const columns = [
    { dataField: 'hash', text: ' Hash' },
    { dataField: 'height', text: ' Heigth' },
    { dataField: 'time', text: ' Time' },
  ];

  return (
    <div>
      <h2> Blocks Data </h2>
      {loading ? (
        <BootstrapTable
          keyField='hash'
          data={blocks}
          columns={columns}
          pagination={paginationFactory()}
          rowEvents={rowEvents}
        />
      ) : (
        <ReactBootStrap.Spinner animation='border' />
      )}

      {show ? <ModalContent /> : null}
    </div>
  );
};

export default Blocks;
