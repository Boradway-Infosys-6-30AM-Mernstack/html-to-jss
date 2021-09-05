import axios from "axios";
import Interweave from "interweave";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "../components/Header";

interface IArticles {
  id: number;
  title: string;
  subtitle: string;
  content: string;
}

interface Links {
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  youTube: string;
}

const Home = () => {
  const history = useHistory();
  const [articles, setArticles] = useState([] as IArticles[]);
  const [links, setLinks] = useState({} as Links);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3010/articles");
    setArticles(response.data);
  };

  const fetchSocialLinks = async () => {
    const response = await axios.get("http://localhost:3010/socialLinks");
    setLinks(response.data);
  };

  useEffect(() => {
    fetchData();
    fetchSocialLinks();
  }, []);

  return (
    <>
      <div className="w3-top">
        <div className="w3-bar w3-red w3-card w3-left-align w3-large">
          <a
            className="w3-bar-item w3-button w3-hide-medium w3-hide-large w3-right w3-padding-large w3-hover-white w3-large w3-red"
            href="javascript:void(0);"
            title="Toggle Navigation Menu"
          >
            <i className="fa fa-bars"></i>
          </a>
          <a
            href="/"
            className="w3-bar-item w3-button w3-padding-large "
          >
            Home
          </a>
          <a
            href="/dashboard"
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
          >
            Dashboard
          </a>
          <p
            onClick={() => {
              history.push("/about");
            }}
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
          >
            About (history)
          </p>
          <Link
            to="/about"
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
          >
            About (Link)
          </Link>
          <a
            href="#"
            className="w3-bar-item w3-button w3-hide-small w3-padding-large w3-hover-white"
          >
            Link 4
          </a>
        </div>

        <div
          id="navDemo"
          className="w3-bar-block w3-white w3-hide w3-hide-large w3-hide-medium w3-large"
        >
          <a href="#" className="w3-bar-item w3-button w3-padding-large">
            Link 1
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding-large">
            Link 2
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding-large">
            Link 3
          </a>
          <a href="#" className="w3-bar-item w3-button w3-padding-large">
            Link 4
          </a>
        </div>
      </div>
      <Header />
      {articles.map((article, index) => (
        <div className="w3-row-padding w3-light-grey w3-padding-64 w3-container">
          {(index + 1) % 2 == 0 ? (
            <div className="w3-content">
              <div className="w3-third w3-center">
                <i className="fa fa-coffee w3-padding-64 w3-text-red w3-margin-right"></i>
              </div>

              <div className="w3-twothird">
                <h1>{article.title}</h1>
                <h5 className="w3-padding-32"> <Interweave content={article.subtitle} /></h5>

                <Interweave content={article.content} />
              </div>
            </div>
          ) : (
            <div className="w3-content">
              <div className="w3-twothird">
                <h1>{article.title}</h1>
                <h5 className="w3-padding-32"><Interweave content={article.subtitle} /></h5>

                <Interweave content={article.content} />
              </div>
              <div className="w3-third w3-center">
                <i className="fa fa-coffee w3-padding-64 w3-text-red w3-margin-right"></i>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="w3-container w3-black w3-center w3-opacity w3-padding-64">
        <h1 className="w3-margin w3-xlarge">Quote of the day: live life</h1>
      </div>

      <footer className="w3-container w3-padding-64 w3-center w3-opacity">
        <div className="w3-xlarge w3-padding-32 ">
          <a href={links.facebook} target="_blank">
            <i className="fa fa-facebook-official w3-hover-opacity"></i>
          </a>
          <a href={links.instagram} target="_blank">
            <i className="fa fa-instagram w3-hover-opacity"></i>
          </a>
          <a href={links.twitter} target="_blank">
            <i className="fa fa-twitter w3-hover-opacity"></i>
          </a>
          <a href={links.linkedin} target="_blank">
            {" "}
            <i className="fa fa-linkedin w3-hover-opacity"></i>
          </a>
          <a href={links.youTube} target="_blank">
            {" "}
            <i className="fa fa-youtube w3-hover-opacity"></i>
          </a>

          {/* <i className="fa fa-pinterest-p w3-hover-opacity"></i>  */}
        </div>
        <p>
          Powered by{" "}
          <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">
            w3.css
          </a>
        </p>
      </footer>
    </>
  );
};

export default Home;
