import DefaultTemplate from '../templates';

const templates = {
  default: DefaultTemplate,
};

export function ResumeRenderer({ resume }) {
  const { Settings } = resume;
  let { Template = 'default' } = Settings;
  const MyTemplateComponent = templates[Template] ? templates[Template] : templates.default;
  const templateProps = { resume };
  return (
    <MyTemplateComponent {...templateProps} />
  );
}
