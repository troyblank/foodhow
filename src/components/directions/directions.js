import React from 'react';
import Step from './step';

const Directions = ({ steps }) => (
  <ol>
    { steps.map((step) => (
        Array.isArray(step) ?
          <Directions steps={step} />
        :
          <Step
            key={step.text}
            text={step.text}
            type={step.type}
          />
    ))}
  </ol>
);

export default Directions;
