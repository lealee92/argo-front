import { useState } from "react";
import Form from "./Form";
import axios from "axios";

const Main = () => {
  // states for name and name List
  const [name, setName] = useState(" ");
  const [nameList, setNameList] = useState([]);

  // update name value before adding it to the nameList
  const handleInput = (e) => {
    setName(e.target.value);
  };

  // add input value to nameList
  const addName = async (e) => {
    e.preventDefault();
    console.log(name);
    const request = {
      name: name,
    };
    try {
      const resp = await axios.post(
        "https://argo-back.herokuapp.com/create",
        request
      );
      console.log(resp.data);
    } catch (error) {
      console.log(error.message);
    }

    const newNameList = [name, ...nameList];
    setNameList(newNameList);
    setName("");
  };

  return (
    <Form
      handleInput={handleInput}
      addName={addName}
      name={name}
      setName={setName}
      nameList={nameList}
    />
  );
};

export default Main;
