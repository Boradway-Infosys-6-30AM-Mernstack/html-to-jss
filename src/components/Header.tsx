import axios from "axios";
import React, { useEffect, useState } from "react";

interface IHeader {
  title: string;
  subtitle: string;
}

const Header = () => {
  const [data, setData] = useState({} as IHeader);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:3010/header");
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <header
      className="w3-container w3-red w3-center"
      style={{ padding: "128px 16px" }}
    >
      <h1 className="w3-margin w3-jumbo">{data.title}</h1>
      <p className="w3-xlarge">{data.subtitle}</p>
      <button className="w3-button w3-black w3-padding-large w3-large w3-margin-top">
        Get Started
      </button>
    </header>
  );
};

export default Header;
