import { Term } from '../types';
import { KEYWORD_TERMS } from './terms/keywords';
import { STL_TERMS } from './terms/stl';
import { CONCEPT_TERMS } from './terms/concepts';
import { TOOL_TERMS } from './terms/tools';

// Combine all terms into a single dataset
export const ALL_TERMS: Term[] = [
  ...CONCEPT_TERMS,
  ...KEYWORD_TERMS,
  ...STL_TERMS,
  ...TOOL_TERMS,
];

// Optional: Helper to get terms by category if needed later
// export const getTermsByCategory = (category: string) => ...
