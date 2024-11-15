import React, { FunctionComponent } from 'react';
import dompurify from 'dompurify';
import classnames from 'classnames';

type StepProps = {
    text: string,
    type?: 'optional'
}

export const Step: FunctionComponent<StepProps> = ({ text, type }) => (
  <li
    className={classnames({
        'direction-optional': type === 'optional'
    })}
    dangerouslySetInnerHTML={{ __html: dompurify.sanitize(text) }}
  />
);
