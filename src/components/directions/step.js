import React from 'react';
import dompurify from 'dompurify';
import classnames from 'classnames';

const Step = ({ text, type }) => (
  <li
    className={classnames({
        'direction-optional': type === 'optional'
        })}
    dangerouslySetInnerHTML={{ __html: dompurify.sanitize(text) }}
  />
);

export default Step;
