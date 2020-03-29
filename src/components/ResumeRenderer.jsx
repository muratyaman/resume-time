import React from 'react';
import DefaultTemplate from '../templates/DefaultTemplate';

const templates = {
  default: DefaultTemplate
};

function ResumeRenderer({ resume }) {
  const { Settings } = resume;
  let { Template = 'default' } = Settings;
  const MyTemplateComponent = templates[Template] ? templates[Template] : templates.default;
  return (
    <MyTemplateComponent resume={resume} />
  );
}

export default ResumeRenderer;
