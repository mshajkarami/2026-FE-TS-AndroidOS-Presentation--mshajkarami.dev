export type SpeakerId = 'all' | 'speaker1' | 'speaker2' | 'speaker3';

export interface SpeakerMeta {
  id: SpeakerId;
  name: string;
  role: string;
  color: string;
}

export interface SlideDefinition {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  speaker: SpeakerId;
  durationMin: number;
  speakerNotes: string[];
  transitionCue?: string;
}

export interface SimAppDef {
  id: string;
  name: string;
  faName: string;
  pkg: string;
  uid: string;
  color: string;
  ramMb: number;
  baseOom: number;
  permissions: string[];
  seContext: string;
  screenDesc: string;
  activityName: string;
}
