import { Term, TermCategory } from '../../types';

export const KEYWORD_TERMS: Term[] = [
  {
    id: 'lambda',
    word: 'lambda',
    ipa: 'ˈlæmdə',
    ipaUS: 'ˈlæmdə',
    ipaUK: 'ˈlæmdə',
    simplePhonetic: 'Lam-da',
    category: TermCategory.KEYWORD,
    description: 'Lambda 表达式 / 匿名函数。',
    commonError: 'Lang-da (朗达) / Lam-b-da (发出了b音)',
    detailedExplanation: '希腊字母 Λ。关键点在于字母 `b` 是**不发音**的。许多人会错误地把 b 音发出来。在 C++11 中引入，用于定义匿名函数。',
    codeSnippet: 'auto func = [](int x) {\n    return x * x;\n};'
  },
  {
    id: 'null',
    word: 'null',
    ipa: 'nʌl',
    ipaUS: 'nʌl',
    ipaUK: 'nʌl',
    simplePhonetic: 'Nuhl',
    category: TermCategory.KEYWORD,
    description: '空指针常量。',
    commonError: 'Niu (牛) / Nao (闹)',
    detailedExplanation: '表示“无”。发音应该短促，元音类似 "bus" 中的 u。很多国内开发者受方言或直觉影响，容易读成“牛”或“闹”。',
    codeSnippet: 'int* ptr = nullptr;\nif (ptr == NULL) { ... }'
  },
  {
    id: 'main',
    word: 'main',
    ipa: 'meɪn',
    ipaUS: 'meɪn',
    ipaUK: 'meɪn',
    simplePhonetic: 'Meyn',
    category: TermCategory.KEYWORD,
    description: '程序的主入口函数。',
    commonError: 'Man (慢) / Min (民)',
    detailedExplanation: '主要的意思。发音同 "Pain", "Rain"。元音是双元音 /eɪ/。不要读成短音的 "Man" (男人)。',
    codeSnippet: 'int main() {\n    return 0;\n}'
  },
  {
    id: 'void',
    word: 'void',
    ipa: 'vɔɪd',
    ipaUS: 'vɔɪd',
    ipaUK: 'vɔɪd',
    simplePhonetic: 'Voy-d',
    category: TermCategory.KEYWORD,
    description: '空类型。',
    commonError: 'Woid (沃德 - 混淆v/w音)',
    detailedExplanation: '表示空。关键在于 V 的发音，上牙齿要咬住下嘴唇震动。不要发成 W (圆唇) 的音。',
    codeSnippet: 'void doSomething() {\n    // returns nothing\n}'
  },
  {
    id: 'char',
    word: 'char',
    ipa: 'kɛər',
    ipaUS: 'kɛr',
    ipaUK: 'kɑː',
    simplePhonetic: 'Care',
    category: TermCategory.KEYWORD,
    description: '字符类型。源自 Character。',
    commonError: 'Cha (恰) / Char (查尔)',
    detailedExplanation: '关于 Char 的发音在英语世界也有争议 (Char/Care/Car)，但在 C++ 标准委员会和大多数正式场合，推荐读作 "Care" (Character 的词头)。英式发音中 "Char" (烧焦) /tʃɑː/ 也存在，但作为 C++ 类型推荐 Care。',
    codeSnippet: 'char c = \'A\';\nconst char* str = "Text";'
  },
  {
    id: 'malloc',
    word: 'malloc',
    ipa: 'ˈmælɒk',
    ipaUS: 'ˈmælɑːk',
    ipaUK: 'ˈmælɒk',
    simplePhonetic: 'Mal-lok',
    category: TermCategory.KEYWORD,
    description: 'Memory Allocation。',
    commonError: 'Ma-lo-k (马洛克)',
    detailedExplanation: 'Memory Allocation 的缩写。重音在第一个音节 Mal。第二个音节 loc 读作 lock。',
    codeSnippet: 'void* p = malloc(1024);\nfree(p);'
  }
];