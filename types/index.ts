export interface WaitlistEntry {
  id: string;
  email: string;
  handle: string;
  referral_code: string;
  referred_by_code?: string | null;
  referral_count: number;
  position: number;
  roll_capacity_preference: number;
  status: "active" | "verified" | "flagged" | "invited";
  created_at: string;
}

export interface RollTier {
  exposures: number;
  name: string;
  badge: string;
  subtitle: string;
  description: string;
  idealFor: string;
  duration: string;
  canisterCode: string;
  colorAccent: string;
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  bio: string;
  favoriteStock: string;
  iso: string;
  location: string;
  handle: string;
  avatarSeed: string;
}

export interface ViewfinderScene {
  id: number;
  title: string;
  location: string;
  iso: number;
  aperture: string;
  shutter: string;
  filmStock: string;
  imageUrl: string;
  caption: string;
  grainIntensity: number;
}
