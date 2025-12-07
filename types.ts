export interface Term {
  id: string;
  word: string;
  ipa?: string; // Legacy generic IPA
  ipaUS?: string; // American Pronunciation
  ipaUK?: string; // British Pronunciation
  simplePhonetic: string; // Simple English phonetic (e.g., "See-Out")
  category: TermCategory;
  description: string; // Short description
  commonError: string; // How people usually get it wrong
  // New fields to replace AI generation
  detailedExplanation: string; 
  codeSnippet: string;
}

export enum TermCategory {
  KEYWORD = '关键字',
  LIB = 'STL/库',
  CONCEPT = '概念',
  TOOL = '工具/环境'
}

export interface AudioState {
  isPlaying: boolean;
  isLoading: boolean;
  error: string | null;
}