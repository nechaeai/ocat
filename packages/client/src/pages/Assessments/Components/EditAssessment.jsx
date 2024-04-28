import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EditAssessment = () => {
  const { id } = useParams();
  const [ assessment, setAssessment ] = useState({ description: ``, title: `` });

  // Fetch the assessment when the component mounts
  useEffect(() => {
    const fetchAssessment = async () => {
      // Fetch the assessment from your API
      const response = await fetch(`/api/assessments/${id}`);
      const data = await response.json();
      return data;
    };

    fetchAssessment().then(setAssessment);
  }, [ id ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssessment({ ...assessment, [name]: value });
  };

  return (
    <div>
      <h1>Edit Assessment</h1>
      <form>
        <label>
          Title:
          <input type="text" name="title" value={assessment.title} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={assessment.description} onChange={handleInputChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditAssessment;
