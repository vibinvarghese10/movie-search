import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar style={{ backgroundColor: 'blue' }}>
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src="https://i.postimg.cc/q7Hmy2qc/film-clapper-3d-cartoon-icon-600nw-2239181291.webp"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            <b className='text-white'>Movies World</b>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
