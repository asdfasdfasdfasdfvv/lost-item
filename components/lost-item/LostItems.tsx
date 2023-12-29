import LostItem from './LostItem'

export default function LostItems() {
  const mockList = Array.from({length: 10}, () => [0])
  return (
    <ul className="w-full max-w-80">
      {mockList.map((_, index) => (
        <LostItem key={index} />
      ))}
    </ul>
  )
}
