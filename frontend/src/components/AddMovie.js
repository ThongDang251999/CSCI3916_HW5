import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddMovie() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        releaseDate: '',
        genre: '',
        imageUrl: '',
        actors: [
            { actorName: '', characterName: '' },
            { actorName: '', characterName: '' },
            { actorName: '', characterName: '' }
        ]
    });

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleActorChange = (index, e) => {
        const newActors = [...movie.actors];
        newActors[index][e.target.name] = e.target.value;
        setMovie({
            ...movie,
            actors: newActors
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Convert releaseDate to number
        const submittedMovie = {
            ...movie,
            releaseDate: parseInt(movie.releaseDate)
        };
        
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');
        
        // POST to API
        fetch(`${process.env.REACT_APP_API_URL}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify(submittedMovie)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add movie');
            }
            return response.json();
        })
        .then(data => {
            alert('Movie added successfully!');
            navigate('/');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add movie: ' + error.message);
        });
    };

    return (
        <Container>
            <h2 className="my-4">Add New Movie</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="title" 
                                value={movie.title} 
                                onChange={handleChange} 
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Release Year</Form.Label>
                            <Form.Control 
                                type="number" 
                                name="releaseDate" 
                                value={movie.releaseDate} 
                                onChange={handleChange} 
                                min="1900" 
                                max="2100" 
                                required 
                            />
                        </Form.Group>
                    </Col>
                    <Col md={3}>
                        <Form.Group className="mb-3">
                            <Form.Label>Genre</Form.Label>
                            <Form.Control 
                                as="select" 
                                name="genre" 
                                value={movie.genre} 
                                onChange={handleChange} 
                                required
                            >
                                <option value="">Select Genre</option>
                                <option value="Action">Action</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Comedy">Comedy</option>
                                <option value="Drama">Drama</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Horror">Horror</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Romance">Romance</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Thriller">Thriller</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control 
                        type="url" 
                        name="imageUrl" 
                        value={movie.imageUrl} 
                        onChange={handleChange} 
                        placeholder="https://example.com/image.jpg" 
                        required 
                    />
                    <Form.Text className="text-muted">
                        Enter a URL for the movie poster image
                    </Form.Text>
                </Form.Group>

                <h4 className="mt-4">Actors (Minimum 3)</h4>
                {movie.actors.map((actor, index) => (
                    <Row key={index} className="mb-3">
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Actor Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="actorName" 
                                    value={actor.actorName} 
                                    onChange={(e) => handleActorChange(index, e)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group>
                                <Form.Label>Character Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="characterName" 
                                    value={actor.characterName} 
                                    onChange={(e) => handleActorChange(index, e)} 
                                    required 
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                ))}

                <Button variant="primary" type="submit" className="mt-3">
                    Add Movie
                </Button>
            </Form>
        </Container>
    );
}

export default AddMovie; 