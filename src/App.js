import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { API_KEY } from "./config.js";
import "./App.css";
import { PongSpinner } from "react-spinners-kit";

function App() {
  const [dailyImage, setDailyImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = dailyImage.date;
  const formattedDate = dayjs(date).format("DD MMM YYYY");
  const dayMonth = dayjs(date).format("DD MMM");

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setDailyImage(data))
      .then(() => setLoading(false));
  }, []);

  // if (loading) {
  //   return (
  //     <div className="Loading">
  //       <PongSpinner color="#fafafa" />
  //       <p>Loading...</p>
  //     </div>
  //   );
  // } else {
  return (
    <div className="App">
      <header className="App-header">
        <h1>NASA's Astronomy Picture of the Day</h1>
      </header>

      {/* conditional loading on main page */}
      {loading ? (
        <div className="Loading">
          <PongSpinner color="#fafafa" />
          <p>Loading...</p>
        </div>
      ) : (
        <main>
          <img src={dailyImage.url} alt="stars of the day" />

          <section>
            <div className="content">
              <h2>Title: {dailyImage.title}</h2>
              <h3>Image credit & copyright: {dailyImage.copyright}</h3>
              <h4>
                Date: {formattedDate}
                {/* {dailyImage.date} */}
              </h4>
              <br />
              <p>{dailyImage.explanation} </p>
            </div>

            <div>
              {/* TODO: see how single digit day displays and change it to Mom's Bday */}
              {dayMonth === "28 Jun" ? (
                <p> Happy Birthday, Mom!!!</p>
              ) : (
                console.log("surprise tbd")
              )}
            </div>
          </section>
        </main>
      )}

      <footer>
        <p>redesigned by K.C.D 2023</p>
        <hr />
        <hr />
        <p>
          See original at{" "}
          <a
            href="https://apod.nasa.gov/apod/astropix.html"
            target="blank"
            nonref
          >
            NASA
          </a>
        </p>
      </footer>
    </div>
  );
  // }
}

export default App;
