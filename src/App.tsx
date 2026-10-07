import { useCallback, useMemo, useRef, useState } from 'react'
import Icon from './components/Icon'
import InspirationCard from './components/InspirationCard'
import SaveReferenceDialog from './components/SaveReferenceDialog'
import { collectionNames, sampleInspirations, type CollectionName, type Inspiration } from './data/inspirations'

type SortMode = 'recent' | 'oldest' | 'title'
type CollectionFilter = 'All' | CollectionName

function App() {
  const [items, setItems] = useState(sampleInspirations)
  const [query, setQuery] = useState('')
  const [activeCollection, setActiveCollection] = useState<CollectionFilter>('All')
  const [sortMode, setSortMode] = useState<SortMode>('recent')
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const saveTrigger = useRef<HTMLButtonElement>(null)
  const collectionsSection = useRef<HTMLElement>(null)

  const visibleItems = useMemo(() => {
    const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean)
    const filtered = items.filter((item) => {
      const matchesCollection = activeCollection === 'All' || item.category === activeCollection
      const searchable = [item.title, item.description, item.source, item.category, ...item.tags]
        .join(' ')
        .toLocaleLowerCase()
      return matchesCollection && terms.every((term) => searchable.includes(term))
    })

    return filtered.sort((first, second) => {
      if (sortMode === 'title') return first.title.localeCompare(second.title)
      return sortMode === 'recent'
        ? items.indexOf(first) - items.indexOf(second)
        : items.indexOf(second) - items.indexOf(first)
    })
  }, [activeCollection, items, query, sortMode])

  const closeSaveDialog = useCallback(() => {
    setSaveDialogOpen(false)
    window.requestAnimationFrame(() => saveTrigger.current?.focus())
  }, [])

  const handleSave = useCallback((item: Inspiration) => {
    setItems((currentItems) => [item, ...currentItems])
    setActiveCollection('All')
    setQuery('')
    setSortMode('recent')
    setNotice('Added to this preview for the current session.')
    window.setTimeout(() => setNotice(''), 4500)
  }, [])

  const showCollections = () => {
    collectionsSection.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setActiveCollection('All')
  }

  return (
    <div className="archive-shell">
      <header className="archive-header">
        <a className="archive-brand" href="#library" aria-label="ORYN home">
          <span>ORYN<span className="archive-brand__slash"> / KOVA</span></span>
        </a>

        <nav className="archive-nav" aria-label="Main navigation">
          <a href="#library" aria-current="page">Library</a>
          <button type="button" onClick={showCollections}>Collections</button>
        </nav>

        <button ref={saveTrigger} className="archive-save" type="button" onClick={() => setSaveDialogOpen(true)}>
          <Icon name="plus" size={16} /> Save reference
        </button>
      </header>

      <main id="library" className="archive-main">
        <div className="archive-content">
          <section className="archive-intro" aria-labelledby="page-title">
            <div>
              <p className="archive-overline">A PERSONAL ARCHIVE</p>
              <h1 id="page-title">Your library<span>.</span></h1>
            </div>
            <p className="archive-intro__copy">A home for the images, ideas and details you want to find again.</p>
          </section>

          <section className="archive-search-section" aria-label="Search the sample library">
            <div className="archive-search">
              <Icon name="search" size={21} />
              <input
                id="memory-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by a detail, a color, a feeling…"
                aria-label="Search your visual memory"
              />
              {query && (
                <button className="archive-search__clear" type="button" onClick={() => setQuery('')} aria-label="Clear search">
                  <Icon name="close" size={17} />
                </button>
              )}
            </div>
            <p className="archive-search__note">Search across titles, notes and collections.</p>
          </section>

          <p className="archive-preview-note" role="note">Preview library <span>·</span> Sample references; saves last for this session.</p>

          <section className="archive-collections" aria-labelledby="collections-heading" ref={collectionsSection}>
            <div className="archive-section-heading">
              <h2 id="collections-heading">Collections</h2>
              <span>{collectionNames.length} collections</span>
            </div>
            <div className="archive-filters" role="group" aria-label="Filter by collection">
              <button
                className={activeCollection === 'All' ? 'is-active' : ''}
                type="button"
                aria-pressed={activeCollection === 'All'}
                onClick={() => setActiveCollection('All')}
              >
                All <span>{items.length.toString().padStart(2, '0')}</span>
              </button>
              {collectionNames.map((name) => {
                const count = items.filter((item) => item.category === name).length
                return (
                  <button
                    className={activeCollection === name ? 'is-active' : ''}
                    type="button"
                    aria-pressed={activeCollection === name}
                    key={name}
                    onClick={() => setActiveCollection(name)}
                  >
                    {name} <span>{count.toString().padStart(2, '0')}</span>
                  </button>
                )
              })}
            </div>
          </section>

          <section className="archive-results" aria-labelledby="results-heading">
            <div className="archive-results__heading">
              <h2 id="results-heading">References <span>{visibleItems.length.toString().padStart(2, '0')}</span></h2>
              <label className="archive-sort">
                <span>Sort by</span>
                <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)}>
                  <option value="recent">Recently saved</option>
                  <option value="oldest">Oldest first</option>
                  <option value="title">Title A–Z</option>
                </select>
                <Icon name="chevron" size={14} />
              </label>
            </div>

            {visibleItems.length > 0 ? (
              <div className="archive-grid">
                {visibleItems.map((item) => <InspirationCard item={item} key={item.id} />)}
              </div>
            ) : (
              <div className="archive-empty">
                <h3>No references found.</h3>
                <p>Try another search or clear the current filters.</p>
                <button type="button" onClick={() => { setQuery(''); setActiveCollection('All') }}>Clear filters</button>
              </div>
            )}
          </section>

          <footer className="archive-footer">
            <span>ORYN / KOVA</span>
            <span>Save anything once. Find it again.</span>
          </footer>
        </div>
      </main>

      {notice && <div className="save-notice" role="status">{notice}</div>}
      <SaveReferenceDialog open={saveDialogOpen} onClose={closeSaveDialog} onSave={handleSave} />
    </div>
  )
}

export default App
