import { Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function EnterMovie() {
  const [loading, setLoading] = useState(true);
  const [prefillData, setPrefillData] = useState({
    genres: [],
    countries: [],
    distComps: [],
    prodComps: [],
    directors: [],
  });
  // const [genres, setGenres] = useState([]);
  // const [countries, setCountries] = useState([]);
  // const [distComps, setDistComps] = useState([]);
  // const [prodComps, setProdComps] = useState([]);
  // const [directors, setDirectors] = useState([]);

  useEffect(() => {
    axios.get("/api/getformprefill")
    .then((res) => {
      setPrefillData(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleSubmit = () => {

  };

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }
  else {
    return (
      <div>
        <h1>Enter Movie</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDates">
            <Form.Label>Date(s) Watched</Form.Label>
            <Form.Control placeholder="MMDDYYYY,MMDDYYYY" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGenres">
            <Form.Label>Genre(s)</Form.Label>
            <Dropdown>
              <Dropdown.Toggle>Select Genre(s)</Dropdown.Toggle>
              <Dropdown.Menu>
                {prefillData.genres.map((item) => (
                  <Dropdown.Item onClick={() => document.getElementById("genretext").value = document.getElementById("genretext").value + `,${item}`}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control id="genretext" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRuntime">
            <Form.Label>Runtime</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formYear">
            <Form.Label>Year</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formCountries">
            <Form.Label>Countries</Form.Label>
            <Dropdown>
              <Dropdown.Toggle>Select Countries</Dropdown.Toggle>
              <Dropdown.Menu>
                {prefillData.countries.map((item) => (
                  <Dropdown.Item onClick={() => document.getElementById("countrytext").value = document.getElementById("countrytext").value + `,${item}`}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control id="countrytext" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDistComps">
            <Form.Label>Distribution Companies</Form.Label>
            <Dropdown>
              <Dropdown.Toggle>Select Distribution Companies</Dropdown.Toggle>
              <Dropdown.Menu>
                {prefillData.distComps.map((item) => (
                  <Dropdown.Item onClick={() => document.getElementById("disttext").value = document.getElementById("disttext").value + `,${item}`}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control id="disttext" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formProdComps">
            <Form.Label>Production Companies</Form.Label>
            <Dropdown>
              <Dropdown.Toggle>Select Production Companies</Dropdown.Toggle>
              <Dropdown.Menu>
                {prefillData.prodComps.map((item) => (
                  <Dropdown.Item onClick={() => document.getElementById("prodtext").value = document.getElementById("prodtext").value + `,${item}`}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control id="prodtext" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDirectors">
            <Form.Label>Director(s)</Form.Label>
            <Dropdown>
              <Dropdown.Toggle>Select Director(s)</Dropdown.Toggle>
              <Dropdown.Menu>
                {prefillData.directors.map((item) => (
                  <Dropdown.Item onClick={() => document.getElementById("directtext").value = document.getElementById("directtext").value + `,${item}`}>{item}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control id="directtext" />
          </Form.Group>

          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default EnterMovie;