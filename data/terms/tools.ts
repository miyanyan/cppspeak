import { Term, TermCategory } from '../../types';

export const TOOL_TERMS: Term[] = [
  {
    id: 'suite',
    word: 'suite',
    ipa: 'swiːt',
    ipaUS: 'swiːt',
    ipaUK: 'swiːt',
    simplePhonetic: 'Sweet',
    category: TermCategory.TOOL,
    description: '套件。如 Test Suite（测试套件）。',
    commonError: 'Suit (西装 - Su-te)',
    detailedExplanation: '意为“一套”、“组”。发音完全同 "Sweet" (甜)。常见的错误是将其读成 "Suit" (西装)。常见于 "Test Suite" 或 "Office Suite"。',
    codeSnippet: 'TestSuite suite;\nsuite.add(testCase1);'
  },
  {
    id: 'archive',
    word: 'archive',
    ipa: 'ˈɑːrkaɪv',
    ipaUS: 'ˈɑːrkaɪv',
    ipaUK: 'ˈɑːkaɪv',
    simplePhonetic: 'Ar-kaiv',
    category: TermCategory.TOOL,
    description: '归档/档案。常用于库文件 (.a) 或压缩包。',
    commonError: 'A-chiv (阿七五)',
    detailedExplanation: 'ch 发 /k/ 的音，而不是 /tʃ/。重音在第一个音节。常见于静态库文件后缀 .a (archive)。',
    codeSnippet: 'ar rcs libmylib.a obj.o\n// 创建归档文件'
  },
  {
    id: 'linux',
    word: 'Linux',
    ipa: 'ˈlɪnəks',
    ipaUS: 'ˈlɪnəks',
    ipaUK: 'ˈlɪnəks',
    simplePhonetic: 'Li-nuks',
    category: TermCategory.TOOL,
    description: '开源操作系统内核。',
    commonError: 'Li-nu-x (Li-New-x)',
    detailedExplanation: 'Lin 发音类似 "Bin"。ux 发音类似 "Sucks" 或 "Books" 的短音 /ʊks/ 或 /əks/，绝对不是 "New"。Linus Torvalds 本人发音更接近 /liːnʊks/ (Swedish)，但英语通用发音为 Li-nuks。',
    codeSnippet: '#include <linux/module.h>'
  },
  {
    id: 'gnu',
    word: 'GNU',
    ipa: 'gnuː',
    ipaUS: 'gnuː',
    ipaUK: 'gnuː',
    simplePhonetic: 'G-New',
    category: TermCategory.TOOL,
    description: 'GNU is Not Unix。',
    commonError: 'G-N-U (逐字母)',
    detailedExplanation: 'G 是发音的！读作 /gnuː/，类似 "Canoe" 前面加个 G。不是逐字母读，也不是 Nu。',
    codeSnippet: '// GNU Compiler Collection (GCC)'
  },
  {
    id: 'sudo',
    word: 'sudo',
    ipa: 'ˈsuːduː',
    ipaUS: 'ˈsuːduː',
    ipaUK: 'ˈsuːduː',
    simplePhonetic: 'Sue-Doo',
    category: TermCategory.TOOL,
    description: 'SuperUser Do。提升权限指令。',
    commonError: 'Su-Du (苏度)',
    detailedExplanation: '源自 "Su" (Super user) + "Do"。读作 Sue-Doo。也有人读 Sue-Doh，但 Sue-Doo 更符合 "Do" 的原意。',
    codeSnippet: 'sudo apt-get install build-essential'
  },
  {
    id: 'ascii',
    word: 'ASCII',
    ipa: 'ˈæski',
    ipaUS: 'ˈæski',
    ipaUK: 'ˈæski',
    simplePhonetic: 'Ass-Key',
    category: TermCategory.TOOL,
    description: '美国信息交换标准代码。',
    commonError: 'Ask-Ii (A-s-k-2)',
    detailedExplanation: '读作 Ass-Key。',
    codeSnippet: 'char c = 65; // ASCII for \'A\''
  },
  {
    id: 'clang',
    word: 'Clang',
    ipa: 'klæŋ',
    ipaUS: 'klæŋ',
    ipaUK: 'klæŋ',
    simplePhonetic: 'Klang',
    category: TermCategory.TOOL,
    description: 'LLVM 编译器前端。',
    commonError: 'C-Lang (C-L-ang)',
    detailedExplanation: '读作 Klang，像金属撞击的声音。因为它是 "C Language Family Frontend"，但合起来读作一个单音节单词。',
    codeSnippet: 'clang++ main.cpp -o app'
  }
];