export const collectionNames = [
  'Interfaces',
  'Spaces',
  'Typography',
  'Color studies',
] as const

export type CollectionName = (typeof collectionNames)[number]

export type ArtworkKind = 'dashboard' | 'interior' | 'typography' | 'palette' | 'editorial' | 'mobile'

export type Inspiration = {
  id: string
  title: string
  description: string
  source: string
  category: CollectionName
  savedLabel: string
  tags: string[]
  artwork: ArtworkKind
  url?: string
}

export const sampleInspirations: Inspiration[] = [
  {
    id: 'quiet-interface',
    title: 'A quieter kind of interface',
    description: 'A considered dashboard with generous space and a single plum accent.',
    source: 'Dribbble',
    category: 'Interfaces',
    savedLabel: '2 DAYS AGO',
    tags: ['Dashboard', 'Dark UI', 'Purple charts'],
    artwork: 'dashboard',
  },
  {
    id: 'late-light',
    title: 'A room shaped by late light',
    description: 'Soft geometry, warm surfaces, and room to breathe.',
    source: 'Sample website',
    category: 'Spaces',
    savedLabel: '5 DAYS AGO',
    tags: ['Interior', 'Light', 'Calm'],
    artwork: 'interior',
  },
  {
    id: 'type-carries',
    title: 'Type that carries the page',
    description: 'A typographic study with confident scale and editorial rhythm.',
    source: 'Sample website',
    category: 'Typography',
    savedLabel: '1 WEEK AGO',
    tags: ['Typography', 'Editorial', 'Serif'],
    artwork: 'typography',
  },
  {
    id: 'soft-shapes',
    title: 'A system of soft shapes',
    description: 'A compact palette study for a small identity with a lot of character.',
    source: 'Are.na',
    category: 'Color studies',
    savedLabel: '2 WEEKS AGO',
    tags: ['Palette', 'Identity', 'Plum'],
    artwork: 'palette',
  },
  {
    id: 'index-interface',
    title: 'The index as an interface',
    description: 'A website that turns an archive into a tactile, browsable object.',
    source: 'Awwwards',
    category: 'Interfaces',
    savedLabel: '3 WEEKS AGO',
    tags: ['Web design', 'Archive', 'Grid'],
    artwork: 'editorial',
  },
  {
    id: 'small-screen',
    title: 'A little more room on mobile',
    description: 'A focused mobile layout with clear hierarchy and quieter controls.',
    source: 'Dribbble',
    category: 'Interfaces',
    savedLabel: 'LAST MONTH',
    tags: ['Mobile', 'Product design', 'UI'],
    artwork: 'mobile',
  },
]
