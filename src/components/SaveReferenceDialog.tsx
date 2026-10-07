import { useEffect, useRef, useState, type FormEvent } from 'react'
import type { Inspiration } from '../data/inspirations'
import Icon from './Icon'

type SaveReferenceDialogProps = {
  open: boolean
  onClose: () => void
  onSave: (item: Inspiration) => void
}

function SaveReferenceDialog({ open, onClose, onSave }: SaveReferenceDialogProps) {
  const dialog = useRef<HTMLElement>(null)
  const urlInput = useRef<HTMLInputElement>(null)
  const [url, setUrl] = useState('')
  const [note, setNote] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!open) return

    urlInput.current?.focus()
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const controls = dialog.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])',
        )
        const first = controls?.item(0)
        const last = controls?.item((controls.length || 1) - 1)
        if (!first || !last) return

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  useEffect(() => {
    if (open) {
      setUrl('')
      setNote('')
      setError('')
    }
  }, [open])

  if (!open) return null

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let parsedUrl: URL

    try {
      parsedUrl = new URL(url)
      if (parsedUrl.protocol !== 'https:' && parsedUrl.protocol !== 'http:') throw new Error('Unsupported protocol')
    } catch {
      setError('Enter a valid web address starting with http:// or https://.')
      return
    }

    const host = parsedUrl.hostname.replace(/^www\./, '')
    const title = note.trim() || host
    onSave({
      id: `saved-${Date.now()}`,
      title,
      description: note.trim() ? `Saved from ${host}.` : 'A reference saved from the web.',
      source: host,
      category: 'Interfaces',
      savedLabel: 'JUST NOW',
      tags: ['New save', 'Web'],
      artwork: 'editorial',
      url: parsedUrl.href,
    })
    onClose()
  }

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section ref={dialog} className="save-dialog" role="dialog" aria-modal="true" aria-labelledby="save-dialog-title" aria-describedby="save-preview-note">
        <div className="save-dialog__header">
          <div>
            <p className="oryn-label">CAPTURE A REFERENCE</p>
            <h2 id="save-dialog-title">Save it for later.</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Close save dialog">
            <Icon name="close" />
          </button>
        </div>
        <form className="save-form" onSubmit={handleSubmit}>
          <label className="save-form__label" htmlFor="reference-url">Source URL</label>
          <div className="save-form__url-wrap">
            <Icon name="link" size={18} />
            <input
              ref={urlInput}
              id="reference-url"
              className="oryn-input"
              type="url"
              placeholder="https://example.com/reference"
              value={url}
              onChange={(event) => {
                setUrl(event.target.value)
                setError('')
              }}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'save-url-error' : undefined}
              required
            />
          </div>
          <label className="save-form__label" htmlFor="reference-note">A note to help you remember <span>OPTIONAL</span></label>
          <textarea
            id="reference-note"
            className="oryn-input save-form__note"
            placeholder="What caught your eye?"
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={3}
          />
          {error && <p id="save-url-error" className="save-form__error" role="alert">{error}</p>}
          <p id="save-preview-note" className="save-form__preview-note">Preview only · this reference stays in this session and is not uploaded.</p>
          <div className="save-form__actions">
            <button className="oryn-btn oryn-btn--ghost" type="button" onClick={onClose}>Cancel</button>
            <button className="oryn-btn oryn-btn--primary" type="submit">
              Save reference <Icon name="arrow" size={18} />
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}

export default SaveReferenceDialog
