export interface IPronunciationInfo {
  term?: string;
  transliteration?: string;
  translation?: string;
}

export interface ILanguageData {
  slang: string;
  tlang: string;
  voice: string;
}

export interface IState{
  whatToSay: IPronunciationInfo;
  whatIsHeard: IPronunciationInfo;
  language: ILanguageData;
}
