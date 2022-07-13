import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Link className='nav-link' to="/Albums">Albums</Link>
            <Link className='nav-link' to="/">Users</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;