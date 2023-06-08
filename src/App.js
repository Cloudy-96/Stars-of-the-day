import { useState, useEffect } from "react";
import { API_KEY } from "./config.js";
import "./App.css";

const initialImage = {
  copyright: "loading...",
  date: "loading...",
  explanation: "loading...",
  hdurl: "loading...",
  media_type: "loading...",
  service_version: "loading...",
  title: "loading...",
  url: "https://api.nasa.gov/assets/img/favicons/favicon-192.png",
};

function App() {
  const [dailyImage, setDailyImage] = useState(initialImage);
 const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then(function (response) {
        console.log(response);
        return response.json();
      })
      .then((data) => setDailyImage(data))
    .then(() => setLoading(false));
    // .then(console.log("dailyImage:::::::", dailyImage.url));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Space of the day</h1>
      </header>

      <main>
        <img src={dailyImage.url} alt="stars of the day" />
        <h2>Title: {dailyImage.title}</h2>
        <p>copyright: {dailyImage.copyright}</p>
        <p>date: {dailyImage.date}</p>
        <p>{dailyImage.explanation} </p>
      </main>
    </div>
  );
}

export default App;
