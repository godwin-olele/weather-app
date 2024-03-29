import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const [location, setLocation] = useState(" ");
  const [guide, setGuide] = useState(true);
  const [bottom, setBottom] = useState(false);

  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${process.env.REACT_APP_WEATHER_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(baseUrl).then((response) => {
        setData(response.data);
        setBottom(true);
      });
      setLocation("");
      setGuide(false);
    }
  };

  return (
    <>
      <div className="main-container bg-[url('https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-center bg-cover w-full h-screen relative flex items-center justify-center overflow-hidden">
        <div className="z-20 overlay main-2">
          <div className="flex justify-center items-center">
            <input
              type="search"
              placeholder="Enter country or city"
              value={location.trim()}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              className=" w-[250px] py-[10px] px-[17px] outline-none rounded-[50px] border-none shadow-2xl mb-[3rem]"
            />
          </div>
          {guide ? (
            <div className="w-[250px] h-[auto] my-0 mx-auto p-[20px] rounded-[20px] guide">
              <p className="text-[#fff] font-bold">
                Enter a Country, Continent or a state into the search bar above
              </p>
            </div>
          ) : null}
          <div className="mt-[3rem] z-20">
            <div className="flex justify-between items-center w-full mb-[4rem]">
              <div className=" w-[100%] text-left">
                <div>
                  <p className="text-[#fff] text-[22px]">{data.name}</p>
                </div>
                <div>
                  {data.main ? (
                    <h1 className="text-[3rem] text-[#fff] mt-[1rem] temp">
                      {data.main.temp.toFixed()}°F
                    </h1>
                  ) : null}
                </div>
              </div>
              <div className="-rotate-90 text-center">
                {data.weather ? (
                  <h1 className="text-[#fff] text-[20px] font-bold">
                    {data.weather[0].description}
                  </h1>
                ) : null}
              </div>
            </div>
            <div className="w-[80px] h-[80px] flex justify-center items-center my-0 mx-[auto]">
              {data.weather ? (
                <img
                  src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                  alt="weather icon"
                  className="object-cover"
                  width={300}
                />
              ) : null}
            </div>
            {bottom ? (
              <div className="h-[auto] w-[330px] p-[20px] rounded-[20px] absolute bottom-[2rem] right-0 left-0 my-0 mx-auto flex justify-between items-center bottom-container">
                <div className=" text-center">
                  {data.main ? (
                    <p className="text-[#fff] text-[22px] feels-like">
                      {data.main.feels_like.toFixed()}°F
                    </p>
                  ) : null}
                  <p className="text-[#fff] text-[13px] feels-like-text">
                    Feels Like
                  </p>
                </div>
                <div className="text-center">
                  {data.main ? (
                    <p className="text-[#fff] text-[22px] humidity">
                      {data.main.humidity}%
                    </p>
                  ) : null}
                  <p className="text-[#fff] text-[13px] humidity-text">
                    Humidity
                  </p>
                </div>
                <div className="text-center">
                  {data.wind ? (
                    <p className="text-[#fff] text-[22px] wind-speed">
                      {data.wind.speed.toFixed()} MPH
                    </p>
                  ) : null}
                  <p className="text-[#fff] text-[13px] wind-speed-text">
                    Wind Speed
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/*
        <video
          autoplay
          loop
          muted
          class="absolute z-10 w-auto min-w-full min-h-full max-w-none p-[30px] object-cover"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-white-sand-beach-and-palm-trees-1564-large.mp4"
            type="video/mp4"
          />
        </video> */}
      </div>
    </>
  );
}
