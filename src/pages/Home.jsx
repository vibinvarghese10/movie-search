import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Pagination from 'react-bootstrap/Pagination';
import Carousel from 'react-bootstrap/Carousel';
import './Home.css';

const APIKEY = "6bedebd8";
const BASE_URL = "http://www.omdbapi.com/";

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 6;
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery) return;
  
    try {
      const response = await fetch(`${BASE_URL}?s=${searchQuery}&apikey=${APIKEY}&page=${currentPage}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data.Search || []);
      setTotalPages(Math.ceil(data.totalResults / moviesPerPage));
    } catch (error) {
      console.error("Error fetching search results:", error.message);
      alert(`Error fetching search results: ${error.message}`);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    handleSearch();
  };

  const handleViewDetails = (id) => {
    navigate(`/movie/${id}`);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxPageNumbersToShow = 25;
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow - 1);

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
          {page}
        </Pagination.Item>
      );
    }

    return items;
  };

  return (
    <div>
      <Header />
      <Container className="mt-4">
        {/* Search Field */}
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search movies here.."
            aria-label="Search"
            aria-describedby="basic-addon2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="primary" id="button-addon2" onClick={handleSearch}>
            Search
          </Button>
        </InputGroup>

        {/* Carousel for Trending Movies */}
        <Carousel className="mb-4 small-carousel">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.postimg.cc/Dw30CV6k/b4a1ba87123937-5daeb6af5f27c.jpg"
              alt="First slide"
            />
            <Carousel.Caption className="carousel-caption">
              <h5>Kaithi</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.postimg.cc/N0gzkMry/706b9474134343-5c239806af449.jpg"
              alt="URI"
            />
            <Carousel.Caption className="carousel-caption">
              <h5>Second slide label</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://i.postimg.cc/43xmk69X/JM2-INTL-30-Sht-BRIDGE-03-e1575889045252.jpg"
              alt="Jumanji"
            />
            <Carousel.Caption className="carousel-caption">
              <h5>Jumanji</h5>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>

        {/* Movies Grid */}
        <Row>
          {movies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage).map(movie => (
            <Col key={movie.imdbID} sm={12} md={6} lg={4} className="mb-4">
              <Card className="small-card">
                <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
                <Card.Body>
                  <Card.Title>{movie.Title}</Card.Title>
                  <Button variant="primary" onClick={() => handleViewDetails(movie.imdbID)}>View Details</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        <Pagination>
          <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
          {renderPaginationItems()}
          <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        </Pagination>
      </Container>
    </div>
  );
}

export default Home;
