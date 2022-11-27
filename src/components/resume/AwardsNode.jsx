import { AwardsHistoryItem } from './AwardsHistoryItem';

export function AwardsNode({ Awards }) {
  const { History } = Awards;
  return (
    <div className='awards'>
      <h3>Awards</h3>
      <div className='history'>
        {History.map((HistoryItem, idx) => (<AwardsHistoryItem key={idx} HistoryItem={HistoryItem} />))}
      </div>
    </div>
  )
}
