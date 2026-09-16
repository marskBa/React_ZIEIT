import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com";

function App() {
  const [loading, setloading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const restTour = tours.filter((el) => el.id !== id);
    setTours(restTour);
  };

  const fetchTours = async () => {
    setloading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const toursData = await response.json();
      setloading(false);
      setTours(toursData);
    } catch (error) {
      console.log(error);
      try {
        const localData = require("./data").default;
        setloading(false);
        setTours(localData);
      } catch (localError) {
        setloading(false);
        console.log(localError);
      }
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main>
        <div className="title">
          <h2>no tours left</h2>
          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
