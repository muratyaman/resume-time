import { AddressIcon, BirthIcon, CarIcon, ChildrenIcon, DrivingLicenceIcon, HobbyIcon, MarriageIcon } from '../Icons';
import { ImageNode } from './ImageNode';
import { LabelledNode } from '../LabelledNode';
import { LinksNode } from './LinksNode';
import { NationalityNode } from './NationalityNode';

const AddressNode  = ({ Address }) => (<LabelledNode className='address' label={<AddressIcon />} content={Address} />);
const BirthNode    = ({ Birth }) => (<LabelledNode className='birth' label={<BirthIcon />} content={Birth} />);
const CarsNode     = ({ Cars }) => (<LabelledNode className='cars' label={<CarIcon />} content={Cars} />);
const ChildrenNode = ({ Children }) => (<LabelledNode className='children' label={<ChildrenIcon />} content={Children} />);
const MarriedNode  = ({ Married }) => (<LabelledNode className='married' label={<MarriageIcon/> } content={Married} />);
const NameNode     = ({ Name }) => (<LabelledNode className='name' label={null} content={<h1>{Name}</h1>} />);
const TitleNode    = ({ Title }) => (<LabelledNode className='title' label={null} content={<h2>{Title}</h2>} />);
const DriverNode   = ({ Driver }) => (<LabelledNode className='driver' label={<DrivingLicenceIcon />} content={Driver.join(', ')} />);
const HobbiesNode  = ({ Hobbies }) => (<LabelledNode className='hobbies' label={<HobbyIcon />} content={Hobbies.join(', ')} />);

export function ProfileNode({ Profile }) {
  const { Name, Title, Image, Links, Address, Nationality, Cars, Married, Children, Birth, Driver, Hobbies } = Profile;
  return (
    <section className='profile'>

      {Image && <ImageNode Image={Image} />}

      <div className='name-title'>
        {Name && <NameNode Name={Name} />}
        {Title && <TitleNode Title={Title} />}
      </div>

      {Links && <LinksNode Links={Links} />}

      <div className='personal'>
        {Address && <AddressNode Address={Address} />}
        {Birth && <BirthNode Birth={Birth} />}
        {Nationality && <NationalityNode Nationality={Nationality} />}
      </div>

      <div className='family-hobbies'>
        <div className='family'>
          {Married && <MarriedNode Married={Married} />}
          {Children && <ChildrenNode Children={Children} />}
          {Cars && <CarsNode Cars={Cars} />}
          {Driver && <DriverNode Driver={Driver} />}
        </div>

        <div className='hobbies-container'>
          {Hobbies && <HobbiesNode Hobbies={Hobbies} />}
        </div>
      </div>

    </section>
  );
}
