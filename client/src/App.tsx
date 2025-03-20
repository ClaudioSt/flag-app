import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [array, setArray] = useState([]);

  const fetchAPI = async () => {
    const response = await axios.get("http://localhost:8080/api");
    setArray(response.data.offense);
    console.log(response.data.offense)
  };

  useEffect(() => {
    fetchAPI();
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-500">
        Hello world!
      </h1>
      {array.map((offense, index) => (
        <div key={index}>
          <p>{offense}

          </p>
          <br>
          </br>
        </div>

      ))}
    </>
  )
}

export default App
