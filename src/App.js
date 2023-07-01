import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { API_KEY } from "./config.js";
import "./App.css";
import { PongSpinner } from "react-spinners-kit";
import { useWindowSize } from "@react-hook/window-size";
import Confetti from "react-confetti";

const key = "3NhpTxAbv0jFQIWZrIFCMfiLTTScksKmfkp00jgN";

function App() {
  const [dailyImage, setDailyImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFalling, setIsFalling] = useState(false);
  const [hasFallen, setHasFallen] = useState(false);
  const [width, height] = useWindowSize();
  const date = dailyImage.date;
  const formattedDate = dayjs(date).format("DD MMM YYYY");
  const dayMonth = dayjs(date).format("DD MMM");

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`)
      .then((response) => response.json())
      .then((data) => setDailyImage(data))
      .then(() => setLoading(false))
      .then(() => {
        if (dayMonth === "02 Jul") {
          setIsFalling(true);

          setTimeout(() => {
            setIsFalling(false);
          }, 12000);
        }
      })
      .then(() => setHasFallen(true))
      .then(() => {
        if (hasFallen) {
          // setHasFallen(true);
          setIsFalling(false);
        }
      });
  }, []);

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
          <img
            className="dailyImage"
            src={dailyImage.url}
            alt="stars of the day"
          />

          <section>
            <div>
              {dayMonth === "02 Jul" ? (
                <div className="mom">
                  {" "}
                  {isFalling ? (
                    <div>
                      <Confetti width={width} height={height} />{" "}
                      <h2>🥳 Happy Birthday, Mom!!! 🥳</h2>
                      <h3>You mean the universe to me</h3>
                      <p>🌌</p>
                    </div>
                  ) : (
                    <div>
                      <h2>Happy Birthday, Mom!!!</h2>
                      <h3>You mean the universe to me</h3>
                      <p>🌌</p>
                    </div>
                  )}
                </div>
              ) : (
                console.log("surprise tbd")
              )}
            </div>

            <div className="content">
              <h2>Title: {dailyImage.title}</h2>
              <h3>Image credit & copyright: {dailyImage.copyright}</h3>
              <h4>Date: {formattedDate}</h4>
              <br />
              <p>{dailyImage.explanation} </p>
            </div>
          </section>
        </main>
      )}

      <footer>
        <p>Redesigned by K.C.D 2023</p>
        <hr />
        <hr />
        <p>
          See original at{" "}
          <a href="https://apod.nasa.gov/apod/astropix.html" target="blank">
            NASA
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
