import axios from "axios";
import React, { useState, useEffect } from "react";

const Form = ({
  handleInput,
  addName,
  name,
  setName,
  nameList,
  deleteName,
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://argo-back.herokuapp.com/");
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <span>En cours de chargement....</span>
  ) : (
    <main>
      <h2>Ajouter un(e) Argonaute</h2>
      <form className="new-member-form" onSubmit={handleInput}>
        <label htmlFor="name">Nom de l&apos;Argonaute</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Charalampos"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit" onClick={addName}>
          Envoyer
        </button>
        <button type="submit" onClick={() => deleteName(name)}>
          Supprimer
        </button>
      </form>

      <h2>Membres de l'équipage</h2>
      <section className="member-list">
        {nameList.length > 0 &&
          nameList.map((argo, index) => {
            return (
              <div className="member-item" key={index}>
                {argo}
              </div>
            );
          })}
        {data.map((elem, index) => {
          return (
            <div className="member-item" key={index}>
              {elem.name}
            </div>
          );
        })}
        <div className="member-item">Gennadios</div>
        <div className="member-item">Lysimachos</div>
      </section>
    </main>
  );
};

export default Form;
