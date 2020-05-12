export interface IPronunciationInfo {
  text?: string;
  transliteration?: string;
  translation?: string;
  analyzing?: boolean;
}

export interface ILanguageData {
  learningLanguage: string; // from
  userLanguage: string; // to
  voice: string;
}


export interface ItransliterationOptions {
  language: string;
  fromScript: string;
  toScript: string;
}

export interface IState{
  whatToSay: IPronunciationInfo;
  whatIsHeard: IPronunciationInfo;
  language: ILanguageData;
  sounds: ISoundsData;
}

export interface ILanguageSupportData {
  name: string;
  nativeName: string;
  dir: string;
  code: string;
  voices: IVoices[];
}

export interface IVoices {
  name: string;
  code: string;
}


export interface ITranslation {
  text: string;
  textTransliteration: string;
  translation: string;
  translationTransliteration: string;
}

export interface ISoundsData {
  error: boolean;
  isRecording: boolean;
  url: string;
}
