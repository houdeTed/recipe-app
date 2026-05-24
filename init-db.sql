-- ============================================
-- Recipe App - 数据库初始化脚本
-- 使用方法: mysql -u root -p < init-db.sql
-- ============================================

CREATE DATABASE IF NOT EXISTS recipe_app
  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE recipe_app;

-- 菜肴表
CREATE TABLE IF NOT EXISTS dishes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  description VARCHAR(500) NOT NULL
);

-- 食材表
CREATE TABLE IF NOT EXISTS ingredients (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dish_id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  amount VARCHAR(50) NOT NULL,
  FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

-- 步骤表
CREATE TABLE IF NOT EXISTS steps (
  id INT AUTO_INCREMENT PRIMARY KEY,
  dish_id INT NOT NULL,
  step_number INT NOT NULL,
  instruction VARCHAR(500) NOT NULL,
  FOREIGN KEY (dish_id) REFERENCES dishes(id)
);

-- ============================================
-- 种子数据：10 道菜肴
-- ============================================

-- 1. 宫保鸡丁
INSERT INTO dishes (id, name, image_url, description) VALUES
(1, '宫保鸡丁', 'https://picsum.photos/seed/kungpao/800/400', '四川名菜，鸡肉丁与花生米同炒，口感麻辣鲜香。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(1, '鸡胸肉', '300g'),
(1, '花生米', '50g'),
(1, '干辣椒', '10个'),
(1, '花椒', '1小勺'),
(1, '葱姜蒜', '适量'),
(1, '生抽', '2勺'),
(1, '醋', '1勺'),
(1, '白糖', '1勺'),
(1, '淀粉', '1勺');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(1, 1, '鸡胸肉切丁，加料酒、盐、淀粉腌制15分钟。'),
(1, 2, '花生米小火炒熟备用。'),
(1, 3, '调碗汁：生抽、醋、白糖、淀粉、水混合均匀。'),
(1, 4, '锅中热油，下鸡丁滑炒至变色盛出。'),
(1, 5, '锅中留底油，下干辣椒和花椒爆香，加葱姜蒜炒香。'),
(1, 6, '倒回鸡丁翻炒，淋入碗汁快速翻炒，最后下花生米翻匀即可。');

-- 2. 麻婆豆腐
INSERT INTO dishes (id, name, image_url, description) VALUES
(2, '麻婆豆腐', 'https://picsum.photos/seed/mapo/800/400', '经典川菜，豆腐嫩滑，肉末酥香，麻辣烫俱全。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(2, '嫩豆腐', '1块'),
(2, '猪肉末', '100g'),
(2, '郫县豆瓣酱', '1.5勺'),
(2, '花椒粉', '1小勺'),
(2, '水淀粉', '1小碗'),
(2, '葱姜蒜', '适量'),
(2, '生抽', '1勺'),
(2, '青蒜苗', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(2, 1, '豆腐切2cm方块，加盐沸水焯2分钟捞出沥干。'),
(2, 2, '锅中热油，下猪肉末炒至变色盛出。'),
(2, 3, '锅中加豆瓣酱炒出红油，加姜蒜末爆香，加适量水煮开。'),
(2, 4, '下豆腐轻轻推匀，加生抽调味，中小火煮3-5分钟。'),
(2, 5, '淋入水淀粉勾芡，轻轻推动让芡汁均匀包裹。'),
(2, 6, '出锅装盘，撒上花椒粉和青蒜苗碎即可。');

-- 3. 红烧肉
INSERT INTO dishes (id, name, image_url, description) VALUES
(3, '红烧肉', 'https://picsum.photos/seed/hongshao/800/400', '国民家常菜，五花肉肥而不腻，色泽红亮，入口即化。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(3, '五花肉', '500g'),
(3, '冰糖', '30g'),
(3, '生抽', '2勺'),
(3, '老抽', '1勺'),
(3, '料酒', '2勺'),
(3, '姜片', '2块'),
(3, '八角', '1个'),
(3, '桂皮', '2段'),
(3, '葱段', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(3, 1, '五花肉切3cm方块，冷水下锅加姜片料酒焯水，撇去浮沫捞出。'),
(3, 2, '锅中少许油，下冰糖小火炒至枣红色起泡。'),
(3, 3, '倒入五花肉快速翻炒上色，加姜片八角桂皮炒香。'),
(3, 4, '加料酒、生抽、老抽翻炒均匀，倒入没过肉的开水。'),
(3, 5, '大火烧开转小火，加盖炖煮40-60分钟。'),
(3, 6, '开盖转大火收汁，至汤汁浓稠裹在肉上即可。');

-- 4. 糖醋里脊
INSERT INTO dishes (id, name, image_url, description) VALUES
(4, '糖醋里脊', 'https://picsum.photos/seed/tangcu/800/400', '外酥里嫩，酸甜可口，色泽金黄诱人。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(4, '猪里脊肉', '300g'),
(4, '鸡蛋', '1个'),
(4, '淀粉', '适量'),
(4, '番茄酱', '3勺'),
(4, '白糖', '2勺'),
(4, '白醋', '1.5勺'),
(4, '生抽', '1勺'),
(4, '熟芝麻', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(4, 1, '里脊肉切条，加料酒盐腌制15分钟。'),
(4, 2, '碗中打入鸡蛋加淀粉搅成糊状，放入肉条裹匀。'),
(4, 3, '锅中热油至六成热，下肉条炸至微黄捞出，油温升高再复炸至金黄。'),
(4, 4, '调糖醋汁：番茄酱、白糖、白醋、生抽、水混合。'),
(4, 5, '锅中留底油，倒入糖醋汁煮至冒泡粘稠，下炸好的肉条快速翻匀。'),
(4, 6, '撒上熟芝麻即可出锅装盘。');

-- 5. 西红柿炒鸡蛋
INSERT INTO dishes (id, name, image_url, description) VALUES
(5, '西红柿炒鸡蛋', 'https://picsum.photos/seed/xihongshi/800/400', '国民下饭菜，简单上手，酸甜开胃。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(5, '西红柿', '2个'),
(5, '鸡蛋', '3个'),
(5, '葱花', '适量'),
(5, '白糖', '1小勺'),
(5, '盐', '适量'),
(5, '食用油', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(5, 1, '西红柿顶部划十字，热水烫一下去皮，切小块备用。'),
(5, 2, '鸡蛋打散加少许盐搅匀，锅中热油炒熟盛出。'),
(5, 3, '锅中少许油，下西红柿块炒出汁，加白糖中和酸味。'),
(5, 4, '倒回炒好的鸡蛋，大火翻炒均匀。'),
(5, 5, '加盐调味，撒葱花翻炒几下即可出锅。');

-- 6. 鱼香肉丝
INSERT INTO dishes (id, name, image_url, description) VALUES
(6, '鱼香肉丝', 'https://loremflickr.com/800/400/chinese_food', '经典川菜，酸甜微辣，肉丝滑嫩，鱼香味浓。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(6, '猪里脊肉', '200g'),
(6, '木耳', '50g'),
(6, '胡萝卜', '半根'),
(6, '青椒', '1个'),
(6, '葱姜蒜', '适量'),
(6, '郫县豆瓣酱', '1勺'),
(6, '鱼香汁(醋生抽糖淀粉水)', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(6, 1, '里脊肉切丝，加料酒盐淀粉腌制10分钟。'),
(6, 2, '木耳泡发切丝，胡萝卜青椒切丝备用。'),
(6, 3, '调鱼香汁：醋、生抽、白糖、淀粉、水搅拌均匀。'),
(6, 4, '锅中热油，下肉丝滑炒变色盛出。锅中加豆瓣酱炒出红油，加姜蒜末爆香。'),
(6, 5, '下胡萝卜丝和木耳丝翻炒至断生，倒回肉丝，加青椒丝，淋入鱼香汁快速翻匀出锅。');

-- 7. 水煮鱼
INSERT INTO dishes (id, name, image_url, description) VALUES
(7, '水煮鱼', 'https://loremflickr.com/800/400/fish', '四川招牌菜，鱼片嫩滑，麻辣鲜香，滚热的红油浇上瞬间香气四溢。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(7, '草鱼', '1条(约1000g)'),
(7, '豆芽', '200g'),
(7, '干辣椒', '一把'),
(7, '花椒', '2小勺'),
(7, '郫县豆瓣酱', '2勺'),
(7, '姜蒜', '适量'),
(7, '料酒淀粉蛋清', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(7, 1, '草鱼片成薄片，加料酒、盐、蛋清、淀粉拌匀腌制15分钟。'),
(7, 2, '豆芽焯水后铺在大碗底部。'),
(7, 3, '锅中热油，下豆瓣酱炒出红油，加姜蒜爆香，倒入适量水煮开。'),
(7, 4, '将鱼片逐片滑入锅中，煮至鱼片变白即可。'),
(7, 5, '将鱼片和汤汁倒入铺好豆芽的碗中。'),
(7, 6, '另起锅烧热油，下干辣椒和花椒炸香，趁热浇在鱼片上即可。');

-- 8. 回锅肉
INSERT INTO dishes (id, name, image_url, description) VALUES
(8, '回锅肉', 'https://loremflickr.com/800/400/pork', '四川传统名菜，肉片薄而卷曲，配上蒜苗的清香和豆瓣的酱香。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(8, '五花肉', '300g'),
(8, '蒜苗', '3根'),
(8, '郫县豆瓣酱', '1.5勺'),
(8, '甜面酱', '1小勺'),
(8, '姜片', '3片'),
(8, '料酒', '1勺');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(8, 1, '五花肉整块冷水下锅，加姜片和料酒煮至筷子能插透，捞出放凉。'),
(8, 2, '煮好的肉切成薄片，蒜苗斜切成段。'),
(8, 3, '锅中少许油，下肉片中火煸炒至肉片卷曲出油，盛出备用。'),
(8, 4, '锅中留底油，下豆瓣酱炒出红油，加甜面酱炒香。'),
(8, 5, '倒回肉片翻炒均匀，最后下蒜苗段快速翻炒几下即可出锅。');

-- 9. 清蒸鲈鱼
INSERT INTO dishes (id, name, image_url, description) VALUES
(9, '清蒸鲈鱼', 'https://loremflickr.com/800/400/seafood', '广式经典做法，鱼肉鲜嫩原汁原味，蒸鱼豉油提鲜，保留鱼的本真之味。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(9, '鲈鱼', '1条(约500g)'),
(9, '姜', '1块'),
(9, '葱', '2根'),
(9, '蒸鱼豉油', '3勺'),
(9, '料酒', '1勺'),
(9, '食用油', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(9, 1, '鲈鱼处理干净，两面各划几刀，抹上料酒和少许盐腌制10分钟。'),
(9, 2, '盘底铺姜片和葱段，放上鱼，鱼身上再放姜丝。'),
(9, 3, '水开后放入蒸锅，大火蒸8-10分钟，关火虚蒸2分钟。'),
(9, 4, '取出倒掉盘中的腥水，铺上新鲜葱丝，淋上蒸鱼豉油。'),
(9, 5, '另起锅烧热油，浇在葱丝上激出香味即可。');

-- 10. 酸辣土豆丝
INSERT INTO dishes (id, name, image_url, description) VALUES
(10, '酸辣土豆丝', 'https://loremflickr.com/800/400/potato', '家常快手菜，土豆丝脆爽，酸辣开胃，经济实惠的国民小炒。');

INSERT INTO ingredients (dish_id, name, amount) VALUES
(10, '土豆', '2个'),
(10, '干辣椒', '4-5个'),
(10, '花椒', '1小勺'),
(10, '白醋', '2勺'),
(10, '蒜', '3瓣'),
(10, '盐', '适量');

INSERT INTO steps (dish_id, step_number, instruction) VALUES
(10, 1, '土豆切细丝，放入冷水中浸泡去掉多余淀粉，洗净沥干。'),
(10, 2, '锅中热油，小火炸香花椒和干辣椒，再下蒜片爆香。'),
(10, 3, '转大火，倒入土豆丝快速翻炒，加入白醋保持脆爽。'),
(10, 4, '炒至土豆丝断生，加盐调味，再淋少许醋提香即可出锅。');
