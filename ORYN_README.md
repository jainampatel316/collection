# ORYN

> **Save anything once. Forget where it came from. Find it again.**

ORYN is a personal visual memory engine for saving design inspiration
from multiple platforms and retrieving it later using natural language,
visual similarity, metadata, and semantic search.

Instead of remembering whether an inspiration came from Instagram,
Pinterest, Dribbble, X, Awwwards, or a random website, users save it to
ORYN once and let the system understand and index it.

------------------------------------------------------------------------

## Current implementation status — 2026-10-07

This document describes ORYN's product vision and target architecture. The current repository implementation is the first frontend page, a responsive sample library:

- Implemented: React 19, TypeScript 6, Vite 8, the Oryn / Kova design system, a responsive visual library page, sample visual references, browser-side text matching, collection filters, sorting, and a session-only URL save preview.
- Not implemented yet: authentication, API services, database persistence, real capture/upload processing, metadata extraction, AI processing, and semantic or visual search.
- Search matches words in the sample metadata in the browser. A saved URL is shown for the current page session only; it is not uploaded or persisted.
- The Next.js, Express, PostgreSQL, Redis, and BullMQ references below describe the proposed product architecture; they are not claims that those systems are already present in this repository.
- Typography uses Georgia for editorial headings, Segoe UI for interface and reading text, and Consolas for compact numeric labels; the stacks use local system fonts.
- `README.md` documents local frontend setup. `ORYN_INSTRUCTIONS.md` contains project implementation and design guidance.

------------------------------------------------------------------------
## 1. Product Vision

The core ORYN workflow is:

``` text
See something
     ↓
Save it to ORYN
     ↓
ORYN identifies the source
     ↓
Extract metadata
     ↓
Analyze image / text
     ↓
Generate tags + description
     ↓
Generate embeddings
     ↓
Store + index
     ↓
Search your visual memory later
```

Example:

> User: "Find that dark dashboard with purple charts that I saved a few
> months ago."

ORYN should be able to retrieve the relevant saved item even if the
original item was saved with a completely different title or no tags at
all.

------------------------------------------------------------------------

# 2. Core Product Principles

### 2.1 Save first, organize later

The user should not have to manually enter:

-   title
-   tags
-   platform
-   description
-   category

ORYN should extract and generate as much metadata as possible
automatically.

### 2.2 Search by memory, not exact words

Traditional bookmark search:

``` text
"dashboard"
```

ORYN search:

``` text
"dark dashboard with purple graphs"
```

The system combines semantic understanding, metadata, full-text search,
and visual similarity.

### 2.3 Platform-agnostic

ORYN should not depend on a single platform.

Supported sources can include:

-   Instagram
-   Pinterest
-   Dribbble
-   X
-   Awwwards
-   Generic websites
-   Direct image uploads
-   Screenshots

### 2.4 Private-first

ORYN is primarily a personal library.

Social features and public discovery are secondary and should not be
required for the core product to work.

------------------------------------------------------------------------

# 3. System Architecture

ORYN will initially use a **modular monolith architecture** rather than
microservices.

This keeps development simple while allowing individual modules to be
separated into services later if the product grows.

