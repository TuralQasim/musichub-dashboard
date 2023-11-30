import { TrackFilter } from "./ITrackFilter";

export interface Track {
  id: string;
  total_plays: string;
  recent_plays: string;
  price: number;
  old_price: number;
  created_at: number;
  name: string;
  keywords: string;
  audio_url: string;
  demo_fitting_url: string;
  cover_url: string;
  lyrics: string;
  bpm: number;
  genre: TrackFilter;
  selection: TrackFilter;
  language: TrackFilter;
  gender: TrackFilter;
  mood: TrackFilter;
  key: TrackFilter;
  stage: TrackFilter;
  author: TrackFilter;
}
