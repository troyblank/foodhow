import React, { type FunctionComponent } from 'react';
import { Step } from '.';

type DirectionsProps = {
    steps: any
}

export const Directions: FunctionComponent<DirectionsProps> = ({ steps }) => (
  <ol>
    { steps.map((step, index) => (
                Array.isArray(step) ?
                  <Directions
                    key={`sublist-${index}`}
                    steps={step}
                  />
                :
                  <Step
                    key={step.text}
                    text={step.text}
                    type={step.type}
                  />
            ))}
  </ol>
);
