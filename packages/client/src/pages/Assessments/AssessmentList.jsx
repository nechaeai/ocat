import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { AssessmentService } from '../../services/AssessmentService';
import { AssessmentTable } from './Components/AssessmentTable';
import 'react-toastify/dist/ReactToastify.css';

export const AssessmentList = () => {
  const [ assessments, setAssessments ] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const fetchAssessments = async () => {
    setAssessments(await AssessmentService.getList());
  };

  const deleteElementById = (elementId) => {
    toast.promise(
      AssessmentService.delete(elementId),
      {
        error: `Was Unable to Delete Record`,
        pending: `Deleting Cat From Record`,
        success: `Completed Deleting Record`,
      }
    );
  };

  // fetch all assessments using the AssessmentService.getList function from OCAT/client/services/AssessmentService.js
  useEffect(() => {
    fetchAssessments();
  }, []);

  return (
    <>
      <ToastContainer />
      <AssessmentTable
        catAssessments={assessments}
        deleteElementById={deleteElementById}
        onEdit={handleEdit} // Pass the handleEdit function to the AssessmentTable component
      />
    </>
  );
};
