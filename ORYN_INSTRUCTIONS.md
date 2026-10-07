# ORYN --- Design & Project Instructions

> **This document is mandatory project guidance.**
>
> Every future implementation, UI change, component, page, feature, and
> visual refinement for ORYN must follow these instructions unless an
> explicit project-level decision overrides them.

------------------------------------------------------------------------

## 1. Source of Truth

The file:

``` text
oryn-design-system.css
```

is the **single source of truth for ORYN's visual design system**.

Before creating or modifying any UI, developers must:

1.  Read the current design-system CSS.
2.  Reuse existing design tokens and utilities whenever possible.
3.  Follow the defined colors, typography, spacing, borders, radii,
    shadows, motion, and component patterns.
4.  Avoid creating competing or duplicate design tokens.
5.  Update the CSS design system when a genuinely reusable visual rule
    is introduced.

Do **not** invent a new visual style for an individual page or
component.

------------------------------------------------------------------------

# 2. Mandatory Visual Identity

ORYN uses a restrained **neo-brutalist / editorial** visual language.

The design must feel:

-   Bold
-   Intentional
-   Structured
-   Editorial
-   Minimal
-   Distinctive
-   Functional
-   Slightly raw/brutalist

It must **not** look like a generic AI SaaS dashboard.

Avoid:

-   Excessive gradients
-   Glassmorphism
-   Excessive rounded cards
-   Generic purple AI aesthetics
-   Decorative blobs
-   Unnecessary 3D effects
-   Excessive shadows
-   Random colors
-   Overly soft UI
-   Template-like dashboard layouts

------------------------------------------------------------------------

# 3. Mandatory Color System

The approved palette is:

``` text
Deep Ink       #15141B
Royal Plum     #3E2C6B
Muted Lavender #9A8BC4
Soft Lilac     #C8C1D9
Warm Ivory     #F6F3EF
```

## Color hierarchy

### Warm Ivory --- Primary Canvas

``` text
#F6F3EF
```

Use primarily for:

-   Main application background
-   Page canvas
-   Large surfaces
-   Primary light-theme background

Warm Ivory should dominate the visual composition.

------------------------------------------------------------------------

### Deep Ink --- Structure

``` text
#15141B
```

Use primarily for:

-   Borders
-   Strong outlines
-   Primary text
-   Icons
-   Structural elements
-   High-contrast controls

**Borders should default to Deep Ink.**

Do not replace borders with random gray values.

------------------------------------------------------------------------

### Royal Plum --- Primary Brand / Action

``` text
#3E2C6B
```

Use for:

-   Primary buttons
-   Important interactive states
-   Brand accents
-   Active navigation
-   Important calls to action
-   Selected/high-priority elements

Royal Plum should attract attention without overwhelming the interface.

------------------------------------------------------------------------

### Muted Lavender --- Secondary Accent

``` text
#9A8BC4
```

Use sparingly for:

-   Secondary accents
-   Focus states
-   AI-related states
-   Supporting visual hierarchy
-   Secondary interactive elements

------------------------------------------------------------------------

### Soft Lilac --- Supporting Surface

``` text
#C8C1D9
```

Use for:

-   Tags
-   Secondary surfaces
-   Selected states
-   Supporting cards
-   Lightweight visual grouping

------------------------------------------------------------------------

## Color Rule

The visual hierarchy should generally follow:

``` text
IVORY
  ↓
dominant canvas

INK
  ↓
structure

PLUM
  ↓
attention

LAVENDER / LILAC
  ↓
secondary hierarchy
```

Do not use all five colors equally.

------------------------------------------------------------------------

# 4. Borders

ORYN uses strong structural borders.

Default border:

``` css
border-color: var(--color-ink);
```

Avoid:

``` css
border: 1px solid #ddd;
border: 1px solid #eee;
```

unless the design system explicitly defines that semantic use.

Borders should feel deliberate and visible.

------------------------------------------------------------------------

# 5. Typography

ORYN uses an editorial type pairing that works with local system fonts:

``` text
Headings and titles: Georgia / Times New Roman / serif
Interface and reading text: Segoe UI / system-ui / sans-serif
Small numeric labels: Consolas / monospace
```

The CSS design system defines these stacks through `--font-display`,
`--font-sans`, and `--font-mono`.

Use the design-system typography tokens instead of independently
defining fonts inside components.

Keep the serif face for editorial titles and section headings. Use the
sans face for navigation, controls, labels, and longer descriptions. Keep
monospace limited to compact numeric or technical labels.

Do not add remote font dependencies or mix in additional type families
without updating the design-system tokens first.

------------------------------------------------------------------------

# 6. Spacing

Use the spacing scale already defined by:

``` text
oryn-design-system.css
```

Do not introduce arbitrary spacing values everywhere.

Prefer:

``` css
var(--space-*)
```

or the existing layout utilities.

Spacing should create clear hierarchy:

``` text
Page
 └── Section
      └── Component
           └── Content
```

Avoid visually cramped layouts.

------------------------------------------------------------------------

# 7. Layout Philosophy

ORYN should prioritize:

