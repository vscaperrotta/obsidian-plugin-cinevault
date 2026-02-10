import { App, TFile } from "obsidian";
import type { CineVaultData, CineVaultMovie } from "../types/cinevault";

const FOLDER = "cinevault-json";
const DEFAULT_NAME = "cinevault.json";

export function getDefaultPath() {
  return `${FOLDER}/${DEFAULT_NAME}`;
}

export function getFolder() {
  return FOLDER;
}

export function createEmptyMovie(): CineVaultMovie {
  return {
    id: crypto.randomUUID(),
    imdbId: "",
    title: "",
    year: "",
    rated: "",
    released: "",
    runtime: "",
    genre: "",
    director: "",
    writer: "",
    actors: "",
    plot: "",
    language: "",
    country: "",
    awards: "",
    poster: "",
    posterLocal: "",
    ratings: [],
    metascore: "",
    imdbRating: "",
    imdbVotes: "",
    type: "",
    dvd: "",
    boxOffice: "",
    production: "",
    website: "",
    totalSeasons: "",
    tomatoURL: "",
    tomatoMeter: "",
    tomatoImage: "",
    tomatoRating: "",
    tomatoReviews: "",
    tomatoFresh: "",
    tomatoRotten: "",
    tomatoConsensus: "",
    tomatoUserMeter: "",
    tomatoUserRating: "",
    tomatoUserReviews: "",
    starRating: 0,
    watched: false,
    notes: ""
  };
}

export function createDefaultData(): CineVaultData {
  const now = new Date().toISOString();
  return {
    schemaVersion: 1,
    createdAt: now,
    updatedAt: now,
    libraryName: "CineVault",
    owner: "",
    source: "CineVault",
    movies: []
  };
}

export function normalizeData(data: CineVaultData): CineVaultData {
  return {
    ...data,
    movies: data.movies.map((movie) => ({
      ...createEmptyMovie(),
      ...movie,
      year: movie.year ? String(movie.year) : "",
      starRating: typeof movie.starRating === "number" ? movie.starRating : 0
    }))
  };
}

export async function ensureFolder(app: App) {
  if (!app.vault.getAbstractFileByPath(FOLDER)) {
    await app.vault.createFolder(FOLDER);
  }
}

export async function createJsonFile(app: App): Promise<TFile> {
  await ensureFolder(app);
  const existing = app.vault.getAbstractFileByPath(getDefaultPath());
  const filename = existing ? `cinevault-${Date.now()}.json` : DEFAULT_NAME;
  const path = `${FOLDER}/${filename}`;

  return app.vault.create(path, JSON.stringify(createDefaultData(), null, 2));
}

export async function loadLocalFile(app: App, file: TFile): Promise<CineVaultData> {
  const raw = await app.vault.read(file);
  const parsed = JSON.parse(raw) as CineVaultData;
  if (!parsed || !Array.isArray(parsed.movies)) {
    throw new Error("Formato JSON non valido");
  }
  return normalizeData(parsed);
}

export async function saveLocalData(app: App, file: TFile, data: CineVaultData) {
  await app.vault.modify(file, JSON.stringify(data, null, 2));
}
