const { AssessmentService } = require(`../microservices`);
const { ResponseHandler } = require(`../utils`);

const { Router } = require(`express`);

const assessmentRouter = Router();

assessmentRouter.post(
  `/submit`,
  async (req, res, next) => {
    try {
      const { assessment } = req.body;

      // verify that your data is making it here to the API by using console.log(assessment);
      // call the AssessmentService.submit function from packages/api/src/microservices/Assessment-Service.js and
      // supply the correct parameters
      await AssessmentService.submit(assessment);

      ResponseHandler(
        res,
        `Submitted assessment`,
        {},
      );
    } catch (err) {
      next(err);
    }
  },
);

assessmentRouter.post(
  `/delete`,
  async (req, res, next) => {
    try {
      const { elementId } = req.body;

      await AssessmentService.delete(elementId);

      ResponseHandler(
        res,
        `Deleted assessment`,
        {},
      );
    } catch (error) {
      next(error);
    }
  },
);
assessmentRouter.put(`/:id`, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { assessment } = req.body;
    const updated = await AssessmentService.edit(id, assessment);
    // if (!updated) {
    //   return res.status(404).send({ message: `Assessment not found` });
    // }
    ResponseHandler(res, `Updated assessment`, { updated });
  } catch (err) {
    next(err);
  }
});
assessmentRouter.get(`/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const assessment = await AssessmentService.getById(id); // Ensure this method exists and works correctly
    if (!assessment) {
      return res.status(404).send(`Assessment not found`);
    }
    res.json(assessment);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Server error:`, error);
    res.status(500).send(`Internal server error`);
  }
});

assessmentRouter.get(
  `/`,
  async (req, res, next) => {
    try {
      // verify that your data is making it here to the API by using console.log();
      // call the AssessmentService.getList function from packages/api/src/microservices/Assessment-Service.js
      const assessments = await AssessmentService.getList();

      ResponseHandler(
        res,
        `Fetched assessments`,
        { assessments },
      );
    } catch (err) {
      next(err);
    }
  },
);

module.exports = { assessmentRouter };