``` text
                                      ┌─────────────────────┐
                                      │       ORYN UI       │
                                      │ React / Next.js     │
                                      └──────────┬──────────┘
                                                 │
                           ┌─────────────────────┴─────────────────────┐
                           │                                           │
                  ┌────────▼────────┐                         ┌────────▼────────┐
                  │ Browser         │                         │ Mobile Share    │
                  │ Extension       │                         │ / Upload       │
                  └────────┬────────┘                         └────────┬────────┘
                           │                                           │
                           └──────────────────┬────────────────────────┘
                                              │
                                     ┌────────▼────────┐
                                     │   API SERVER    │
                                     │ Node.js/Express  │
                                     └────────┬────────┘
                                              │
                 ┌────────────────────────────┼──────────────────────────┐
                 │                            │                          │
        ┌────────▼────────┐          ┌────────▼────────┐        ┌────────▼────────┐
        │ Authentication  │          │ Capture / Save   │        │ Search Engine   │
        │ & User Module   │          │ Module           │        │ Module          │
        └─────────────────┘          └────────┬────────┘        └────────┬────────┘
                                               │                          │
                                      ┌────────▼────────┐                 │
                                      │ Source Adapters  │                 │
                                      │ Instagram       │                 │
                                      │ Pinterest       │                 │
                                      │ Dribbble        │                 │
                                      │ X               │                 │
                                      │ Awwwards        │                 │
                                      │ Generic Web     │                 │
                                      └────────┬────────┘                 │
                                               │                          │
                                      ┌────────▼────────┐                 │
                                      │ Processing Queue │                 │
                                      │ Redis + BullMQ   │                 │
                                      └────────┬────────┘                 │
                                               │                          │
                              ┌────────────────┼────────────────┐         │
                              │                │                │         │
                       ┌──────▼──────┐  ┌──────▼──────┐  ┌──────▼──────┐  │
                       │ Metadata    │  │ OCR / Vision│  │ Embeddings  │  │
                       │ Extraction  │  │ Processing   │  │ Generation  │  │
                       └─────────────┘  └─────────────┘  └──────┬──────┘  │
                                                                │         │
                                      ┌─────────────────────────▼─────────▼───┐
                                      │          PostgreSQL + pgvector        │
                                      │ Metadata + Full Text + Embeddings    │
                                      └────────────────────┬─────────────────┘
                                                           │
                                                ┌──────────▼──────────┐
                                                │ Object / Media      │
                                                │ Storage             │
                                                │ Images / Previews   │
                                                └─────────────────────┘
```

------------------------------------------------------------------------

# 4. Main System Modules

ORYN is divided into the following functional modules.

## 4.1 Authentication & User Module

Responsible for:

-   Registration
-   Login
-   Google OAuth
-   Sessions
-   User profiles
-   User preferences
-   Privacy settings
-   Account management

------------------------------------------------------------------------

## 4.2 Capture / Save Module

The primary entry point into ORYN.

Users can save content through:

-   Browser extension
-   URL submission
-   Image upload
-   Screenshot upload
-   Drag and drop
-   Mobile share sheet
-   Copy/paste

Example:

``` text
Pinterest
Instagram
Dribbble
X
Website
Screenshot
      ↓
    ORYN
```

------------------------------------------------------------------------

## 4.3 Source Adapter Module

Each supported platform gets an adapter.

``` text
SourceAdapter
├── InstagramAdapter
├── PinterestAdapter
├── DribbbleAdapter
├── XAdapter
├── AwwwardsAdapter
└── GenericWebAdapter
```

Each adapter attempts to extract:

-   Platform
-   Original URL
-   External ID
-   Creator
-   Title
-   Description
-   Thumbnail
-   Media type
-   Source metadata

The adapter architecture allows new platforms to be added without
changing the core save pipeline.

------------------------------------------------------------------------

## 4.4 Media & Storage Module

Responsible for:

-   User uploads
-   Screenshots
-   Generated thumbnails
-   Permitted previews
-   Image processing
-   Media metadata

ORYN should **not automatically mirror entire platforms**.

The preferred strategy is:

1.  Store the original URL.
2.  Use platform embeds where appropriate.
3.  Store permitted preview/thumbnail data.
4.  Store user-uploaded screenshots when applicable.
5.  Always provide a link back to the original source.

This reduces storage requirements and platform/legal risks.

------------------------------------------------------------------------

## 4.5 AI / Processing Module

This is the intelligence layer of ORYN.

When an item is saved:

``` text
Saved Item
    ↓
Metadata Extraction
    ↓
OCR
    ↓
Image Understanding
    ↓
Description Generation
    ↓
Tag Generation
    ↓
Embedding Generation
```

Possible outputs:

``` json
{
  "description": "Dark analytics dashboard with purple charts and a left sidebar.",
  "tags": [
    "dashboard",
    "dark-ui",
    "purple",
    "analytics",
    "charts",
    "saas"
  ]
}
```

------------------------------------------------------------------------

## 4.6 Search Engine Module

Search is one of ORYN's most important modules.

ORYN will use **hybrid search**.

``` text
User Query
    ↓
Query Processing
    ↓
 ┌───────────────┬─────────────────┬─────────────────┐
 │               │                 │
 ▼               ▼                 ▼
Full Text      Vector Search    Metadata Filters
 │               │                 │
 └───────────────┴─────────────────┘
                     ↓
                 Reranking
                     ↓
                  Results
```

