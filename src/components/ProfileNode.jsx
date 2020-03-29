import React from 'react';
import { NameNode } from './NameNode';
import { TitleNode } from './TitleNode';
import { EmailNode } from './EmailNode';
import { LinksNode } from './LinksNode';
import { AddressNode } from './AddressNode';
import { PhoneNode } from './PhoneNode';
import { NationalityNode } from './NationalityNode';
import { MarriedNode } from './MarriedNode';
import { CarsNode } from './CarsNode';
import { ChildrenNode } from './ChildrenNode';

function ProfileNode({ Profile }) {
  const { Name, Title, Email, Links, Address, Phone, Nationality, Cars, Married, Children } = Profile;
  return (
    <section className='profile'>
      {Name && <NameNode Name={Name} />}
      {Title && <TitleNode Title={Title} />}
      {Email && <EmailNode Email={Email} />}
      {Links && <LinksNode Links={Links} />}
      {Address && <AddressNode Address={Address} />}
      {Phone && <PhoneNode Phone={Phone} />}
      {Nationality && <NationalityNode Nationality={Nationality} />}
      <div className='divs-inline'>
        {Married && <MarriedNode Married={Married} />}
        {Children && <ChildrenNode Children={Children} />}
        {Cars && <CarsNode Cars={Cars} />}
      </div>
    </section>
  );
}

export default ProfileNode;