-   Strong alignment
-   Clear hierarchy
-   Generous negative space
-   Grid-based layouts
-   Visual rhythm
-   Strong content grouping

The interface should feel designed rather than decorated.

For inspiration-heavy screens, prioritize the content itself.

------------------------------------------------------------------------

# 8. Cards

Cards should not become the default container for everything.

Use cards when they communicate an actual content boundary.

Avoid:

``` text
Card
  Card
    Card
      Card
```

Use:

-   Borders
-   Grid grouping
-   Section dividers
-   Open layouts
-   Image-first compositions

when appropriate.

------------------------------------------------------------------------

# 9. Inspiration / Media Cards

ORYN is primarily a visual-memory product.

Media should therefore receive strong visual priority.

A saved inspiration card should generally communicate:

``` text
Image / Preview
      ↓
Title / Description
      ↓
Source
      ↓
Tags / Metadata
```

The image should not be buried under excessive UI.

Do not allow metadata controls to visually overpower the inspiration
itself.

------------------------------------------------------------------------

# 10. Search UI

Search is a core ORYN feature.

The search interface should feel like:

> **A memory retrieval tool, not a normal website search box.**

The primary search experience should support natural-language queries
such as:

``` text
dark dashboard with purple charts
```

rather than requiring users to know exact tags.

Search UI should prioritize:

1.  Query
2.  Results
3.  Relevant filters
4.  Search refinement

Avoid filling the search interface with unnecessary controls.

------------------------------------------------------------------------

# 11. AI UI

AI features should be visually integrated into ORYN rather than
presented as generic "AI magic."

Avoid:

``` text
✨ AI MAGIC
✨ AI POWERED
✨ GENERATE WITH AI
```

everywhere.

AI should feel like infrastructure working quietly in the background.

Preferred language:

``` text
Analyzing...
Indexed
Detected
Suggested tags
Similar items
```

Use Muted Lavender / Soft Lilac for subtle AI states.

------------------------------------------------------------------------

# 12. Motion

Animation must serve a purpose.

Good uses:

-   Hover feedback
-   Search transitions
-   Save confirmation
-   Loading states
-   Image interactions
-   Panel transitions

Avoid:

-   Constant floating animations
-   Excessive parallax
-   Decorative particles everywhere
-   Long transitions
-   Animations that delay usability

Motion should feel:

``` text
fast
precise
intentional
```

------------------------------------------------------------------------

# 13. Responsive Design

Every UI component must be designed for:

``` text
Desktop
Tablet
Mobile
```

Do not build desktop-first layouts that simply collapse on mobile.

Important areas:

-   Search
-   Inspiration grid
-   Navigation
-   Collections
-   Item details
-   Save flow

must remain usable at smaller widths.

------------------------------------------------------------------------

# 14. Accessibility

Every new UI element must consider:

-   Keyboard navigation
-   Focus states
-   Color contrast
-   Semantic HTML
-   Accessible labels
-   Screen-reader compatibility
-   Reduced-motion preferences

Do not rely on color alone to communicate state.

------------------------------------------------------------------------

# 15. Component Rules

Components should be:

-   Reusable
-   Small enough to understand
-   Consistent
-   Token-driven
-   Accessible

Before creating a new component, check whether an existing component can
be reused.

Do not duplicate:

``` text
Button
Input
Card
Modal
Badge
Tag
SearchBar
```

with slightly different styling.

------------------------------------------------------------------------

# 16. No Hardcoded Design Values

Avoid hardcoding design values when a design token exists.

Bad:

``` css
color: #3E2C6B;
padding: 17px;
border: 2px solid #15141B;
```

Preferred:

``` css
color: var(--color-plum);
padding: var(--space-4);
border: var(--border-strong);
```

The exact token names must match the current CSS file.

If an appropriate token does not exist, update the design system first
when the value is intended to be reusable.

------------------------------------------------------------------------

# 17. Dark Theme

A dark theme may exist as a secondary theme, but the primary ORYN visual
direction is:

``` text
Warm Ivory background
+
Deep Ink borders
```

Do not make dark mode the dominant design direction unless explicitly
requested.

------------------------------------------------------------------------

# 18. Feature Implementation Rule

Every new feature must be evaluated at three levels:

### Function

Does it work?

### UX

Is the interaction clear and efficient?

### Visual system

Does it follow ORYN's design system?

A feature is not considered complete if it works technically but
violates the visual system.

------------------------------------------------------------------------

# 19. Architecture Rule

Do not introduce unnecessary infrastructure.

The initial ORYN architecture should remain a modular monolith.

Preferred:

``` text
Next.js
+
Node.js / Express
+
PostgreSQL
+
pgvector
+
Redis
+
BullMQ
```

Do not introduce:

-   Kubernetes
-   Kafka
-   Elasticsearch
-   Multiple microservices
-   Complex cloud infrastructure

unless there is a demonstrated requirement.

------------------------------------------------------------------------

# 20. Code Quality Rules

Every implementation should prioritize:

-   Type safety
-   Clear naming
-   Reusable functions
-   Separation of concerns
-   Validation
-   Error handling
-   Secure data access
-   Minimal duplication

Do not sacrifice maintainability for speed.

------------------------------------------------------------------------

