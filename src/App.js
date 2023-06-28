import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { API_KEY } from "./config.js";
import "./App.css";

function App() {
  const [dailyImage, setDailyImage] = useState([]);
  const [loading, setLoading] = useState(true);
  const date = dailyImage.date
  const formattedDate = dayjs(date).format("d MMM YYYY");
  console.log(formattedDate)

   useEffect(() => {
    fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`
      // "https://api.nasa.gov/planetary/apod?api_key=J09b7cOcrl56aoDGt5VrFrSYAZeSAlZlWz7S1Hd5"
    )
      .then((response) => response.json())
      .then((data) => setDailyImage(data))
      .then(() => setLoading(false));
  }, []);

  console.log("nasa list", dailyImage);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>NASA's Astronomy Picture of the Day</h1>
      </header>

      <main>
        <img src={dailyImage.url} alt="stars of the day" />
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
      </main>

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
}

export default App;
