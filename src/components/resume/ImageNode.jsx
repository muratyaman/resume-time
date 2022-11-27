export function ImageNode({ Image, width = 128 }) {
  return (
    <div className='image'>
      <img src={Image} alt='' width={width} />
    </div>
  )
}
