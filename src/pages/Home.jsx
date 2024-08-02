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

const APIKEY = "47de2b9e8b2462b53975d18185ac40bf";
const BASE_URL = "https://api.themoviedb.org/3";
const SEARCH_URL = `${BASE_URL}/search/movie?api_key=${APIKEY}&query=`;
const TRENDING_URL = `${BASE_URL}/trending/movie/week?api_key=${APIKEY}`;

function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const moviesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch(TRENDING_URL);
        const data = await response.json();
        setTrendingMovies(data.results);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery) return;

    try {
      const response = await fetch(`${SEARCH_URL}${searchQuery}&page=${currentPage}`);
      const data = await response.json();
      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching search results:", error);
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
          {trendingMovies.map((movie) => (
            <Carousel.Item key={movie.id}>
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
              />
              <Carousel.Caption className="carousel-caption">
                <h5>{movie.title}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Movies Grid */}
        <Row>
          {movies.slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage).map(movie => (
            <Col key={movie.id} sm={12} md={6} lg={4} className="mb-4">
              <Card className="small-card">
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Button variant="primary" onClick={() => handleViewDetails(movie.id)}>View Details</Button>
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
