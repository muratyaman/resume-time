import React from 'react';

export function LabelledNode({ label, className, content }) {
  const contentNode = typeof content === 'string' ? (<span>{content}</span>) : content;
  return (
    <div className={className}>
      {label && <label>{label}</label>}
      {contentNode}
    </div>
  )
}
