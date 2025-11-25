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
  },
  {
    id: 'queue',
    word: 'std::queue',
    ipa: 'kjuː',
    ipaUS: 'kjuː',
    ipaUK: 'kjuː',
    simplePhonetic: 'Q',
    category: TermCategory.STL,
    description: '队列。先进先出 (FIFO)。',
    commonError: 'Que-ue (Q-E /uku)',
    detailedExplanation: '发音完全同字母 "Q" 或 "Cute" 去掉 t。ueue 是不发音的。常见的错误是试图把 ueue 读出来。',
    codeSnippet: 'std::queue<int> q;\nq.push(1);'
  },
  {
    id: 'vector',
    word: 'std::vector',
    ipa: 'ˈvɛktər',
    ipaUS: 'ˈvɛktər',
    ipaUK: 'ˈvɛktə',
    simplePhonetic: 'Vec-tor',
    category: TermCategory.STL,
    description: '动态数组。向量。',
    commonError: 'Wei-ke-te (维克特)',
    detailedExplanation: 'Ve 发 /v/ 音，上牙齿咬住下嘴唇。不要发成 /w/ (Wei - 圆唇音)。这是中国开发者最常见的发音错误之一。',
    codeSnippet: 'std::vector<int> v = {1, 2, 3};'
  },
  {
    id: 'regex',
    word: 'std::regex',
    ipa: 'ˈrɛdʒɛks',
    ipaUS: 'ˈrɛdʒɛks',
    ipaUK: 'ˈriːdʒɛks',
    simplePhonetic: 'Re-jex',
    category: TermCategory.STL,
    description: '正则表达式。',
    commonError: 'Re-gex (Re-Ge-x)',
    detailedExplanation: 'Reg 来自 Regular，但在 Regex 缩写中，g 通常发软音 /dʒ/ (如 Magic)，读作 Re-jex。虽然也有人读硬音 Re-gex，但软音更为普遍。',
    codeSnippet: 'std::regex pattern("\\d+");\n// Matches digits'
  },
  {
    id: 'chrono',
    word: 'std::chrono',
    ipa: 'ˈkroʊnoʊ',
    ipaUS: 'ˈkroʊnoʊ',
    ipaUK: 'ˈkrɒnəʊ',
    simplePhonetic: 'Kro-no',
    category: TermCategory.STL,
    description: '时间日期库。',
    commonError: 'Ch-ro-no (Ci-ro-no)',
    detailedExplanation: '词源希腊语 Chronos (时间)。Ch 发 /k/ 音，同 "Chrome"。不要读成 "Child" 的 Ch 音。',
    codeSnippet: 'auto now = std::chrono::system_clock::now();'
  },
  {
    id: 'map',
    word: 'std::map',
    ipa: 'mæp',
    ipaUS: 'mæp',
    ipaUK: 'mæp',
    simplePhonetic: 'Map',
    category: TermCategory.STL,
    description: '关联容器（字典）。',
    commonError: 'M-A-P (逐字母) / Ma-pu',
    detailedExplanation: '直接读作 Map (地图)。不要逐字母拼读。a 发梅花音 /æ/。',
    codeSnippet: 'std::map<string, int> m;\nm["key"] = 1;'
  }
];