import type { Inspiration } from '../data/inspirations'
import ArtworkPreview from './ArtworkPreview'

type InspirationCardProps = {
  item: Inspiration
}

function InspirationCard({ item }: InspirationCardProps) {
  return (
    <article className="archive-card">
      <div className="archive-card__media">
        <ArtworkPreview kind={item.artwork} title={item.title} />
      </div>
      <div className="archive-card__body">
        <p className="archive-card__category">{item.category}</p>
        <h3>{item.title}</h3>
        <p className="archive-card__description">{item.description}</p>
        <div className="archive-card__meta">
          {item.url
            ? <a href={item.url} target="_blank" rel="noreferrer">{item.source} <span aria-hidden="true">↗</span></a>
            : <span>{item.source}</span>}
          <span>{item.savedLabel.toLocaleLowerCase()}</span>
        </div>
      </div>
    </article>
  )
}

export default InspirationCard
