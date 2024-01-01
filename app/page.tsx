import LostItems from 'components/lost-item/LostItems'
import SearchForm from 'components/search/SearchForm'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24pxr">
      <SearchForm />
      <LostItems />
    </main>
  )
}
