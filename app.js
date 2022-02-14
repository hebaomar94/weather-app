/* Global Variables */

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
// Personal API Key
//HTTP Request: It is an action to be performed on a resource identified by a given request-url.
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=13b881c2c86ff044b3b2754f6bcb14e9&units=metric";
const dateElement = document.getElementById("date");
const temp = document.getElementById("temp");
const content = document.getElementById("content");

document.getElementById("generate").addEventListener("click", performAction);

async function performAction() {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;
  try {
    const data = await getData(weatherUrl, zipCode, apiKey);
    await postData("/add", {
      temp: data.main.temp,
      date: newDate,
      content: feelings,
    });
    await updateUI();
  } catch (err) {
    console.log(err);
  }
}
//Dynamic UI Updates

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    dateElement.innerHTML = `date:${allData.date}`;
    temp.innerHTML = `temperature:${allData.temp}`;
    content.innerHTML = `feel:${allData.content}`;
  } catch (error) {
    console.log("error", error);
  }
};
//GET: GET is an HTTP request method used to request data from a resource
const getData = async (weatherUrl, zipCode, apiKey) => {
  //const res=AWAIT FETCH
  const res = await fetch(weatherUrl + zipCode + apiKey);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error".error);
  }
};
//POST is an HTTP request method that requests the webserver to accept the data enclosed in the body of the request message.
const postData = async (url = "", data = {}) => {
  //Asynchronous JavaScript with Fetch
  const request = await fetch(url, {
    method: "POST", // methods are GET, POST, PUT, DELETE, etc.
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), //must match body type
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
//handle error
