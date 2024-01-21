import LostItems from 'components/lost-item/LostItems'
import SearchForm from 'components/search/SearchForm'

export default function Home() {
  return (
    <section className="flex flex-col overflow-hidden">
      <SearchForm />
      <LostItems />
    </section>
  )
}
