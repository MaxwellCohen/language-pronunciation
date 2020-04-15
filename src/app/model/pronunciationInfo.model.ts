export interface IPronunciationInfo {
  term?: string;
  transliteration?: string;
  translation?: string;
}

export interface ILanguageData {
  speechLanguageTTS: string;
  speechLanguageSTT: string;
  userLanguage: string;
  voice: string;
  transliterationOptions?: ItransliterationOptions;
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
}