Search types:

### Keyword Search

``` text
"dashboard"
```

### Semantic Search

``` text
"dark analytics interface with purple graphs"
```

### Visual Search

User uploads an image/screenshot:

``` text
Screenshot
    ↓
Image Embedding
    ↓
pgvector
    ↓
Similar saved items
```

### Filtered Search

``` text
dark dashboard
platform: Dribbble
tag: saas
saved: 2026
```

------------------------------------------------------------------------

# 5. Database Architecture

ORYN will use:

## PostgreSQL

PostgreSQL stores structured application data.

Primary entities:

``` text
users
items
collections
item_collections
tags
item_tags
embeddings
sources
```

### Example Item

``` text
items
-----------------------------
id
user_id
source_url
platform
external_id
title
description
media_type
preview_url
saved_at
created_at
updated_at
```

### Vector Storage

PostgreSQL will use:

**pgvector**

for storing and searching embeddings.

This allows ORYN to keep:

``` text
Application Data
+
Full Text Search
+
Vector Search
```

inside PostgreSQL during the initial stages.

------------------------------------------------------------------------

# 6. Background Processing

AI processing should not block the user's save request.

Instead:

``` text
User saves item
      ↓
API stores basic record
      ↓
Job added to queue
      ↓
User immediately sees:
"Processing..."
      ↓
Background worker
      ↓
Metadata
OCR
Vision
Embeddings
      ↓
Item becomes searchable
```

### Technologies

-   Redis
-   BullMQ
-   Node.js workers

Example jobs:

``` text
extract_metadata
generate_thumbnail
run_ocr
analyze_image
generate_description
generate_tags
generate_embedding
```

------------------------------------------------------------------------

# 7. Search Architecture

ORYN will initially use PostgreSQL instead of introducing Elasticsearch
or another dedicated search engine.

``` text
                    Search Query
                         │
              ┌──────────▼──────────┐
              │ Query Preprocessing  │
              └──────────┬──────────┘
                         │
             ┌───────────┼───────────┐
             │           │           │
             ▼           ▼           ▼
          FTS         pgvector    Filters
             │           │           │
             └───────────┼───────────┘
                         ▼
                    Candidate Set
                         │
                         ▼
                     Reranking
                         │
                         ▼
                     Final Results
```

This gives us a strong MVP without unnecessary infrastructure.

------------------------------------------------------------------------

# 8. Target Technology Stack

## Frontend

### Primary

-   **TypeScript**
-   **React**
-   **Next.js**
-   HTML5
-   CSS
-   ORYN Design System

The frontend handles:

-   Dashboard
-   Search
-   Library
-   Collections
-   Item details
-   Upload
-   Settings
-   Authentication UI

------------------------------------------------------------------------

## Backend

### Primary

-   **Node.js**
-   **TypeScript**
-   **Express.js**

Responsibilities:

-   REST API
-   Authentication
-   Save pipeline
-   Source adapters
-   Search API
-   Collection management
-   User management
-   Background job creation

------------------------------------------------------------------------

## Database

### PostgreSQL

Used for:

-   Users
-   Items
-   Collections
-   Tags
-   Metadata
-   Search indexes
-   Relationships

### pgvector

Used for:

-   Text embeddings
-   Image embeddings
-   Similarity search

------------------------------------------------------------------------

## Caching & Queues

### Redis

Used for:

-   Caching
-   Job queues
-   Temporary processing state
-   Rate limiting where needed

### BullMQ

Used for:

-   Background jobs
-   Retry handling
-   Job prioritization
-   Worker processing

------------------------------------------------------------------------

# 9. AI / Machine Learning Stack

The AI layer should remain provider-agnostic.

ORYN may use a combination of:

### Embeddings

-   Sentence Transformers
-   CLIP-style image embeddings
-   Other open-source embedding models

### OCR

-   Tesseract OCR

### Image Processing

-   Sharp

### Image Understanding

A vision-capable model can be used to generate:

-   descriptions
-   tags
-   visual attributes
-   detected text/context

The AI provider should be abstracted behind an internal interface:

``` text
AIProvider
├── EmbeddingProvider
├── VisionProvider
├── OCRProvider
└── TextGenerationProvider
```

