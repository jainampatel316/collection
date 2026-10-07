import type { ArtworkKind } from '../data/inspirations'

type ArtworkPreviewProps = {
  kind: ArtworkKind
  title: string
}

function ArtworkPreview({ kind, title }: ArtworkPreviewProps) {
  return (
    <div className={`artwork artwork--${kind}`} role="img" aria-label={`${title} visual preview`}>
      <svg viewBox="0 0 640 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {kind === 'dashboard' && <>
          <rect width="640" height="420" fill="#15141B" />
          <rect width="118" height="420" fill="#201E28" />
          <rect x="22" y="24" width="28" height="28" rx="4" fill="#3E2C6B" />
          <path d="M31 38h10M36 33v10" stroke="#F6F3EF" strokeWidth="2" />
          <rect x="22" y="84" width="72" height="7" rx="2" fill="#9A8BC4" />
          <rect x="22" y="111" width="50" height="5" rx="2" fill="#625D6C" />
          <rect x="22" y="132" width="62" height="5" rx="2" fill="#625D6C" />
          <rect x="22" y="153" width="43" height="5" rx="2" fill="#625D6C" />
          <text x="150" y="52" fill="#F6F3EF" fontSize="18" fontFamily="system-ui" fontWeight="600">Overview</text>
          <rect x="150" y="76" width="136" height="86" rx="5" fill="#24212D" stroke="#514D59" />
          <rect x="302" y="76" width="136" height="86" rx="5" fill="#24212D" stroke="#514D59" />
          <rect x="454" y="76" width="136" height="86" rx="5" fill="#24212D" stroke="#514D59" />
          <rect x="166" y="94" width="51" height="5" rx="2" fill="#77717F" />
          <rect x="166" y="116" width="76" height="17" rx="3" fill="#F6F3EF" />
          <rect x="318" y="94" width="51" height="5" rx="2" fill="#77717F" />
          <rect x="318" y="116" width="76" height="17" rx="3" fill="#F6F3EF" />
          <rect x="470" y="94" width="51" height="5" rx="2" fill="#77717F" />
          <rect x="470" y="116" width="76" height="17" rx="3" fill="#F6F3EF" />
          <rect x="150" y="178" width="440" height="202" rx="5" fill="#24212D" stroke="#514D59" />
          <path d="M176 328c35-44 52-20 83-64s51 8 84-28 52 7 83-34 52 10 82-23" fill="none" stroke="#9A8BC4" strokeWidth="4" />
          <path d="M176 339c35-23 52-11 83-38s51 8 84-12 52 6 83-18 52 5 82-12" fill="none" stroke="#C8C1D9" strokeWidth="2" opacity=".7" />
          <path d="M176 350h390" stroke="#514D59" />
        </>}
        {kind === 'interior' && <>
          <rect width="640" height="420" fill="#F6F3EF" />
          <rect x="0" y="0" width="640" height="276" fill="#EEEAE5" />
          <rect x="365" y="40" width="190" height="170" fill="#C8C1D9" stroke="#15141B" strokeWidth="5" />
          <path d="M460 40v170M365 125h190" stroke="#15141B" strokeWidth="4" />
          <rect y="276" width="640" height="144" fill="#C8C1D9" />
          <rect x="125" y="220" width="318" height="104" rx="10" fill="#3E2C6B" stroke="#15141B" strokeWidth="5" />
          <rect x="154" y="193" width="126" height="72" rx="9" fill="#3E2C6B" stroke="#15141B" strokeWidth="5" />
          <rect x="140" y="315" width="24" height="67" fill="#15141B" />
          <rect x="404" y="315" width="24" height="67" fill="#15141B" />
          <path d="M74 278c0-51 20-83 43-104M90 276c-13-40-10-69 5-91M106 275c3-43 21-73 44-90" fill="none" stroke="#3E2C6B" strokeWidth="8" />
          <rect x="73" y="272" width="70" height="51" rx="3" fill="#15141B" />
        </>}
        {kind === 'typography' && <>
          <rect width="640" height="420" fill="#F6F3EF" />
          <rect x="0" y="0" width="206" height="420" fill="#3E2C6B" />
          <text x="48" y="250" fill="#F6F3EF" fontSize="190" fontFamily="Georgia, serif" fontWeight="700">A</text>
          <text x="374" y="238" fill="#15141B" fontSize="170" fontFamily="Georgia, serif">a</text>
          <rect x="257" y="75" width="300" height="8" fill="#15141B" />
          <rect x="258" y="315" width="210" height="4" fill="#9A8BC4" />
          <rect x="258" y="332" width="260" height="4" fill="#C8C1D9" />
          <text x="258" y="385" fill="#514D59" fontSize="13" fontFamily="system-ui" letterSpacing="3">TYPE STUDY / 04</text>
        </>}
        {kind === 'palette' && <>
          <rect width="640" height="420" fill="#C8C1D9" />
          <rect x="32" y="34" width="576" height="352" fill="#F6F3EF" stroke="#15141B" strokeWidth="4" />
          <rect x="52" y="55" width="260" height="310" fill="#3E2C6B" />
          <rect x="330" y="55" width="258" height="142" fill="#9A8BC4" />
          <rect x="330" y="211" width="122" height="154" fill="#15141B" />
          <rect x="466" y="211" width="122" height="154" fill="#C8C1D9" />
          <circle cx="183" cy="208" r="68" fill="#F6F3EF" />
          <circle cx="183" cy="208" r="35" fill="#9A8BC4" />
          <path d="M90 98h125M90 321h168" stroke="#F6F3EF" strokeWidth="3" opacity=".7" />
        </>}
        {kind === 'editorial' && <>
          <rect width="640" height="420" fill="#EEEAE5" />
          <rect x="34" y="32" width="572" height="356" fill="#F6F3EF" stroke="#15141B" strokeWidth="4" />
          <text x="65" y="82" fill="#3E2C6B" fontSize="13" fontFamily="system-ui" letterSpacing="3">FIELD NOTES / 2025</text>
          <rect x="65" y="104" width="282" height="8" fill="#15141B" />
          <rect x="65" y="124" width="205" height="8" fill="#15141B" />
          <rect x="65" y="158" width="226" height="178" fill="#C8C1D9" />
          <rect x="303" y="158" width="129" height="178" fill="#3E2C6B" />
          <rect x="444" y="158" width="128" height="80" fill="#9A8BC4" />
          <rect x="444" y="252" width="128" height="84" fill="#15141B" />
          <path d="M82 304c31-79 60-17 92-71s67 20 97-50" fill="none" stroke="#F6F3EF" strokeWidth="5" />
        </>}
        {kind === 'mobile' && <>
          <rect width="640" height="420" fill="#C8C1D9" />
          <rect x="202" y="18" width="236" height="384" rx="25" fill="#15141B" />
          <rect x="214" y="30" width="212" height="360" rx="17" fill="#F6F3EF" />
          <rect x="274" y="41" width="92" height="15" rx="8" fill="#15141B" />
          <text x="234" y="94" fill="#15141B" fontSize="17" fontFamily="system-ui" fontWeight="700">Saved for later</text>
          <rect x="234" y="112" width="172" height="118" fill="#3E2C6B" />
          <circle cx="320" cy="171" r="31" fill="#9A8BC4" />
          <rect x="234" y="246" width="134" height="7" rx="3" fill="#15141B" />
          <rect x="234" y="263" width="160" height="5" rx="2" fill="#9A8BC4" />
          <rect x="234" y="283" width="172" height="64" fill="#C8C1D9" />
          <rect x="246" y="297" width="64" height="36" fill="#3E2C6B" />
          <rect x="322" y="297" width="70" height="6" rx="3" fill="#15141B" />
          <rect x="322" y="313" width="54" height="5" rx="2" fill="#77717F" />
        </>}
      </svg>
    </div>
  )
}

export default ArtworkPreview
