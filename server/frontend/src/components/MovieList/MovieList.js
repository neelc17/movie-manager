import { Table } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function MovieList(props) {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const rateMap = ["F", "D", "C-", "C", "C+", "B-", "B", "B+", "A-", "A", "A+"];

  useEffect(() => {
    axios.post("/api/getusermovies", { uid: props.uid })
    .then((res) => {
      for (let i in res.data) {
        for (let j in res.data[i].dates) {
          res.data[i].dates[j] = new Date(parseInt(res.data[i].dates[j].substring(4)), parseInt(res.data[i].dates[j].substring(0, 2)) - 1, parseInt(res.data[i].dates[j].substring(2, 4)));
        }
      }
      console.log(res.data);
      setLoading(false);
      setMovies(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  else {
    return (
      <div>
        <h1>Movie List</h1>
        <Table bordered hover>
          <thead>
            <tr>
              <th>Dates Watched</th>
              <th>Title</th>
              <th>Year</th>
              <th>Runtime</th>
              <th>MPAA Rating</th>
              <th>Directors</th>
              <th>Genres</th>
              <th>Countries</th>
              <th>Distribution Companies</th>
              <th>Production Companies</th>
              <th>Enjoyment Rating (ER)</th>
              <th>Overall Rating (OR)</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((item) => (
              <tr>
                <td>{item.dates.map((item1) => (<p>{`${item1.getMonth() + 1}/${item1.getDate()}/${item1.getFullYear()}`}</p>))}</td>
                <td>{item.title}</td>
                <td>{item.year}</td>
                <td>{item.runtime}</td>
                <td>{item.rating}</td>
                <td>{item.other[4].map((item1) => (<p>{item1.name}</p>))}</td>
                <td>{item.other[0].map((item1) => (<p>{item1.name}</p>))}</td>
                <td>{item.other[1].map((item1) => (<p>{item1.name}</p>))}</td>
                <td>{item.other[2].map((item1) => (<p>{item1.name}</p>))}</td>
                <td>{item.other[3].map((item1) => (<p>{item1.name}</p>))}</td>
                <td>{rateMap[item.erate]}</td>
                <td>{rateMap[item.orate]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MovieList;