This prevents the application from becoming locked to one AI provider.

------------------------------------------------------------------------

# 10. Browser Extension

ORYN will have a browser extension for fast saving.

Supported workflow:

``` text
User browsing
     ↓
Right click / Extension button
     ↓
Save to ORYN
     ↓
Select collection (optional)
     ↓
Saved
```

Technology:

-   TypeScript
-   HTML
-   CSS
-   Chrome Extension APIs
-   Manifest V3

The extension communicates with the ORYN backend API.

------------------------------------------------------------------------

# 11. Mobile Application

Mobile support can be added after the web MVP.

Recommended stack:

-   React Native
-   Expo
-   TypeScript

Important feature:

### Mobile Share Sheet

``` text
Instagram
Pinterest
Browser
Gallery
       ↓
     Share
       ↓
     ORYN
       ↓
     Save
```

This is more important than building a complete mobile application
immediately.

------------------------------------------------------------------------

# 12. Frontend Architecture

Recommended structure:

``` text
frontend/
├── app/
│   ├── auth/
│   ├── dashboard/
│   ├── search/
│   ├── library/
│   ├── collections/
│   ├── item/
│   └── settings/
│
├── components/
│   ├── ui/
│   ├── cards/
│   ├── search/
│   ├── library/
│   └── collections/
│
├── features/
│   ├── auth/
│   ├── items/
│   ├── search/
│   ├── collections/
│   └── user/
│
├── lib/
├── hooks/
├── services/
├── types/
└── styles/
```

------------------------------------------------------------------------

# 13. Backend Architecture

``` text
backend/
├── src/
│   ├── config/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── items/
│   │   ├── collections/
│   │   ├── tags/
│   │   ├── search/
│   │   ├── sources/
│   │   └── ai/
│   │
│   ├── adapters/
│   │   ├── instagram/
│   │   ├── pinterest/
│   │   ├── dribbble/
│   │   ├── x/
│   │   ├── awwwards/
│   │   └── generic/
│   │
│   ├── workers/
│   │   ├── metadata.worker.ts
│   │   ├── ocr.worker.ts
│   │   ├── vision.worker.ts
│   │   └── embedding.worker.ts
│   │
│   ├── middleware/
│   ├── database/
│   ├── queues/
│   ├── services/
│   ├── utils/
│   └── app.ts
│
└── package.json
```

------------------------------------------------------------------------

# 14. Infrastructure

For the initial development stage:

``` text
Local Development
├── Node.js
├── PostgreSQL
├── Redis
├── pgvector
└── Local object storage / filesystem
```

Production infrastructure can be introduced later.

Potential components:

``` text
Frontend
    ↓
Hosting Platform
    ↓
API Server
    ↓
PostgreSQL + pgvector
    ↓
Redis + Workers
    ↓
Object Storage
```

ORYN should avoid unnecessary infrastructure during MVP development.

We do **not** need to start with:

-   Kubernetes
-   Kafka
-   Elasticsearch
-   Pinecone
-   Multiple microservices
-   AWS Lambda everywhere
-   Complex event-driven infrastructure

These can be introduced only when scale actually requires them.

------------------------------------------------------------------------

# 15. API Architecture

The backend will expose REST APIs initially.

Example:

``` text
POST   /api/auth/register
POST   /api/auth/login

POST   /api/items
GET    /api/items
GET    /api/items/:id
DELETE /api/items/:id

POST   /api/items/:id/analyze

GET    /api/search
POST   /api/search/visual

GET    /api/collections
POST   /api/collections
PATCH  /api/collections/:id
DELETE /api/collections/:id

POST   /api/items/:id/tags
DELETE /api/items/:id/tags/:tagId
```

------------------------------------------------------------------------

# 16. Data Flow: Saving an Item

``` text
                    USER
                      │
                      ▼
              Browser Extension
                      │
                      ▼
                  POST /items
                      │
                      ▼
                API Server
                      │
                      ▼
               Save basic item
                      │
                      ├──────────────► PostgreSQL
                      │
                      ▼
                 BullMQ Queue
                      │
                      ▼
                Background Worker
                      │
          ┌───────────┼───────────────┐
          │           │               │
          ▼           ▼               ▼
      Metadata       OCR          Image Analysis
          │           │               │
          └───────────┼───────────────┘
                      ▼
               Generate Tags
                      │
                      ▼
              Generate Embedding
                      │
                      ▼
              PostgreSQL/pgvector
                      │
                      ▼
                SEARCHABLE
```

