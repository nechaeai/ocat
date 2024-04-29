import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditAssessment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ assessment, setAssessment ] = useState({
    catDateOfBirth: ``,
    catName: ``,
    instrumentType: ``,
    riskLevel: ``,
    score: ``,

  });
  // Fetch the assessment when the component mounts
  useEffect(() => {
    const fetchAssessment = async () => {
      try {
        const response = await fetch(`/api/assessments/${id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch, status: ${response.status}`);
        }
        const data = await response.json();
        setAssessment(data);
      } catch (error) {
        console.error(`Error fetching assessment:`, error);
      }
    };

    fetchAssessment();
  }, [ id ]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setAssessment({ ...assessment, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`/api/assessments/${id}`, {
      body: JSON.stringify(assessment),

      headers: {
        'Content-Type': `application/json`,
      },
      method: `PUT`,

    });

    if (response.ok) {
      navigate.push(`/assessments`);
    }
  };

  return (
    <div>
      <h1>Edit Assessment</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Cat Name:
          <input type="text" name="catName" value={assessment.catName} onChange={handleInputChange} />
        </label>
        <label>
          Cat Date of Birth:
          <input type="date" name="catDateOfBirth" value={assessment.catDateOfBirth} onChange={handleInputChange} />
        </label>
        <label>
          Score:
          <input type="number" name="score" value={assessment.score} onChange={handleInputChange} />
        </label>
        <label>
          Risk Level:
          <input type="text" name="riskLevel" value={assessment.riskLevel} onChange={handleInputChange} />
        </label>
        <label>
          Instrument Type:
          <input type="text" name="instrumentType" value={assessment.instrumentType} onChange={handleInputChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditAssessment;
