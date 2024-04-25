import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { AssessmentService } from '../../services/AssessmentService';

export const NewAssessment = () => {
  const [ isSubmitting, setIsSubmitting ] = useState(false);

  const [ submissionError, setSubmissionError ] = useState(``);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true); // Indicate the start of submission
    setSubmissionError(``); // Clear any existing errors

    try {
      await AssessmentService.submit(data);
      reset(); // Clear the form
      setIsSubmitting(false); // Indicate the end of submission
      alert(`Assessment submitted successfully!`); // Eventually replace with more integrated feedback
    } catch (error) {
      setIsSubmitting(false); // Indicate the end of submission
      setSubmissionError(`Failed to submit assessment. Error: ${error.message}`); // Set the error message
    }
  };

  return (
    <>
      {submissionError && <Alert variant="danger">{submissionError}</Alert>}
      <Form onSubmit={handleSubmit(onSubmit)}> {/* handleSubmit from react-hook-form wraps onSubmit */}
        <Form.Group>
          <Form.Label>Cat Name:</Form.Label>
          <Form.Control
            type="text"
            isInvalid={!!errors.catName}
            {...register(`catName`, { required: `Cat name is required.` })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.catName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Risk Level:</Form.Label>
          <Form.Control
            type="text" // or use a select input if there are predefined risk levels
            {...register(`riskLevel`, { required: `Risk level is required.` })}
            isInvalid={!!errors.riskLevel}
          />
          <Form.Control.Feedback type="invalid">
            {errors.riskLevel?.message}
          </Form.Control.Feedback>
        </Form.Group>


        <Form.Group>
          <Form.Label>Cat Date of Birth:</Form.Label>
          <Form.Control
            type="date" // Assuming you want the user to enter a date
            isInvalid={!!errors.catDateOfBirth}
            {...register(`catDateOfBirth`, { required: `Cat Date of Birth is required.` })}
          />
          <Form.Control.Feedback type="invalid">
            {errors.catDateOfBirth?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? `Submitting...` : `Submit`}
        </Button> {/* Single submit button for the form */}
      </Form>
    </>
  );
};
