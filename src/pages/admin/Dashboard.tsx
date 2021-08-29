import axios from "axios";
import Interweave from "interweave";
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import ReactQuill from "react-quill";
import AdminLayout from "../../components/AdminLayout";

interface IArticles {
  id?: number;
  title: string;
  subtitle: string;
  content: string;
}

const Dashboard = () => {
  const [data, setData] = useState([] as IArticles[]);

  const [value, setValue] = useState({} as IArticles);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3010/articles");
    setData(response.data);
  };

  const handleAddBtnClick = () => {
    setShow(true);
  };

  const handleChange = (event: any) => {
    event.persist();
    console.log(event.target.name, event.target.value);
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  const handleContentChange = (content: any,subtitle:any) => {
    setValue({ ...value, content: content,subtitle:subtitle});
  };

  const addArticle = async () => {
    const response = await axios.post("http://localhost:3010/articles", value);
    handleClose();
    fetchData();
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <AdminLayout>
      <div className="head-container">
        <p className="page-title">Articles</p>
        <Button onClick={handleAddBtnClick} variant="success">
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
                <td> <Interweave content={article.content} /></td>
                <td>
                  <Interweave content={article.content} />
                </td>
                <td>
                  {" "}
                  <Button variant="primary">Edit</Button>{" "}
                  <Button variant="danger">Delete</Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Article</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              value={value.title}
              type="text"
              placeholder="Enter Article's title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
            <Form.Label>Subtitle</Form.Label>
            <ReactQuill value={value.subtitle} onChange={handleContentChange} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
            <Form.Label>Content</Form.Label>
            <ReactQuill value={value.content} onChange={handleContentChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addArticle}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </AdminLayout>
  );
};

export default Dashboard;
