import Axios from '../utils/http.config';

export class AssessmentService {
  static submit(assessment) {
    // Adjusted URL to match the Express route, which is expecting the POST request at `/api/assessment/`
    return Axios.post(`/assessment`, assessment) // Removed the '/submit' to match your Express route
      .then(response => response.data)
      .catch(err => {
        // Error handling if the submission fails
        const statusText = err.response?.statusText || `Network Error`;
        const errorMessage = err.response?.data?.message || err.message;
        throw new Error(`${statusText} - ${errorMessage}`);
      });
  }

  static getList() {
    // Adjusted URL to match your expected GET request path, assuming you have a route setup for it
    return Axios.get(`/assessment/list`) // This needs to correspond to your GET route
      .then(response => response.data.data.assessment)
      .catch(err => {
        // Error handling if the get list fails
        const statusText = err.response?.statusText || `Network Error`;
        const errorMessage = err.response?.data?.message || err.message;
        throw new Error(`${statusText} - ${errorMessage}`);
      });
  }
}

