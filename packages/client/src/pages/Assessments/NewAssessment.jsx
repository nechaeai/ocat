import React from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import { AssessmentService } from '../../services/AssessmentService';
import 'react-toastify/dist/ReactToastify.css';

export const NewAssessment = () => {
  // create a form that utilizes the "onSubmit" function to send data to
  // packages/client/src/services/AssessmentService.js and then onto the packages/api/src/routes/assessment express API
  const parseData = (data) => {
    const newInstrumentType = `Cat Behavioral Instrument`;

    const newScore =
      data.hisses + !data.playsWithDogs + data.prevContact + data.catAltercations + data.ownerAltercations;

    let newRiskLevel;
    if (newScore >= 4) {
      newRiskLevel = `high`;
    } else if (newScore >= 2) {
      newRiskLevel = `medium`;
    } else {
      newRiskLevel = `low`;
    }

    const parsedData = {
      catDateOfBirth: Date.parse(data.catDateOfBirth),
      catName: data.catName,
      instrumentType: newInstrumentType,
      riskLevel: newRiskLevel,
      score: newScore,
    };

    return parsedData;
  };

  const onSubmit = async (data) => {
    await AssessmentService.submit(parseData(data));
    toast.info(`${data.catName} added to the records`);
  };

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit((data) => onSubmit(data))} >
        <div className="input-group mb-3">
          <span className="input-group-text">
            Cat Name:
          </span>
          <input {...register(`catName`, { required: true })} className="from-control" />
        </div>

        <div className="input-group mb-3">
          <span className="input-group-text">
            Cat Date of Birth:
          </span>
          <input type="date" {...register(`catDateOfBirth`, { required: true })} className="from-control" />
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text">
            <input
              name="prevContact"
              type="checkbox"
              className="form-check-input"
              {...register(`prevContact`)} />
          </span>
          <span className="input-group-text">Previous contact with the Cat Judicial System</span>
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text">
            <input
              name="prevContact"
              type="checkbox"
              className="form-check-input"
              {...register(`catAltercations`)} />
          </span>
          <span className="input-group-text">Had 3 or more physical altercations with other cats</span>
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text">
            <input
              name="prevContact"
              type="checkbox"
              className="form-check-input"
              {...register(`ownerAltercations`)} />
          </span>
          <span className="input-group-text">
            Has had physical altercations with the owner (scratching, biting, etc...)
          </span>
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text">
            <input
              name="prevContact"
              type="checkbox"
              className="form-check-input"
              {...register(`playsWithDogs`)} />
          </span>
          <span className="input-group-text">
            Plays well with dogs
          </span>
        </div>

        <div className="mb-3 input-group">
          <span className="input-group-text">
            <input
              name="prevContact"
              type="checkbox"
              className="form-check-input"
              {...register(`hisses`)} />
          </span>
          <span className="input-group-text">
            Hisses at strangers
          </span>
        </div>

        <Button variant="primary" type="submit">Submit</Button>
      </form>
    </>
  );
};
