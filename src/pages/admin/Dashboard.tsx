import axios from "axios";
import Interweave from "interweave";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import ReactQuill from "react-quill"
import AdminLayout from "../../components/AdminLayout";
import 'react-quill/dist/quill.snow.css';

interface IArticles {
  id: number;
  title?: string;
  subtitle?: string;
  content?: string;
}



const Dashboard = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleAddClose = () => setShowAdd(false);

  const [data, setData] = useState([] as IArticles[]);

  const [inputVal, setInputVal] = useState({
    title: '',
    subtitle: '',
    content: ''
  } as IArticles);


  const onEdit = (id: number) => {

    const getDataById = data.find((dat) => dat.id === id);

    setInputVal({
      title: getDataById?.title,
      subtitle: getDataById?.subtitle,
      content: getDataById?.content,
      id: getDataById?.id,
    } as IArticles);
    handleShow();

  }


  const addItem = async () => {
    const response = await axios.post('http://localhost:3010/articles', {
      title: inputVal.title,
      subtitle: inputVal.subtitle,
      content: inputVal.content
    });

    setInputVal({
      title: '',
      subtitle: '',
      content: ''
    } as IArticles);
    if (response.status === 201) {
      getData();

    }
    handleAddClose();
  }

  const getData = async () => {
    const response = await axios.get('http://localhost:3010/articles');
    setData(response.data);
  }
  useEffect(() => {
    getData();
  }, []);









  const updateItem = async (id: number) => {
    const response = await axios(`http://localhost:3010/articles/${id}`, {
      method: 'PATCH',
      data: {
        title: inputVal.title,
        subtitle: inputVal.subtitle,
        content: inputVal.content,
      },
    });

    if (response.status === 200) {
      getData();
    }

    handleClose();

  }


  const removeItem = async (id: number) => {
    const response = await axios.delete(`http://localhost:3010/articles/${id}`);

    if (response.status === 200) {
      getData();
    }
  }





  if (data.length === 0) {
    return <h1>Loading Please Wait....</h1>
  }



  return (
    <AdminLayout>
      <div className="head-container">
        <p className="page-title">Articles</p>
        <Button variant="success" onClick={handleShowAdd}>
          ADD
        </Button>
      </div>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Subtitle</th>
              <th>Content</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((article, index) => (
              <tr key={index}>
                <td>{article.id}</td>
                <td>{article.title}</td>
                <td> <Interweave content={article.subtitle} /></td>
                <td>
                  <Interweave content={article.content} />
                </td>
                <td>
                  <Button variant="primary" onClick={() => onEdit(article.id)} >Edit</Button>
                  <Button variant="danger" onClick={() => removeItem(article.id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showAdd} onHide={handleAddClose} >
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              onChange={(e) => setInputVal(prev => (
                { ...prev, title: e.target.value }
              ))}
              value={inputVal.title}
              type="text"
              placeholder="Enter Article's title"

            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Subtitle</Form.Label>
            <ReactQuill
              onChange={(e) => setInputVal(prev => (
                { ...prev, subtitle: e }
              ))}
              value={inputVal.subtitle}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Content</Form.Label>
            <ReactQuill
              onChange={(e) => setInputVal(prev => (
                { ...prev, content: e }
              ))}
              value={inputVal.content} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose} >
            Close
          </Button>
          <Button variant="primary" onClick={addItem}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Article</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={(e) => setInputVal(prev => (
                  { ...prev, title: e.target.value }
                ))}
                value={inputVal.title}
                name="title"
                type="text"
                placeholder="Enter Article's title"

              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Subtitle</Form.Label>
              <ReactQuill
                onChange={(e) => setInputVal(prev => (
                  { ...prev, subtitle: e }
                ))}
                value={inputVal.subtitle}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
              <Form.Label>Content</Form.Label>
              <ReactQuill
                onChange={(e) => setInputVal(prev => (
                  { ...prev, content: e }
                ))}
                value={inputVal.content}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => updateItem(inputVal.id)}>
              Edit Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