# 21. Security Rules

Always enforce:

``` text
Authenticated User
       ↓
Authorization
       ↓
Resource Ownership
       ↓
Database Operation
```

Users must only be able to access their own private ORYN data.

Validate:

-   URLs
-   Uploaded files
-   File sizes
-   MIME types
-   API input
-   Authentication state

Never trust client-provided ownership information.

------------------------------------------------------------------------

# 22. Source Platform Rules

ORYN should use platform-specific adapters.

``` text
SourceAdapter
├── Instagram
├── Pinterest
├── Dribbble
├── X
├── Awwwards
└── Generic Web
```

Do not build the entire application around scraping one platform.

Platform terms, API restrictions, embeds, media access, and copyright
requirements must be respected.

ORYN should primarily preserve:

``` text
Source URL
+
Metadata
+
Permitted Preview
+
User Upload / Screenshot
```

rather than blindly mirroring external platforms.

------------------------------------------------------------------------

# 23. AI Provider Abstraction

Do not tightly couple ORYN's business logic to one AI provider.

Use internal abstractions such as:

``` text
EmbeddingProvider
VisionProvider
OCRProvider
TextGenerationProvider
```

This allows providers/models to change without rewriting the
application.

------------------------------------------------------------------------

# 24. Git / Change Management

Every meaningful change must:

1.  Be implemented.
2.  Be tested.
3.  Be reviewed against the design system.
4.  Be documented.
5.  Update the project documentation where relevant.

Use clear commit messages.

Examples:

``` text
feat: add semantic search
feat: add Pinterest source adapter
fix: correct inspiration card layout
refactor: extract search service
style: align dashboard with ORYN design system
docs: update architecture
```

------------------------------------------------------------------------

# 25. Mandatory README Update Rule

The project's documentation must remain synchronized with
implementation.

The primary architecture README is:

``` text
ORYN_README.md
```

The project instructions are:

``` text
ORYN_INSTRUCTIONS.md
```

### After EVERY meaningful change:

Review whether `ORYN_README.md` needs an update.

If the change affects:

-   Architecture
-   Modules
-   Technology stack
-   Database
-   API
-   Data flow
-   Folder structure
-   AI pipeline
-   Search
-   Infrastructure
-   Security
-   Development phases
-   Feature scope

then **ORYN_README.md MUST be updated in the same change.**

Do not postpone documentation updates.

------------------------------------------------------------------------

# 26. Change Log

`ORYN_README.md` should contain a current project status/change section
when appropriate.

Each meaningful architectural or feature change should be recorded with:

``` text
Date
Change
Reason
Impact
```

Example:

``` text
2026-10-07
Added pgvector-based semantic search.

Reason:
Enable natural-language retrieval of saved inspiration.

Impact:
Items now require embedding generation during background processing.
```

Keep the changelog concise.

------------------------------------------------------------------------

# 27. Documentation Consistency Rule

Never allow documentation to describe an architecture that the code no
longer uses.

For example, if the implementation changes from:

``` text
MongoDB
```

to:

``` text
PostgreSQL + pgvector
```

then all relevant documentation must be updated immediately.

The same applies to:

-   Frameworks
-   Libraries
-   Services
-   Database schema
-   Folder structure
-   Search architecture
-   AI providers
-   Deployment architecture

------------------------------------------------------------------------

# 28. Design Change Rule

If a visual change introduces a reusable design rule:

``` text
Component change
      ↓
Is this reusable?
      ↓
YES
      ↓
Update design-system CSS
      ↓
Update documentation if needed
```

Do not create one-off styling that silently diverges from the design
system.

------------------------------------------------------------------------

# 29. Final Review Checklist

Before considering any change complete:

### Design

-   [ ] Follows `oryn-design-system.css`
-   [ ] Uses approved color palette
-   [ ] Uses Deep Ink structural borders
-   [ ] Uses Warm Ivory as primary light canvas
-   [ ] Uses the Georgia and Segoe UI typography tokens
-   [ ] Does not introduce unnecessary visual styles
-   [ ] Responsive
-   [ ] Accessible

### Engineering

-   [ ] Type-safe
-   [ ] Reuses existing components
-   [ ] No unnecessary dependencies
-   [ ] Error handling included
-   [ ] Security/authorization considered
-   [ ] Tests updated where appropriate

### Documentation

-   [ ] `ORYN_README.md` reviewed
-   [ ] Architecture updated if affected
-   [ ] Technology stack updated if affected
-   [ ] Module documentation updated if affected
-   [ ] Change recorded when meaningful
-   [ ] No stale architectural information remains

------------------------------------------------------------------------

# 30. Non-Negotiable Rule

> **Do not make ORYN visually inconsistent just because a new component,
> page, or feature is being built.**

The correct workflow is:

``` text
Understand requirement
        ↓
Inspect existing architecture
        ↓
Inspect oryn-design-system.css
        ↓
Reuse existing patterns
        ↓
Implement
        ↓
Test
        ↓
Review against design system
        ↓
Update ORYN_README.md
        ↓
Complete
```

**The CSS design system and the documentation are living project assets.
Keep both synchronized with every meaningful change.**
