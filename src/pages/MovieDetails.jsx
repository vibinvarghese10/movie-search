import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './Movie.css';
import Header from '../components/Header';

const APIKEY = "6bedebd8";
const BASE_URL = "http://www.omdbapi.com/";

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}?i=${id}&apikey=${APIKEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Card className="movie-card shadow-lg border-0">
              <Card.Img variant="top" src={movie.Poster} alt={movie.Title} />
            </Card>
          </Col>
          <Col md={8}>
            <div className="movie-details border p-4 rounded">
              <h2 className="mb-3">{movie.Title}</h2>
              <p className="mb-2"><strong>Rating:</strong> {movie.imdbRating}</p>
              <p className="mb-2"><strong>Release Date:</strong> {movie.Released}</p>
              <p className="mb-3">{movie.Plot}</p>
              
              <h4 className="mt-4 mb-2">Director</h4>
              <p>{movie.Director}</p>
              
              <h4 className="mt-4 mb-2">Writer</h4>
              <p>{movie.Writer}</p>
              
              <h4 className="mt-4 mb-2">Actors</h4>
              <ul>
                {movie.Actors.split(', ').map((actor, index) => (
                  <li key={index}>{actor}</li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default MovieDetails;
