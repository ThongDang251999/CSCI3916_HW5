import React, { useEffect } from 'react';
import { fetchMovie } from '../actions/movieActions';
import { useDispatch, useSelector } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image, Container, Row, Col } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import ReviewForm from './reviewform';

const MovieDetail = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const selectedMovie = useSelector(state => state.movie.selectedMovie);
  const loading = useSelector(state => state.movie.loading);
  const error = useSelector(state => state.movie.error);

  useEffect(() => {
    dispatch(fetchMovie(movieId));
  }, [dispatch, movieId]);

  const handleReviewSubmitted = () => {
    // Refresh movie data to show the new review
    dispatch(fetchMovie(movieId));
  };

  const DetailInfo = () => {
    if (loading) {
      return <div>Loading....</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    if (!selectedMovie) {
      return <div>No movie data available.</div>;
    }

    return (
      <Container className="mt-4">
        <Row>
          <Col md={4}>
            <Image className="image w-100" src={selectedMovie.imageUrl} thumbnail />
          </Col>
          <Col md={8}>
            <Card className="bg-dark text-dark h-100">
              <Card.Header>
                <h2>{selectedMovie.title}</h2>
                <h4>
                  <BsStarFill /> {selectedMovie.avgRating || 'No ratings'} &nbsp;&nbsp; ({selectedMovie.releaseDate})
                </h4>
              </Card.Header>
              <Card.Body>
                <h4>Cast</h4>
                <ListGroup>
                  {selectedMovie.actors.map((actor, i) => (
                    <ListGroupItem key={i}>
                      <b>{actor.actorName}</b> as {actor.characterName}
                    </ListGroupItem>
                  ))}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <Card>
              <Card.Header>
                <h3>Reviews</h3>
              </Card.Header>
              <Card.Body>
                {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
                  selectedMovie.reviews.map((review, i) => (
                    <Card key={i} className="mb-3">
                      <Card.Body>
                        <Card.Title>
                          <BsStarFill /> {review.rating} - by {review.username}
                        </Card.Title>
                        <Card.Text>{review.review}</Card.Text>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>No reviews yet. Be the first to review!</p>
                )}
                
                <ReviewForm movieId={movieId} onReviewSubmitted={handleReviewSubmitted} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  return <DetailInfo />;
};

export default MovieDetail;