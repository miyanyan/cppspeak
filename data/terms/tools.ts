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
  }
];