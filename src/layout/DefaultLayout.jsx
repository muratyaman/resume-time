import React from 'react';

function DefaultLayout({ header, children, footer }) {
  return (
    <div className='layout layout-default'>
      {header && <header>{header}</header>}
      {children && <main>{children}</main>}
      {footer && <footer>{footer}</footer>}
    </div>
  );
}

export default DefaultLayout;
