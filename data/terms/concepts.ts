import { Term, TermCategory } from '../../types';

export const CONCEPT_TERMS: Term[] = [
  {
    id: 'app',
    word: 'App',
    ipa: 'æp',
    ipaUS: 'æp',
    ipaUK: 'æp',
    simplePhonetic: 'Ap',
    category: TermCategory.CONCEPT,
    description: '应用程序 (Application) 的缩写。',
    commonError: 'A-P-P (逐字母读)',
    detailedExplanation: 'App 是 Application 的缩写，应该作为一个单词来读，发音类似 "Apple" 的第一个音节。在中文语境中，经常被误读为三个字母 A-P-P，这在英语母语者听起来会非常奇怪。',
    codeSnippet: '// Launching the App\nApplication::Run();'
  },
  {
    id: 'daemon',
    word: 'daemon',
    ipa: 'ˈdiːmən',
    ipaUS: 'ˈdiːmən',
    ipaUK: 'ˈdiːmən',
    simplePhonetic: 'Dee-mon',
    category: TermCategory.CONCEPT,
    description: '守护进程。后台运行的计算机程序。',
    commonError: 'Da-ming (大明) / Day-mon',
    detailedExplanation: '源自希腊语 daimon。在计算机术语中，它指的是在后台运行的服务进程。发音同 "Demon" (恶魔)。很多人受 ae 拼写影响误读为 "Day-mon"。',
    codeSnippet: 'systemd_daemon.start();\n// Runs in background'
  },
  {
    id: 'cache',
    word: 'cache',
    ipa: 'kæʃ',
    ipaUS: 'kæʃ',
    ipaUK: 'kæʃ',
    simplePhonetic: 'Kash',
    category: TermCategory.CONCEPT,
    description: '缓存。计算机中用于高速数据存储的层级。',
    commonError: 'Catch (卡其/抓)',
    detailedExplanation: '法语词源。发音完全同现金 "Cash"。绝对不要读成 "Catch" (抓)。这是一个极其高频的错误。',
    codeSnippet: 'CPU_Cache_L1.flush();\n// Not "Catch"'
  },
  {
    id: 'schema',
    word: 'schema',
    ipa: 'ˈskiːmə',
    ipaUS: 'ˈskiːmə',
    ipaUK: 'ˈskiːmə',
    simplePhonetic: 'Skee-ma',
    category: TermCategory.CONCEPT,
    description: '模式/架构。常见于数据库或XML设计。',
    commonError: 'She-ma (希玛) / Su-ma',
    detailedExplanation: 'Sch 在这里发 /sk/ 的音，类似 "School"。不要读成 "Schema" (希玛)。',
    codeSnippet: 'CREATE SCHEMA my_schema;\n// SQL or XML definition'
  },
  {
    id: 'width',
    word: 'width',
    ipa: 'wɪdθ',
    ipaUS: 'wɪdθ',
    ipaUK: 'wɪdθ',
    simplePhonetic: 'With',
    category: TermCategory.CONCEPT,
    description: '宽度。',
    commonError: 'Wai-si (歪死) / Wid-th (重读th)',
    detailedExplanation: 'd 是不发音的，或者非常轻微。主要发音是 wi + th。以咬舌音结尾。不要加元音变成 "歪死"。',
    codeSnippet: 'int width = 100;\nrect.setWidth(width);'
  },
  {
    id: 'height',
    word: 'height',
    ipa: 'haɪt',
    ipaUS: 'haɪt',
    ipaUK: 'haɪt',
    simplePhonetic: 'Hite',
    category: TermCategory.CONCEPT,
    description: '高度。',
    commonError: 'Hate (黑特) / He-ge-te',
    detailedExplanation: 'ei 发 /ai/ 的音 (High)。结尾是 t。完全同 "High" + "t"。不要读成 "Hate" (恨)。',
    codeSnippet: 'int height = 200;\n// Pronounced like "High-t"'
  },
  {
    id: 'image',
    word: 'image',
    ipa: 'ˈɪmɪdʒ',
    ipaUS: 'ˈɪmədʒ',
    ipaUK: 'ˈɪmɪdʒ',
    simplePhonetic: 'Im-ij',
    category: TermCategory.CONCEPT,
    description: '图像。',
    commonError: 'Im-age (意妹支)',
    detailedExplanation: '重音在第一个音节。a 发 /ɪ/ 的音，类似 "Village"。不要重读第二个音节变成 "Age"。',
    codeSnippet: 'Image img;\nimg.load("texture.png");'
  },
  {
    id: 'ajax',
    word: 'AJAX',
    ipa: 'ˈeɪdʒæks',
    ipaUS: 'ˈeɪdʒæks',
    ipaUK: 'ˈeɪdʒæks',
    simplePhonetic: 'Ay-jacks',
    category: TermCategory.CONCEPT,
    description: '异步 JavaScript 和 XML。',
    commonError: 'A-Jax (阿贾克斯)',
    detailedExplanation: '虽然是足球队名阿贾克斯的拼写，但在技术圈读作 /eɪdʒæks/。A 发字母音 /ei/。',
    codeSnippet: '$.ajax({ url: "/api" });\n// Web request'
  }
];