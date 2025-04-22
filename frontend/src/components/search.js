import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, setMovie } from '../actions/movieActions';
import { Form, Button, Card, Container, Row, Col, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function SearchMovies() {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();
    const searchResults = useSelector(state => state.movie.searchResults);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            dispatch(searchMovies(searchTerm));
        }
    };

    const handleMovieSelect = (movie) => {
        dispatch(setMovie(movie));
    };

    return (
        <Container className="mt-4">
            <h2>Search Movies</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Search for movies or actors"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Search
                </Button>
            </Form>

            {searchResults && searchResults.length > 0 ? (
                <Row className="mt-4">
                    {searchResults.map((movie) => (
                        <Col md={4} key={movie._id} className="mb-4">
                            <Card className="h-100">
                                <Link to={`/movie/${movie._id}`} onClick={() => handleMovieSelect(movie)}>
                                    <Image src={movie.imageUrl} alt={movie.title} fluid />
                                </Link>
                                <Card.Body>
                                    <Card.Title>{movie.title}</Card.Title>
                                    <Card.Text>
                                        <BsStarFill /> {movie.avgRating || 'No ratings'} &nbsp;&nbsp; {movie.releaseDate}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : searchResults && searchResults.length === 0 ? (
                <p className="mt-4">No movies found matching your search.</p>
            ) : null}
        </Container>
    );
}

export default SearchMovies; 