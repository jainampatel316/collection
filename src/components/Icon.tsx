export type IconName =
  | 'grid'
  | 'layers'
  | 'search'
  | 'plus'
  | 'close'
  | 'link'
  | 'external'
  | 'chevron'
  | 'lock'
  | 'arrow'

type IconProps = {
  name: IconName
  size?: number
}

function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === 'grid' && <><rect x="3.5" y="3.5" width="7" height="7" /><rect x="13.5" y="3.5" width="7" height="7" /><rect x="3.5" y="13.5" width="7" height="7" /><rect x="13.5" y="13.5" width="7" height="7" /></>}
      {name === 'layers' && <><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5" /><path d="m3 16 9 5 9-5" /></>}
      {name === 'search' && <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></>}
      {name === 'plus' && <><path d="M12 5v14" /><path d="M5 12h14" /></>}
      {name === 'close' && <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></>}
      {name === 'link' && <><path d="M10 13.5 14 9.5" /><path d="M7.2 15.7 5.8 17a4 4 0 0 1-5.6-5.7l4.2-4.2a4 4 0 0 1 5.7 0" transform="translate(3 0)" /><path d="M16.8 8.3 18.2 7a4 4 0 0 1 5.6 5.7l-4.2 4.2a4 4 0 0 1-5.7 0" transform="translate(-3 0)" /></>}
      {name === 'external' && <><path d="M13 5h6v6" /><path d="m19 5-9 9" /><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" /></>}
      {name === 'chevron' && <path d="m7 10 5 5 5-5" />}
      {name === 'lock' && <><rect x="4.5" y="10" width="15" height="11" rx="1" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>}
      {name === 'arrow' && <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>}
    </svg>
  )
}

export default Icon
