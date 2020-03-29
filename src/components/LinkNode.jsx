import React from 'react';
import { BlogIcon, EmailIcon, GithubIcon, LinkedInIcon, MobileIcon, PhoneIcon } from './Icons';
import { LabelledNode } from './LabelledNode';

const Anchor = ({ href, prefix = 'http://' }) => (<a href={`${prefix}${href}`}>{href}</a>);
const MobileNode = ({ Mobile }) => (<LabelledNode className='mobile' label={<MobileIcon />} content={<Anchor href={Mobile} prefix='tel:' />} />);
const PhoneNode = ({ Phone }) => (<LabelledNode className='phone' label={<PhoneIcon />} content={<Anchor href={Phone} prefix='tel:' />} />);
const EmailNode = ({ Email }) => (<LabelledNode className='email' label={<EmailIcon />} content={<Anchor href={Email} prefix='mailto:' />} />);
const BlogNode = ({ Blog }) => (<LabelledNode className='blog' label={<BlogIcon />} content={<Anchor href={Blog} />} />);
const LinkedInNode = ({ LinkedIn }) => (<LabelledNode className='linkedin' label={<LinkedInIcon />} content={<Anchor href={LinkedIn} />} />);
const GithubNode = ({ Github }) => (<LabelledNode className='github' label={<GithubIcon />} content={<Anchor href={Github} />} />);

export function LinkNode({ Link }) {
  // expecting only one of these props
  const { Mobile, Phone, Email, Blog, LinkedIn, Github } = Link;
  if (Mobile) return (<MobileNode Mobile={Mobile} />);
  if (Phone) return (<PhoneNode Phone={Phone} />);
  if (Email) return (<EmailNode Email={Email} />);
  if (Blog) return (<BlogNode Blog={Blog} />);
  if (LinkedIn) return (<LinkedInNode LinkedIn={LinkedIn} />);
  if (Github) return (<GithubNode Github={Github} />);
  return (<>{null}</>); // not expected
}
