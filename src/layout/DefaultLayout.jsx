import React from 'react';
import { Menu, Segment, Sidebar } from 'semantic-ui-react';

function DefaultLayout({ sidebar, hideSidebar, sidebarVisible, header, children, footer, sidebarWidth= 'wide' }) {
  return (
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={hideSidebar}
        vertical
        visible={sidebarVisible}
        width={sidebarWidth}
      >
        {sidebar}
      </Sidebar>
      <Sidebar.Pusher>
        <Segment basic>
          {header && <header>{header}</header>}
          {children && <main>{children}</main>}
          {footer && <footer>{footer}</footer>}
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

export default DefaultLayout;