------------------------------------------------------------------------

# 17. Data Flow: Semantic Search

``` text
User:
"dark dashboard with purple charts"
              │
              ▼
        Query Embedding
              │
              ▼
         pgvector search
              │
              +
       PostgreSQL FTS
              │
              +
          Metadata
              │
              ▼
          Reranking
              │
              ▼
       Relevant ORYN Items
```

------------------------------------------------------------------------

# 18. Security

Security requirements include:

-   Password hashing
-   Secure authentication
-   HTTP-only cookies where applicable
-   Input validation
-   API rate limiting
-   User-level authorization
-   File type validation
-   Upload size limits
-   URL validation
-   Protection against malicious URLs
-   Secure secret management
-   CORS configuration
-   Database access controls

Every item must belong to a user and queries must enforce ownership.

Example:

``` text
WHERE item.user_id = authenticated_user.id
```

A user must never be able to access another user's private library by
changing an item ID.

------------------------------------------------------------------------

# 19. Observability

Initial system:

-   Structured server logs
-   Error logging
-   Queue/job status
-   API response logging
-   Basic health endpoint

Example:

``` text
GET /health
```

Later:

-   Error tracking
-   Metrics
-   Performance monitoring
-   AI processing metrics
-   Search quality metrics

------------------------------------------------------------------------

# 20. Testing Strategy

### Frontend

-   Unit tests
-   Component tests
-   End-to-end tests

### Backend

-   Unit tests
-   API integration tests
-   Database tests
-   Adapter tests
-   Search tests

### Critical tests

The following flows must always work:

``` text
Save URL
Save Image
Search Item
Semantic Search
Create Collection
Add Item to Collection
Delete Item
User Isolation
```

------------------------------------------------------------------------

# 21. Development Phases

## Phase 1 --- Foundation

-   Repository setup
-   Next.js frontend
-   Express backend
-   PostgreSQL
-   Authentication
-   Basic UI

## Phase 2 --- Save System

-   Save URL
-   Save image
-   Item database
-   Library
-   Item details

## Phase 3 --- Source Adapters

-   Generic web adapter
-   Pinterest
-   Instagram
-   Dribbble
-   X
-   Awwwards

## Phase 4 --- AI Pipeline

-   Metadata extraction
-   OCR
-   Image analysis
-   Automatic tags
-   Descriptions
-   Embeddings

## Phase 5 --- Search

-   Keyword search
-   Filters
-   Semantic search
-   Vector search
-   Hybrid search
-   Image similarity

## Phase 6 --- Browser Extension

-   Chrome extension
-   One-click saving
-   Context menu
-   Save confirmation

## Phase 7 --- Collections

-   Collections
-   Tags
-   Favorites
-   Notes
-   Organization

## Phase 8 --- Mobile

-   React Native / Expo
-   Share sheet
-   Mobile library

## Phase 9 --- Advanced Intelligence

-   Recommendations
-   Similar inspiration
-   Automatic grouping
-   Search refinement
-   Personal visual memory features

------------------------------------------------------------------------

# 22. Target Technology Summary

  Layer               Technology
  ------------------- ---------------------------------------------
  Language            TypeScript
  Frontend            React + Next.js
  Styling             CSS / ORYN Design System
  Backend             Node.js + Express
  Database            PostgreSQL
  Vector Search       pgvector
  Cache               Redis
  Queue               BullMQ
  Image Processing    Sharp
  OCR                 Tesseract
  Embeddings          Sentence Transformers / CLIP-style models
  AI Vision           Provider-agnostic vision model
  Browser Extension   TypeScript + Chrome Manifest V3
  Mobile              React Native + Expo
  API                 REST
  Authentication      Secure session-based authentication / OAuth
  Version Control     Git + GitHub

------------------------------------------------------------------------

# 23. Design System

ORYN uses a restrained neo-brutalist/editorial visual system.

### Primary Palette

``` text
Deep Ink       #15141B
Royal Plum     #3E2C6B
Muted Lavender #9A8BC4
Soft Lilac     #C8C1D9
Warm Ivory     #F6F3EF
```

