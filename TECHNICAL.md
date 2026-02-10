## Technical Documentation

CineVault follows a modular architecture with clear separation of concerns:

- **Plugin Core** (`main.ts`): Handles plugin lifecycle, settings, and view registration
- **View Layer** (`CineVaultView.ts`): Manages the UI state and user interactions
- **Service Layer**: Handles external dependencies (OMDb API, file system)
- **UI Components**: Reusable components for modals and interactive elements

### Data Model

#### CineVaultData
The root data structure stored in JSON format:

```typescript
{
  schemaVersion: number;        // Data schema version
  createdAt: string;           // ISO timestamp
  updatedAt: string;           // ISO timestamp
  libraryName: string;         // Library name
  owner: string;               // Owner identifier
  source: string;              // Data source identifier
  movies: CineVaultMovie[];    // Array of movie entries
}
```

#### CineVaultMovie
Complete movie data structure with fields from OMDb and custom properties:

- **OMDb Fields**: title, year, rated, released, runtime, genre, director, writer, actors, plot, language, country, awards, poster, ratings, metascore, imdbRating, imdbVotes, type, etc.
- **Custom Fields**:
  - `id`: Unique UUID for each movie
  - `starRating`: Personal rating (0-5)
  - `watched`: Boolean status
  - `notes`: User notes (reserved for future use)

### Key Components

#### CineVaultView
The main view component that renders the plugin interface. Key responsibilities:

- **Data Initialization**: Loads library from local or external storage
- **Movie Rendering**: Displays movies in grid layout with "To Watch" and "Watched" sections
- **Search Integration**: Debounced search with OMDb API
- **Modal Management**: Opens detail and action modals
- **State Persistence**: Saves changes back to storage

#### Service: libraryStorage
Manages data persistence with support for both vault-local and external files:

- `createJsonFile()`: Creates new library file
- `loadLocalFile()`: Loads data from vault
- `loadExternalFile()`: Loads data from external path
- `saveLocalData()` / `saveExternalData()`: Persists changes
- `normalizeData()`: Ensures data consistency

#### Service: omdbService
Handles OMDb API communication:

- `searchOmdb()`: Searches for movies by title
- `getOmdbDetails()`: Fetches complete movie details by IMDb ID
- Includes retry logic and error handling

### Plugin Settings

Settings are persisted using Obsidian's data API:

```typescript
{
  externalJsonPath?: string;   // Path to external JSON (if used)
  omdbApiKey?: string;         // OMDb API key
}
```

### Styling

Custom CSS classes follow the `cinevault-*` naming convention:

- `.cinevault-header`: Main header section
- `.cinevault-movie-grid`: Movie card grid layout
- `.cinevault-movie-card`: Individual movie card
- `.cinevault-modal-*`: Modal-specific styles

All styles are defined in `styles.css` and follow Obsidian's theming patterns.

### Build System

The plugin uses esbuild for bundling:

- **Development**: `npm run dev` - Watch mode with auto-rebuild
- **Production**: `npm run build` - Optimized build with type checking
- Configuration: `esbuild.config.mjs`
- TypeScript config: `tsconfig.json`

### Dependencies

- **obsidian**: Core Obsidian API
- **TypeScript**: Type safety and modern JavaScript features
- **esbuild**: Fast bundling and compilation
- Node.js 22.16.0 or higher
