export interface Term {
  id: string;
  word: string;
  ipa?: string; // International Phonetic Alphabet
  simplePhonetic: string; // Simple English phonetic (e.g., "See-Out")
  category: TermCategory;
  description: string;
  commonError: string; // How people usually get it wrong
}

export enum TermCategory {
  KEYWORD = '关键字',
  STL = 'STL/库',
  PEOPLE = '人物',
  CONCEPT = '概念',
  TOOL = '工具/环境'
}

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}