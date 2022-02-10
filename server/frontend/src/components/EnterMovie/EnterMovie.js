import { Form, Button, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useEffect, useState } from "react";

function EnterMovie(props) {
  const [loading, setLoading] = useState(true);
  const [prefillData, setPrefillData] = useState({
    genres: [],
    countries: [],
    distComps: [],
    prodComps: [],
    directors: [],
  });
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    axios.get("/api/getformprefill")
    .then((res) => {
      setPrefillData(res.data);
      setLoading(false);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  const handleSubmit = (e) => {
    const results = e.target;
    e.preventDefault();

    let errors = "";
    for (let i of results.formDates.value.trim().split(",")) {
      if (isNaN(i) || i.length !== 8) {
        errors += "Invalid date(s) watched\n"
        break;
      }
    }
    if (isNaN(results.formRuntime.value.trim())) {
      errors += "Invalid runtime\n"
    }
    if (isNaN(results.formYear.value.trim()) || results.formYear.value.trim().length !== 4) {
      errors += "Invalid year\n"
    }
    if (errors !== "") {
      console.log(errors);
      setErrorMsg(errors);
      return;
    }
    
    const dates = results.formDates.value.trim().split(",").filter((i) => {
      return i !== "";
    });
    const title = results.formTitle.value.trim();
    const genres = document.getElementById("genretext").value.trim().split(",").filter((i) => {
      return i !== "";
    });
    const runtime = parseInt(results.formRuntime.value.trim());
    const year = results.formYear.value.trim();
    const rating = results.formRating.value;
    const countries = document.getElementById("countrytext").value.trim().split(",").filter((i) => {
      return i !== "";
    });
    const distComps = document.getElementById("disttext").value.trim().split(",").filter((i) => {
      return i !== "";
    });
    const prodComps = document.getElementById("prodtext").value.trim().split(",").filter((i) => {
      return i !== "";
    });
    const directors = document.getElementById("directtext").value.trim().split(",").filter((i) => {
      return i !== "";
    });
    const erate = parseInt(results.formErate.value);
    const orate = parseInt(results.formOrate.value);
    axios.post("/api/entermovie", {
      uid: props.uid,
      dates: dates,
      title: title,
      genres: genres,
      runtime: runtime,
      year: year,
      rating: rating,
      countries: countries,
      distComps: distComps,
      prodComps: prodComps,
      directors: directors,
      erate: erate,
      orate: orate,
    }).then((res) => {
      setErrorMsg("Submitted successfully");
    }).catch((err) => {
      console.log(err.response);
      setErrorMsg(`Error submitting: ${err.response.status}, ${err.response.data}`);
    });
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
        {errorMsg !== "" && (
          <div>
            {errorMsg.split("\n").map((item) => (<p>{item}</p>))}
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formDates">
            <Form.Label>Date(s) Watched</Form.Label>
            <Form.Control required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control required />
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
            <Form.Control required id="genretext" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRuntime">
            <Form.Label>Runtime</Form.Label>
            <Form.Control required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formYear">
            <Form.Label>Year</Form.Label>
            <Form.Control required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRating">
            <Form.Label>MPAA Rating</Form.Label>
            <Form.Select required>
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
            </Form.Select>
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
            <Form.Control required id="countrytext" />
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
            <Form.Control required id="disttext" />
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
            <Form.Control required id="prodtext" />
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
            <Form.Control required id="directtext" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formErate">
            <Form.Label>Enjoyment Rating</Form.Label>
            <Form.Select required>
              <option value="10">A+</option>
              <option value="9">A</option>
              <option value="8">A-</option>
              <option value="7">B+</option>
              <option value="6">B</option>
              <option value="5">B-</option>
              <option value="4">C+</option>
              <option value="3">C</option>
              <option value="2">C-</option>
              <option value="1">D</option>
              <option value="0">F</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formOrate">
            <Form.Label>Overall Rating</Form.Label>
            <Form.Select required>
              <option value="10">A+</option>
              <option value="9">A</option>
              <option value="8">A-</option>
              <option value="7">B+</option>
              <option value="6">B</option>
              <option value="5">B-</option>
              <option value="4">C+</option>
              <option value="3">C</option>
              <option value="2">C-</option>
              <option value="1">D</option>
              <option value="0">F</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default EnterMovie;