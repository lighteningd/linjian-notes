export interface PostMeta {
  id: string;
  title: string;
  excerpt: string;
  category: 'travel' | 'food' | 'books' | 'tech';
  cover: string;
  date: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
  file: string;
}

export const CAT_NAMES: Record<string, string> = {
  travel: '旅行',
  food: '美食',
  books: '读书',
  tech: '技术',
};

export const CAT_EMOJI: Record<string, string> = {
  travel: '✈️',
  food: '🍜',
  books: '📚',
  tech: '💡',
};

export const CAT_COLORS: Record<string, string> = {
  travel: '#9aaa97',
  food: '#c8a888',
  books: '#8fa8c8',
  tech: '#b89dab',
};

export const POSTS_DATA: PostMeta[] = [
  // ═══ 旅行 (10篇) ═══
  { id: 'tibet-ten-days', title: '西藏十天：在云端之上，找回自己', excerpt: '那是一种难以言说的空旷感，天蓝得像被洗过，白云低到触手可及。站在纳木错湖边，我第一次觉得自己很小，但那种小让人心安……', category: 'travel', cover: '🏔️', date: '2026-05-20', readTime: 8, tags: ['西藏', '纳木错', '自驾'], featured: true, file: 'travel/tibet-ten-days.md' },
  { id: 'dali-erhai', title: '大理洱海边：慢下来才看见的风景', excerpt: '租了辆单车，绕着洱海骑了一整天。不赶时间，看到喜欢的地方就停下来，这才是旅行的正确打开方式……', category: 'travel', cover: '🌊', date: '2026-04-28', readTime: 7, tags: ['大理', '洱海', '骑行'], file: 'travel/dali-erhai.md' },
  { id: 'chengdu-three-days', title: '成都三日：一座来了就不想走的城市', excerpt: '宽窄巷子的茶馆、锦里的糖画、大熊猫基地的懒洋洋……三天远远不够，但足够让人爱上这座城市……', category: 'travel', cover: '🐼', date: '2026-04-15', readTime: 6, tags: ['成都', '美食', '熊猫'], file: 'travel/chengdu-three-days.md' },
  { id: 'yunnan-ancient-towns', title: '云南古城漫游记：寻访被时光遗忘的角落', excerpt: '不是大理也不是丽江，那些不知名的小镇才藏着真正的云南。青石板路、老茶馆、听不懂的方言……', category: 'travel', cover: '🏘️', date: '2026-03-22', readTime: 9, tags: ['云南', '古城', '深度游'], file: 'travel/yunnan-ancient-towns.md' },
  { id: 'xiamen-gulangyu', title: '厦门鼓浪屿：一座岛的文艺时光', excerpt: '三角梅从墙头探出来，钢琴声随风飘荡，鼓浪屿的每一条小巷都有故事。在这里，连迷路都是一种浪漫……', category: 'travel', cover: '🌴', date: '2026-03-08', readTime: 5, tags: ['厦门', '鼓浪屿', '文艺'], file: 'travel/xiamen-gulangyu.md' },
  { id: 'huangshan-hiking', title: '黄山徒步：云海日出，一生必看', excerpt: '凌晨四点摸黑上山，寒风刺骨。当第一缕阳光穿透云海，所有人都安静了——那种震撼无法用语言形容……', category: 'travel', cover: '⛰️', date: '2026-02-14', readTime: 7, tags: ['黄山', '徒步', '日出'], file: 'travel/huangshan-hiking.md' },
  { id: 'chongqing-mountain-city', title: '重庆：一座立体的魔幻山城', excerpt: '轻轨穿楼而过，电梯上到八楼出来还是马路。在这座3D城市里，导航都开始怀疑人生……', category: 'travel', cover: '🏙️', date: '2026-01-18', readTime: 6, tags: ['重庆', '轻轨', '魔幻'], file: 'travel/chongqing-mountain-city.md' },
  { id: 'hangzhou-xihu', title: '杭州西湖：晴西湖不如雨西湖', excerpt: '恰逢细雨，湖面泛起涟漪。断桥上撑伞的人流如织，苏堤上的垂柳在风中摇摆……', category: 'travel', cover: '🌸', date: '2025-12-05', readTime: 5, tags: ['杭州', '西湖', '烟雨'], file: 'travel/hangzhou-xihu.md' },
  { id: 'wuzhen-watertown', title: '乌镇水乡：枕水江南梦', excerpt: '夜幕降临，红灯笼点亮河道，乌篷船静静划过。恍惚间仿佛回到了千年前……', category: 'travel', cover: '🚣', date: '2025-11-12', readTime: 5, tags: ['乌镇', '水乡', '江南'], file: 'travel/wuzhen-watertown.md' },
  { id: 'shenzhen-dongxi-chong', title: '深圳东西冲穿越：离城市最近的天涯海角', excerpt: '深圳不止有写字楼，还有绝美的海岸线。东西冲穿越，用双脚丈量这片山海……', category: 'travel', cover: '🏖️', date: '2025-10-20', readTime: 6, tags: ['深圳', '海岸线', '徒步'], file: 'travel/shenzhen-dongxi-chong.md' },

  // ═══ 美食 (10篇) ═══
  { id: 'chengdu-chuanchuan', title: '成都串串香：一根签子的烟火哲学', excerpt: '成都人吃串串，不是在吃食物，是在吃一种松弛的生活态度。锅底翻滚，签子随意，方寸之间有整个江湖……', category: 'food', cover: '🍲', date: '2026-05-15', readTime: 5, tags: ['成都', '串串', '火锅'], file: 'food/chengdu-chuanchuan.md' },
  { id: 'midnight-noodle', title: '深夜食堂：那碗让我泪目的牛肉面', excerpt: '加班到凌晨，路边一家不起眼的面馆还亮着灯。老板娘端来一碗面，汤浓肉香，第一口就觉得今天的苦值了……', category: 'food', cover: '🍜', date: '2026-04-20', readTime: 4, tags: ['面条', '深夜', '温暖'], file: 'food/midnight-noodle.md' },
  { id: 'guangzhou-dim-sum', title: '广州早茶：一盅两件的岭南风情', excerpt: '虾饺皮薄如纸、烧卖肉汁四溢、凤爪酥烂入味……广东人的一天从一壶茶和几笼点心开始……', category: 'food', cover: '🥟', date: '2026-03-30', readTime: 6, tags: ['广州', '早茶', '粤菜'], file: 'food/guangzhou-dim-sum.md' },
  { id: 'braised-pork', title: '红烧肉：一块有故事的肉', excerpt: '外婆的红烧肉，永远用砂锅，永远炖足两小时。肥而不腻、入口即化，那是家的味道……', category: 'food', cover: '🍖', date: '2026-03-10', readTime: 4, tags: ['红烧肉', '家常', '回忆'], file: 'food/braised-pork.md' },
  { id: 'lanzhou-vs-shaanxi-noodle', title: '兰州拉面 vs 陕西面食：北方面条江湖', excerpt: '一个清汤见底、讲究牛肉原味；一个油泼辣子、追求浓郁热烈。两种面食，两种北方性格……', category: 'food', cover: '🍝', date: '2026-02-22', readTime: 5, tags: ['兰州', '陕西', '面食'], file: 'food/lanzhou-vs-shaanxi-noodle.md' },
  { id: 'roasted-sweet-potato', title: '烤红薯：冬天的第一个拥抱', excerpt: '寒风里，烤红薯的香气能飘三条街。捧在手里，世界都暖了……', category: 'food', cover: '🍠', date: '2026-01-25', readTime: 3, tags: ['冬季', '街头小吃', '温暖'], file: 'food/roasted-sweet-potato.md' },
  { id: 'failed-picnic', title: '一次失败却美好的野餐记', excerpt: '帐篷被风吹倒、三明治掉进河里、忘了带杯子只能对瓶喝……但阳光和笑声，让一切不完美都变得可爱……', category: 'food', cover: '🧺', date: '2025-12-18', readTime: 4, tags: ['野餐', '户外', '趣事'], file: 'food/failed-picnic.md' },
  { id: 'coffee-journey', title: '我的咖啡探索之旅：从速溶到手冲', excerpt: '从最初的雀巢三合一，到现在的耶加雪菲手冲。这一路，我喝的不是咖啡，是生活的层次……', category: 'food', cover: '☕', date: '2025-11-28', readTime: 5, tags: ['咖啡', '手冲', '品鉴'], file: 'food/coffee-journey.md' },
  { id: 'chongqing-hotpot-philosophy', title: '重庆火锅哲学：辣是一种信仰', excerpt: '九宫格里沸腾的红油，毛肚七上八下的仪式感。在重庆，没有一顿火锅解决不了的烦恼……', category: 'food', cover: '🔥', date: '2025-10-15', readTime: 5, tags: ['重庆', '火锅', '江湖'], file: 'food/chongqing-hotpot-philosophy.md' },
  { id: 'midnight-convenience-store', title: '便利店食物大赏：打工人深夜食堂', excerpt: '凌晨两点的全家，便当、关东煮、饭团在这里竟然能吃出幸福。打工人深夜美食大排名……', category: 'food', cover: '🏪', date: '2025-09-08', readTime: 4, tags: ['便利店', '深夜', '打工人'], file: 'food/midnight-convenience-store.md' },

  // ═══ 读书 (10篇) ═══
  { id: 'alive-yuhua', title: '读《活着》：苦难不是终点，是旁白', excerpt: '余华用一种近乎残忍的平静，讲完了福贵的一生。合上书，窗外阳光正好，忽然觉得当下的每一刻都珍贵……', category: 'books', cover: '📖', date: '2026-05-10', readTime: 6, tags: ['余华', '小说', '人生'], file: 'books/alive-yuhua.md' },
  { id: 'sapiens-review', title: '《人类简史》：我们凭什么站在食物链顶端', excerpt: '赫拉利用一个宏大的视角重新审视人类历史。读完最大的感受是：人类所有的文明，不过是一群猴子编的故事……', category: 'books', cover: '🧠', date: '2026-04-25', readTime: 8, tags: ['人类简史', '历史', '认知'], file: 'books/sapiens-review.md' },
  { id: 'little-prince-adult', title: '重读《小王子》：成年人读懂的句子，小孩看懂的画', excerpt: '小时候觉得是童话，长大后才发现句句都是哲理。"真正重要的东西，眼睛是看不见的"……', category: 'books', cover: '🌹', date: '2026-04-10', readTime: 5, tags: ['小王子', '童话', '成长'], file: 'books/little-prince-adult.md' },
  { id: 'principles-review', title: '《原则》：达利欧的人生算法', excerpt: '痛苦 + 反思 = 进步。瑞·达利欧把他的人生经验提炼成了一个操作系统……', category: 'books', cover: '⚖️', date: '2026-03-18', readTime: 7, tags: ['原则', '投资', '方法论'], file: 'books/principles-review.md' },
  { id: 'byakuyako-review', title: '《白夜行》：唯有太阳和人心不可直视', excerpt: '东野圭吾用一部长篇，编织了一张让人窒息的命运之网。读完久久不能平静……', category: 'books', cover: '🌑', date: '2026-02-28', readTime: 6, tags: ['东野圭吾', '悬疑', '人性'], file: 'books/byakuyako-review.md' },
  { id: 'deliberate-practice', title: '《刻意练习》：天才不是天生的', excerpt: '一万小时定律的升级版。真正让人成为专家的不是时间，而是正确的练习方法……', category: 'books', cover: '🎯', date: '2026-02-05', readTime: 6, tags: ['刻意练习', '成长', '方法论'], file: 'books/deliberate-practice.md' },
  { id: 'almanack-naval', title: '《纳瓦尔宝典》：财富与幸福的底层逻辑', excerpt: '财富是你睡着后还在为你赚钱的东西。Naval 关于财富和幸福的思考，值得反复咀嚼……', category: 'books', cover: '💎', date: '2026-01-15', readTime: 5, tags: ['纳瓦尔', '财富', '幸福'], file: 'books/almanack-naval.md' },
  { id: 'hundred-years-of-solitude', title: '《百年孤独》：孤独是刻在基因里的密码', excerpt: '马尔克斯用魔幻现实主义的笔，写尽了一个家族七代人的命运轮回……', category: 'books', cover: '🦋', date: '2025-12-22', readTime: 7, tags: ['马尔克斯', '经典', '孤独'], file: 'books/hundred-years-of-solitude.md' },
  { id: 'crowd-psychology', title: '《乌合之众》：群体中的我们为何如此愚蠢', excerpt: '勒庞在1895年写下的文字，今天读来依然刺骨。群体中的个人会失去独立思考能力……', category: 'books', cover: '👥', date: '2025-11-08', readTime: 6, tags: ['心理学', '群体', '社会学'], file: 'books/crowd-psychology.md' },
  { id: 'wang-xiaobo-silence', title: '读王小波：沉默的大多数的智慧', excerpt: '王小波的杂文像一壶烈酒，辛辣、直接、又带着独特的风趣。二十多年前的文字，至今读来依旧锋利……', category: 'books', cover: '✒️', date: '2025-10-01', readTime: 5, tags: ['王小波', '杂文', '思想'], file: 'books/wang-xiaobo-silence.md' },

  // ═══ 技术 (10篇) ═══
  { id: 'pdfbox-font-k8s', title: '用 PDFBox 3.0 踩坑记：字体加载的前世今生', excerpt: 'K8s 容器里的字体路径问题折腾了我两天，最后发现是 ClassLoader 的锅。记录下来，希望搜到这篇文章的你少走弯路……', category: 'tech', cover: '📄', date: '2026-05-05', readTime: 10, tags: ['PDFBox', 'K8s', 'Java'], file: 'tech/pdfbox-font-k8s.md' },
  { id: 'spring-boot-3-migration', title: 'Spring Boot 3.x 迁移实战：从2到3的血泪史', excerpt: 'Java 17 到 21，javax 到 jakarta，Spring Security 大改……踩过的坑、蹚过的水，都在这里了……', category: 'tech', cover: '🍃', date: '2026-04-12', readTime: 12, tags: ['Spring Boot', 'Java', '迁移'], file: 'tech/spring-boot-3-migration.md' },
  { id: 'git-workflow-best-practices', title: 'Git 工作流最佳实践：一个后端开发的日常', excerpt: '从 commit message 规范到分支策略，一个 Java 开发者的 Git 使用心得。团队协作效率翻倍……', category: 'tech', cover: '🔀', date: '2026-03-25', readTime: 7, tags: ['Git', '工作流', '团队'], file: 'tech/git-workflow-best-practices.md' },
  { id: 'code-readability', title: '代码可读性：写给未来的自己', excerpt: '代码是写给人看的，顺便给机器执行。关于命名的艺术、注释的边界、函数的设计……', category: 'tech', cover: '✍️', date: '2026-03-05', readTime: 6, tags: ['代码质量', '可读性', '工程'], file: 'tech/code-readability.md' },
  { id: 'mysql-json-field', title: 'MySQL JSON 字段实战：利与弊', excerpt: '在项目中大量使用 JSON 字段存储配置数据，一年后的复盘。好处是灵活，坏处也不少……', category: 'tech', cover: '🗄️', date: '2026-02-18', readTime: 8, tags: ['MySQL', 'JSON', '数据库'], file: 'tech/mysql-json-field.md' },
  { id: 'dev-tools-i-use', title: '我的开发工具清单：效率提升的秘密', excerpt: '从 IDE 插件到终端工具，从浏览器扩展到底层工具。这些年最好用的开发效率神器都在这里了……', category: 'tech', cover: '🛠️', date: '2026-01-30', readTime: 6, tags: ['工具', '效率', '推荐'], file: 'tech/dev-tools-i-use.md' },
  { id: 'start-writing', title: '程序员为什么应该写博客', excerpt: '写了两年技术博客，收获的远不止技术影响力。写作是最好的思考方式，也是最好的名片……', category: 'tech', cover: '📝', date: '2025-12-15', readTime: 5, tags: ['写作', '博客', '成长'], file: 'tech/start-writing.md' },
  { id: 'kubernetes-for-developers', title: 'Kubernetes 开发者的生存指南', excerpt: '不是运维，但你需要了解 Pod、Service、ConfigMap……一个后端开发的 K8s 实用手册……', category: 'tech', cover: '☸️', date: '2025-11-20', readTime: 9, tags: ['Kubernetes', '云原生', 'DevOps'], file: 'tech/kubernetes-for-developers.md' },
  { id: 'ai-coding-one-year', title: 'AI 辅助编程一年后的真实感受', excerpt: '从最初的新奇到现在的深度依赖，AI 到底改变了什么？能力边界在哪？一年的真实体感分享……', category: 'tech', cover: '🤖', date: '2025-10-10', readTime: 7, tags: ['AI', '编程', '工具'], file: 'tech/ai-coding-one-year.md' },
  { id: 'react-vs-vue', title: 'React 还是 Vue？一个后端转前端的选型思考', excerpt: '作为一个主要写 Java 的人，学前端的第一道坎就是选框架。说说我对这两个框架的理解……', category: 'tech', cover: '⚛️', date: '2025-09-15', readTime: 6, tags: ['React', 'Vue', '前端'], file: 'tech/react-vs-vue.md' },
];
