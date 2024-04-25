const { Assessment } = require(`../database/models`);

exports.submit = async (assessmentData) => {
  try {
    // Create a new assessment in the database
    const newAssessment = await Assessment.create(assessmentData);
    return newAssessment; // This returns the newly created assessment
  } catch (error) {
    // Handle any errors that occur during the creation of the assessment
    throw new Error(`Error creating new assessment: ${error.message}`);
  }
};

exports.getList = async () => {
  try {
    // Fetch all assessments from the database
    const assessments = await Assessment.findAll();
    return assessments; // This returns an array of assessments
  } catch (error) {
    // Handle any errors that occur during the fetching of assessments
    throw new Error(`Error fetching assessments: ${error.message}`);
  }
};