### Primary visual hierarchy

``` text
Warm Ivory
    ↓
background / canvas

Deep Ink
    ↓
text / borders / structure

Royal Plum
    ↓
primary actions / brand

Muted Lavender
    ↓
secondary accents / AI states

Soft Lilac
    ↓
secondary surfaces / tags / selected states
```

### Typography

ORYN uses a local editorial pairing:

``` text
Headings and titles: Georgia / Times New Roman / serif
Interface and reading text: Segoe UI / system-ui / sans-serif
Small numeric labels: Consolas / monospace
```

The stacks are configured in the design-system tokens, so no remote font
request or licensed font asset is needed.

------------------------------------------------------------------------

# 24. Repository Structure

The initial repository can use a monorepo:

``` text
oryn/
│
├── apps/
│   ├── web/
│   ├── api/
│   └── extension/
│
├── packages/
│   ├── ui/
│   ├── types/
│   ├── config/
│   └── search/
│
├── workers/
│   └── ai/
│
├── docs/
│
├── docker/
│
├── .env.example
├── package.json
├── README.md
└── docker-compose.yml
```

------------------------------------------------------------------------

# 25. Initial MVP Scope

The first working ORYN version should contain:

``` text
✓ Authentication
✓ Save URL
✓ Save image
✓ Personal library
✓ Generic source detection
✓ PostgreSQL
✓ AI-generated description
✓ AI-generated tags
✓ Embeddings
✓ Semantic search
✓ Keyword search
✓ Collections
✓ Browser extension
```

The first release should **not** attempt to build:

``` text
✗ Social network
✗ Public creator profiles
✗ Full recommendation engine
✗ Complete mobile application
✗ Full media mirroring
✗ Microservice architecture
✗ Kubernetes infrastructure
```

------------------------------------------------------------------------

# 26. The Core ORYN Loop

The entire system ultimately exists to enable this:

``` text
                    ┌───────────────┐
                    │     SAVE      │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │   UNDERSTAND  │
                    │      AI       │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    INDEX      │
                    │ FTS + Vector  │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │    SEARCH     │
                    │  by memory    │
                    └───────┬───────┘
                            ↓
                    ┌───────────────┐
                    │     FIND      │
                    └───────────────┘
```

## ORYN

**Save anything once. Forget where it came from. Find it again.**
------------------------------------------------------------------------

## Change log

### 2026-10-07 — Frontend and project guidance

- **Change:** Set up the React / TypeScript / Vite frontend, integrated the Oryn / Kova design-system stylesheet, and added project architecture and instruction documents.
- **Reason:** Establish the web app foundation and keep design and implementation guidance with the project.
- **Impact:** The frontend runs and builds locally. Product services and workflows listed above remain planned.

### 2026-10-07 — First library page

- **Change:** Built the responsive library page with sample visual references, browser-side text matching, collection filters, sorting, and a session-only URL save preview.
- **Reason:** Start the ORYN frontend with its primary visual-memory browsing experience.
- **Impact:** The page demonstrates the interaction flow without a backend. Search, sample content, and added references remain local to the frontend preview.

### 2026-10-07 — Library visual refinement

- **Change:** Reworked the library into a quieter, image-led archive with a compact masthead, open collection filters, a simpler search field, and reference details without tag chips or card shells.
- **Reason:** Reduce dashboard-like visual noise and give saved references more space and emphasis.
- **Impact:** Search, collection filtering, sorting, and the session-only save preview remain available. The page continues to use sample content and does not persist saved items.

### 2026-10-07 — Typography system

- **Change:** Replaced the unavailable `Unique` font stack with Georgia for editorial headings, Segoe UI for interface text, and Consolas for compact numeric labels. Applied the pairing to the library and save dialog.
- **Reason:** Give the interface a clearer editorial voice while using fonts available locally on the development system.
- **Impact:** The typography renders without downloading or bundling font files; all families remain configurable from the design-system tokens.

## Git commit history

The repository had no Git history before this push, so its first commit is
an initial snapshot of the frontend as it stands today. Earlier product
milestones are recorded in the change log above.

- `feat: initialize ORYN frontend` — Initial snapshot with the React/Vite
  app, current library page, design system, and project guidance.
