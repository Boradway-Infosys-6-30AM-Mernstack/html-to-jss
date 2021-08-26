import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import AdminLayout from "../../components/AdminLayout";

interface IArticles {
  id: number;
  title: string;
  subtitle: string;
  content: string;
}

const Dashboard = () => {
  const [data, setData] = useState([] as IArticles[]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3010/articles");
    setData(response.data);
  };

  const handleAddBtnClick = () => {
    console.log("Clicked on add btn");
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
                <td>{article.subtitle}</td>
                <td>{article.content}</td>
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
    </AdminLayout>
  );
};

export default Dashboard;
