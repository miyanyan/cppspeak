import { Term, TermCategory } from '../../types';

export const STL_TERMS: Term[] = [
  {
    id: 'deque',
    word: 'std::deque',
    ipa: 'dɛk',
    ipaUS: 'dɛk',
    ipaUK: 'dɛk',
    simplePhonetic: 'Deck',
    category: TermCategory.STL,
    description: '双端队列 (Double-ended queue)。',
    commonError: 'Di-Q (迪-Q)',
    detailedExplanation: '虽然是 Double-ended Queue 的缩写，但发音约定俗成读作 "Deck" (甲板)。不要按照缩写字母读成 De-Que。',
    codeSnippet: 'std::deque<int> d;\nd.push_front(1);'
  },
  {
    id: 'tuple',
    word: 'std::tuple',
    ipa: 'ˈtʌpəl',
    ipaUS: 'ˈtʌpəl',
    ipaUK: 'ˈtjuːpəl',
    simplePhonetic: 'Tuh-pul',
    category: TermCategory.STL,
    description: '元组。固定大小的异构值集合。',
    commonError: 'Too-ple (吐泡)',
    detailedExplanation: '元音发音类似 "Cup"，比较短促。美式发音中 u 发 /ʌ/。英式有时发 /juː/ (Tju-ple)。不要读成长音的 "Too"。',
    codeSnippet: 'std::tuple<int, double> t(1, 2.5);\nauto [i, d] = t;'
  },
  {
    id: 'cout',
    word: 'std::cout',
    ipa: 'siː aʊt',
    ipaUS: 'siː aʊt',
    ipaUK: 'siː aʊt',
    simplePhonetic: 'See-Out',
    category: TermCategory.STL,
    description: '标准字符输出流。',
    commonError: 'Kout (考特)',
    detailedExplanation: 'c 代表 character。cout 是 "Character Output" 的缩写。应该连读为 "See-Out"。读成 "Kout" 是非常典型的错误。',
    codeSnippet: 'std::cout << "Hello World";\n// Reads: See-Out'
  }
];