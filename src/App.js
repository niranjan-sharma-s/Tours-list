import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
//Own API
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);
  const [tours, setTours] = useState([]);

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  if (tours.length === 0) {
    return (
      <>
        <div className="title">
          <h2>No tours left</h2>

          <button className="btn" onClick={fetchTours}>
            Refresh
          </button>
        </div>
      </>
    );
  }
  return (
    <main>
      {loading && <Loading />}
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
