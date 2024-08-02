import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import './Movie.css';
import Header from '../components/Header';

const APIKEY = "47de2b9e8b2462b53975d18185ac40bf";
const BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_DETAILS_URL = `${BASE_URL}/movie`;
const MOVIE_CREDITS_URL = `${BASE_URL}/movie`;

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieResponse = await fetch(`${MOVIE_DETAILS_URL}/${id}?api_key=${APIKEY}&language=en-US`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        const creditsResponse = await fetch(`${MOVIE_CREDITS_URL}/${id}/credits?api_key=${APIKEY}`);
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie || !credits) return <div>Loading...</div>;

  const director = credits.crew.find(member => member.job === 'Director');
  const producer = credits.crew.find(member => member.job === 'Producer');
  const cast = credits.cast.slice(0, 5); 

  return (
    <div>
      <Header />
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Card className="movie-card shadow-lg border-0">
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </Card>
          </Col>
          <Col md={8}>
            <div className="movie-details border p-4 rounded">
              <h2 className="mb-3">{movie.title}</h2>
              <p className="mb-2"><strong>Rating:</strong> {movie.vote_average}</p>
              <p className="mb-2"><strong>Release Date:</strong> {movie.release_date}</p>
              <p className="mb-3">{movie.overview}</p>
              
              <h4 className="mt-4 mb-2">Director</h4>
              <p>{director ? director.name : 'Not available'}</p>
              
              <h4 className="mt-4 mb-2">Producer</h4>
              <p>{producer ? producer.name : 'Not available'}</p>
              
              <h4 className="mt-4 mb-2">Cast</h4>
              <ul>
                {cast.map(member => (
                  <li key={member.id}>{member.name} as {member.character}</li>
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
