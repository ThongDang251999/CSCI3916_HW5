import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

function ReviewForm({ movieId, onReviewSubmitted }) {
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!review.trim()) {
            setError('Please enter a review comment');
            return;
        }
        
        if (rating < 1 || rating > 5) {
            setError('Rating must be between 1 and 5');
            return;
        }
        
        setError('');
        setIsSubmitting(true);
        
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                },
                body: JSON.stringify({
                    movieId: movieId,
                    review: review,
                    rating: parseInt(rating)
                })
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit review');
            }
            
            setSuccess('Review submitted successfully!');
            setReview('');
            setRating(0);
            
            // Notify parent component that review was submitted
            if (onReviewSubmitted) {
                onReviewSubmitted();
            }
            
        } catch (err) {
            setError(err.message || 'An error occurred while submitting your review');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-4">
            <h4>Add Your Review</h4>
            
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Rating (1-5)</Form.Label>
                    <Form.Control
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </Form.Group>
                
                <Form.Group className="mb-3">
                    <Form.Label>Your Review</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Write your review here..."
                    />
                </Form.Group>
                
                <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Button>
            </Form>
        </div>
    );
}

export default ReviewForm; 