type standartItem = {
  id: number;
  name: string;
};

export interface ITrack {
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
  genre: standartItem[];
  selection: standartItem[];
  language: standartItem[];
  gender: standartItem[];
  mood: standartItem[];
  key: standartItem[];
  stage: standartItem[];
  author: standartItem[];
}
