import axios from 'axios';

export class AssessmentService {
  static submit(assessment) {
    try {
      const instrumentTypeMapping = {
        'Another Instrument Type': 2,
        'Cat Behavioral Instrument': 1,
        // Add other possible instrument types here

        'Yet Another Instrument Type': 3,
        // etc.
      };

      // Map instrument_type to its corresponding integer value
      console.log(`Assessment object before mapping:`, assessment);

      assessment.instrumentType = instrumentTypeMapping[assessment.instrumentType];

      console.log(`Assessment object after mapping:`, assessment);

      return axios.post(`/api/assessment/submit`, { assessment })
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static edit(assessmentId, updatedAssessment) {
    try {
      return axios.put(`/api/assessment/edit`, { assessmentId, updatedAssessment })
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static delete(elementId) {
    try {
      return axios.post(`/api/assessment/delete`, { elementId })
        .then(response => response.data);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }

  static getList() {
    try {
      return axios.get(`/api/assessment/`, {
        params: {
          sort: `score`,
        },
      })
        .then(response => response.data.data.assessments);
    }
    catch (err) {
      throw new Error(`${err.response.statusText} - ${err.response.data.message}`);
    }
  }
}
