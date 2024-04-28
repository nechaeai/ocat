const { Assessment } = require(`../database/models`);

exports.submit = async (assessment) => {
  // use the sequelize model Assessments from packages/api/src/database/models to save
  // the assessment data in the PostgreSQL database
  await Assessment.create({
    catDateOfBirth: assessment.catDateOfBirth,
    catName: assessment.catName,
    instrumentType: assessment.instrumentType,
    riskLevel: assessment.riskLevel,
    score: assessment.score,
  });
};
exports.edit = async (assessmentId, updatedAssessment) => {
  await Assessment.update(updatedAssessment, {
    where: {
      id: assessmentId,
    },
  });
};
exports.delete = async (assessmentId) => {
  await Assessment.destroy({
    where: {
      id: assessmentId,
    },
  });
};

exports.getList = async () => {
  // use the sequelize model Assessments from packages/api/src/database/models to fetch
  // the assessment data from the PostgreSQL database
  const assessments = await Assessment.findAll();

  return assessments.map(element => element.dataValues);
};
