import { Navbar, Nav, Button } from 'react-bootstrap';

function MMNavbar() {
  return (
    <div>
      <Navbar bg="primary">
        <Nav>
          <Button href="/">Home</Button>
          <Button href="/entermovie">Enter Movie</Button>
          <Button href="/movielist">Movie List</Button>
        </Nav>
      </Navbar>
    </div>
  );
}

export default MMNavbar;