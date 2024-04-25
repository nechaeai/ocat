const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);
const assessmentRouter = Router();

// Endpoint for submitting assessments
assessmentRouter.post(`/`, async (req, res, next) => {
  try {
    const assessment = req.body;

    // Uncomment the next line to debug if the data is coming through
    // console.log(assessment);

    // Call the AssessmentService.submit function and pass the assessment data
    const result = await AssessmentService.submit(assessment);

    // Use ResponseHandler to respond to the request
    ResponseHandler(res, `Submitted assessment`, result);
  } catch (err) {
    next(err);
  }
});

// Endpoint for getting a list of assessments
assessmentRouter.get(`/`, async (req, res, next) => {
  try {
    // Uncomment the next line to debug if the route is being hit
    // console.log('Fetching assessments');

    // Call the AssessmentService.getList function
    const assessments = await AssessmentService.getList();

    // Use ResponseHandler to respond to the request
    ResponseHandler(res, `Fetched assessments`, { assessments });
  } catch (err) {
    next(err);
  }
});

module.exports = { assessmentRouter };
