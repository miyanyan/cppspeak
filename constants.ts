import { Term, TermCategory } from './types';

export const CPP_TERMS: Term[] = [
  {
    id: 'app',
    word: 'App',
    simplePhonetic: 'Ap',
    category: TermCategory.CONCEPT,
    description: '应用程序 (Application) 的缩写。',
    commonError: 'A-P-P (逐字母读)'
  },
  {
    id: 'daemon',
    word: 'daemon',
    simplePhonetic: 'Dee-mon',
    category: TermCategory.CONCEPT,
    description: '守护进程。后台运行的计算机程序。',
    commonError: 'Da-ming (大明) / Day-mon'
  },
  {
    id: 'suite',
    word: 'suite',
    simplePhonetic: 'Sweet',
    category: TermCategory.TOOL,
    description: '套件。如 Test Suite（测试套件）。',
    commonError: 'Suit (西装 - Su-te)'
  },
  {
    id: 'lambda',
    word: 'lambda',
    simplePhonetic: 'Lam-da',
    category: TermCategory.KEYWORD,
    description: 'Lambda 表达式 / 匿名函数。',
    commonError: 'Lang-da (朗达) / Lam-b-da (发出了b音)'
  },
  {
    id: 'null',
    word: 'null',
    simplePhonetic: 'Nuhl',
    category: TermCategory.KEYWORD,
    description: '空指针常量。',
    commonError: 'Niu (牛) / Nao (闹)'
  },
  {
    id: 'main',
    word: 'main',
    simplePhonetic: 'Meyn',
    category: TermCategory.KEYWORD,
    description: '程序的主入口函数。',
    commonError: 'Man (慢) / Min (民)'
  },
  {
    id: 'void',
    word: 'void',
    simplePhonetic: 'Voy-d',
    category: TermCategory.KEYWORD,
    description: '空类型。',
    commonError: 'Woid (沃德 - 混淆v/w音)'
  },
  {
    id: 'cache',
    word: 'cache',
    simplePhonetic: 'Kash',
    category: TermCategory.CONCEPT,
    description: '缓存。计算机中用于高速数据存储的层级。',
    commonError: 'Catch (卡其/抓)'
  },
  {
    id: 'archive',
    word: 'archive',
    simplePhonetic: 'Ar-kaiv',
    category: TermCategory.TOOL,
    description: '归档/档案。常用于库文件 (.a) 或压缩包。',
    commonError: 'A-chiv (阿七五)'
  },
  {
    id: 'deque',
    word: 'std::deque',
    simplePhonetic: 'Deck',
    category: TermCategory.STL,
    description: '双端队列 (Double-ended queue)。',
    commonError: 'Di-Q (迪-Q)'
  },
  {
    id: 'tuple',
    word: 'std::tuple',
    simplePhonetic: 'Tuh-pul',
    category: TermCategory.STL,
    description: '元组。固定大小的异构值集合。',
    commonError: 'Too-ple (吐泡)'
  },
  {
    id: 'schema',
    word: 'schema',
    simplePhonetic: 'Skee-ma',
    category: TermCategory.CONCEPT,
    description: '模式/架构。常见于数据库或XML设计。',
    commonError: 'She-ma (希玛) / Su-ma'
  },
  {
    id: 'char',
    word: 'char',
    simplePhonetic: 'Care',
    category: TermCategory.KEYWORD,
    description: '字符类型。源自 Character。',
    commonError: 'Cha (恰) / Char (查尔)'
  },
  {
    id: 'cout',
    word: 'std::cout',
    simplePhonetic: 'See-Out',
    category: TermCategory.STL,
    description: '标准字符输出流。',
    commonError: 'Kout (考特)'
  },
  {
    id: 'width',
    word: 'width',
    simplePhonetic: 'With',
    category: TermCategory.CONCEPT,
    description: '宽度。',
    commonError: 'Wai-si (歪死) / Wid-th (重读th)'
  },
  {
    id: 'height',
    word: 'height',
    simplePhonetic: 'Hite',
    category: TermCategory.CONCEPT,
    description: '高度。',
    commonError: 'Hate (黑特) / He-ge-te'
  },
  {
    id: 'image',
    word: 'image',
    simplePhonetic: 'Im-ij',
    category: TermCategory.CONCEPT,
    description: '图像。',
    commonError: 'Im-age (意妹支)'
  },
  {
    id: 'ajax',
    word: 'AJAX',
    simplePhonetic: 'Ay-jacks',
    category: TermCategory.CONCEPT,
    description: '异步 JavaScript 和 XML。',
    commonError: 'A-Jax (阿贾克斯)'
  },
  {
    id: 'malloc',
    word: 'malloc',
    simplePhonetic: 'Mal-lok',
    category: TermCategory.KEYWORD,
    description: 'Memory Allocation。',
    commonError: 'Ma-lo-k (马洛克)'
  }
];