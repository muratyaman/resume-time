import React from 'react';
import DefaultTemplate from '../templates/default';

const templates = {
  default: DefaultTemplate
};

function ResumeRenderer({ resume }) {
  const { Settings } = resume;
  let { Template = 'default' } = Settings;
  const MyTemplateComponent = templates[Template] ? templates[Template] : templates.default;
  const templateProps = { resume };
  return (
    <MyTemplateComponent {...templateProps} />
  );
}

export default ResumeRenderer;
