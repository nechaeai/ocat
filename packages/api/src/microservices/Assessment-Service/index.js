const express = require(`express`);
const { submit } = require(`../../../../packages/api/src/microservices/Assessment-Service/index`);

const router = express.Router();

// Define the route handler for the /assessment/submit endpoint
router.post(`/assessment/submit`, async (req, res) => {
  try {
    const newAssessment = await submit(req.body);
    res.status(201).json({ message: `Assessment submitted successfully`, newAssessment });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error submitting assessment:`, error);
    // Notice the keys are sorted alphabetically here
    res.status(500).json({ details: error.message, error: `An error occurred while submitting the assessment` });
  }
});

module.exports = router;
