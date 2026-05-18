export type Topic = {
  id: string;
  title: string;
  level?: string;
};

export type Chapter = {
  id: string;
  title: string;
  topics: Topic[];
};

export type Part = {
  id: string;
  title: string;
  colorClass: string;
  bgColor: string;
  chapters: Chapter[];
};

export const catalogData: Part[] = [
  {
    id: "part1",
    title: "第一部分 数与代数",
    colorClass: "text-pink-600",
    bgColor: "#FFE4E1",
    chapters: [
      {
        id: "p1c1",
        title: "1. 数的认识专题",
        topics: [
          { id: "p1c1t1", title: "1. 认识10以内的数字", level: "L1上" },
          { id: "p1c1t2", title: "2. 认识11-20", level: "L1上" },
          { id: "p1c1t3", title: "3. 100以内数的认识", level: "L1下" },
          { id: "p1c1t4", title: "4. 千以内的数字", level: "L2下" },
          { id: "p1c1t5", title: "5. 万以内数的认识", level: "L2下" },
          { id: "p1c1t6", title: "6. 亿以内数的认识", level: "L4上" },
          { id: "p1c1t7", title: "7. 0的认识", level: "L1上" },
        ]
      },
      {
        id: "p1c2",
        title: "2. 加法减法专题",
        topics: [
          { id: "p1c2t1", title: "1. 加法的认识", level: "L1上" },
          { id: "p1c2t2", title: "2. 减法的认识", level: "L1上" },
          { id: "p1c2t3", title: "3. 10以内的加减法", level: "L1上" },
          { id: "p1c2t4", title: "4. 20以内的不进位加法和不退位减法", level: "L1上" },
          { id: "p1c2t5", title: "5. 20以内的进位加法", level: "L1上" },
          { id: "p1c2t6", title: "6. 20以内退位减法", level: "L1下" },
          { id: "p1c2t7", title: "7. 两位数加一位数不进位笔算", level: "L1下" },
          { id: "p1c2t8", title: "8. 两位数加两位数不进位笔算", level: "L1下" },
          { id: "p1c2t9", title: "9. 两位数加两位数进位笔算", level: "L1下" },
          { id: "p1c2t10", title: "10. 两位数减两位数不退位减法", level: "L1下" },
          { id: "p1c2t11", title: "11. 两位数减两位数退位笔算", level: "L1下" },
          { id: "p1c2t12", title: "12. 加减混合", level: "L1上" },
          { id: "p1c2t13", title: "13. 认识小括号", level: "L1下" },
          { id: "p1c2t14", title: "14. 三位数加减三位数的估算", level: "L2下" },
          { id: "p1c2t15", title: "15. 三位数加不进位和一次进位", level: "L2下" },
          { id: "p1c2t16", title: "16. 三位数加三位数(连续进位)", level: "L2下" },
          { id: "p1c2t17", title: "17. 三位数减三位数的(不退位)", level: "L2下" },
          { id: "p1c2t18", title: "18. 三位数减三位数退位减法", level: "L2下" },
          { id: "p1c2t19", title: "19. 三位数中间或末尾有0的", level: "L2下" },
          { id: "p1c2t20", title: "20. 四则运算", level: "L4下" },
        ]
      },
      {
        id: "p1c3",
        title: "3. 乘法专题",
        topics: [
          { id: "p1c3t1", title: "1. 乘法的初步认识", level: "L2上" },
          { id: "p1c3t2", title: "2. 多位数乘一位数(口算)", level: "L3上" },
          { id: "p1c3t3", title: "3. 多位数乘一位数(不进位笔算)", level: "L3上" },
          { id: "p1c3t4", title: "4. 多位数乘一位数(不连续进位)", level: "L3上" },
          { id: "p1c3t5", title: "5. 多位数乘一位数(连续进位)", level: "L3上" },
          { id: "p1c3t6", title: "6. 多位数乘一位数(中间有0)", level: "L3上" },
          { id: "p1c3t7", title: "7. 多位数乘一位数(末尾有0)", level: "L3上" },
          { id: "p1c3t8", title: "8. 两位数乘两位数(口算)", level: "L4上" },
          { id: "p1c3t9", title: "9. 两位数乘两位数(不进位笔算)", level: "L4上" },
          { id: "p1c3t10", title: "10. 两位数乘两位数(末尾有0)", level: "L4上" },
          { id: "p1c3t11", title: "11. 两位数乘两位数(进位笔算)", level: "L4上" },
          { id: "p1c3t12", title: "12. 三位数乘两位数的笔算", level: "L4上" },
          { id: "p1c3t13", title: "13. 乘法交换律和结合律", level: "L4下" },
          { id: "p1c3t14", title: "14. 乘法分配律", level: "L4下" },
          { id: "p1c3t15", title: "15. 乘法估算", level: "L3上" },
          { id: "p1c3t16", title: "16. 乘积的变化规律", level: "L4下" },
        ]
      },
      {
        id: "p1c4",
        title: "4. 除法专题",
        topics: [
          { id: "p1c4t1", title: "1. 除法的初步认识", level: "L2上" },
          { id: "p1c4t2", title: "2. 有余数的除法", level: "L2下" },
          { id: "p1c4t3", title: "3. 除数是一位数(整十整百除以一位数)", level: "L3下" },
          { id: "p1c4t4", title: "4. 除数是一位数(几百几十，几千几十除以一位数)", level: "L3下" },
          { id: "p1c4t5", title: "5. 除数是一位数的笔算", level: "L3下" },
          { id: "p1c4t6", title: "6. 三位数除以一位数(第一课时)", level: "L3下" },
          { id: "p1c4t7", title: "7. 三位数除以一位数(第二课时)", level: "L3下" },
          { id: "p1c4t8", title: "8. 商中间有0的除法", level: "L3下" },
          { id: "p1c4t9", title: "9. 除数是一个数(末尾有0)", level: "L3下" },
          { id: "p1c4t10", title: "10. 除数是两位数的除法(口算估算)", level: "L4上" },
          { id: "p1c4t11", title: "11. 除数是两位数的除法(商是一位数的除法1)", level: "L4上" },
          { id: "p1c4t12", title: "12. 除数是两位数的除法(商是一位数的除法2)", level: "L4上" },
          { id: "p1c4t13", title: "13. 除数是两位数的除法(商是一位数的除法3)", level: "L4上" },
          { id: "p1c4t14", title: "14. 除数是两位数的除法(商是一位数的除法4)", level: "L4上" },
          { id: "p1c4t15", title: "15. 除数是两位数的除法(商是两位数的除法)", level: "L4上" },
          { id: "p1c4t16", title: "16. 商的变化规律", level: "L4上" },
        ]
      },
      {
        id: "p1c5",
        title: "5. 小数专题",
        topics: [
          { id: "p1c5t1", title: "1. 小数的初步认识", level: "L3下" },
          { id: "p1c5t2", title: "2. 小数的计数单位", level: "L3下" },
          { id: "p1c5t3", title: "3. 小数比较大小", level: "L3下" },
          { id: "p1c5t4", title: "4. 小数点移动位置引起小数的变化", level: "L4下" },
          { id: "p1c5t5", title: "5. 循环小数", level: "L5上" },
          { id: "p1c5t6", title: "6. 小数的加减法", level: "L4下" },
          { id: "p1c5t7", title: "7. 小数的乘法", level: "L5上" },
          { id: "p1c5t8", title: "8. 除数是整数的小数除法", level: "L5上" },
          { id: "p1c5t9", title: "9. 一个数除以小数", level: "L5上" },
        ]
      },
      {
        id: "p1c6",
        title: "6. 分数专题",
        topics: [
          { id: "p1c6t1", title: "1. 分数的认识", level: "L3上" },
          { id: "p1c6t2", title: "2. 因数和倍数", level: "L5下" },
          { id: "p1c6t3", title: "3. 2, 3, 5倍数", level: "L5下" },
          { id: "p1c6t4", title: "4. 质数和合数", level: "L5下" },
          { id: "p1c6t5", title: "5. 最大公因数和最小公倍数", level: "L5下" },
          { id: "p1c6t6", title: "6. 真分数和假分数", level: "L5下" },
          { id: "p1c6t7", title: "7. 分数的基本性质", level: "L5下" },
          { id: "p1c6t8", title: "8. 分数的约分", level: "L5下" },
          { id: "p1c6t9", title: "9. 分数的通分", level: "L5下" },
          { id: "p1c6t10", title: "10. 分数与小数的互化", level: "L5下" },
          { id: "p1c6t11", title: "11. 分数的加减", level: "L5下" },
          { id: "p1c6t12", title: "12. 分数的乘法(1)", level: "L6上" },
          { id: "p1c6t13", title: "13. 分数的乘法(2)", level: "L6上" },
          { id: "p1c6t14", title: "14. 分数乘法定律的推广", level: "L6上" },
          { id: "p1c6t15", title: "15. 倒数的认识", level: "L6上" },
          { id: "p1c6t16", title: "16. 分数除以整数", level: "L6上" },
          { id: "p1c6t17", title: "17. 一个数除以分数", level: "L6上" },
        ]
      },
      {
        id: "p1c7",
        title: "7. 方程专题",
        topics: [
          { id: "p1c7t1", title: "1. 用字母表示数第1课时", level: "L5上" },
          { id: "p1c7t2", title: "2. 用字母表示数第2课时", level: "L5上" },
          { id: "p1c7t3", title: "3. 用字母表示数第3课时", level: "L5上" },
          { id: "p1c7t4", title: "4. 用字母表示数第4课时", level: "L5上" },
          { id: "p1c7t5", title: "5. 等式的性质", level: "L5上" },
          { id: "p1c7t6", title: "6. 方程", level: "L5上" },
          { id: "p1c7t7", title: "7. 解方程第1课时", level: "L5上" },
          { id: "p1c7t8", title: "8. 解方程第2课时", level: "L5上" },
          { id: "p1c7t9", title: "9. 解方程第3课时", level: "L5上" },
          { id: "p1c7t10", title: "10. 解方程第4课时", level: "L5上" },
          { id: "p1c7t11", title: "11. 解方程第5课时", level: "L5上" },
          { id: "p1c7t12", title: "12. 解方程第6课时", level: "L5上" },
        ]
      },
      {
        id: "p1c8",
        title: "8. 比和比例",
        topics: [
          { id: "p1c8t1", title: "1. 比的意义", level: "L6上" },
          { id: "p1c8t2", title: "2. 比的基本性质", level: "L6上" },
          { id: "p1c8t3", title: "3. 按比分配", level: "L6上" },
          { id: "p1c8t4", title: "4. 比例的意义", level: "L6下" },
          { id: "p1c8t5", title: "5. 比例的性质", level: "L6下" },
        ]
      },
      {
        id: "p1c9",
        title: "9. 百分数",
        topics: [
          { id: "p1c9t1", title: "1. 百分数的意义", level: "L6上" },
          { id: "p1c9t2", title: "2. 分数小数百分数互化", level: "L6上" },
        ]
      },
      {
        id: "p1c10",
        title: "10. 负数",
        topics: [
          { id: "p1c10t1", title: "1. 负数的初步认识", level: "L6下" },
          { id: "p1c10t2", title: "2. 直线上表示正数，0，负数", level: "L6下" },
        ]
      }
    ]
  },
  {
    id: "part2",
    title: "第二部分 几何",
    colorClass: "text-blue-500",
    bgColor: "#E0FFFF",
    chapters: [
      {
        id: "p2c1",
        title: "1. 长度单位",
        topics: [
          { id: "p2c1t1", title: "1. 认识厘米", level: "L2上" },
          { id: "p2c1t2", title: "2. 认识米", level: "L2上" },
          { id: "p2c1t3", title: "3. 认识毫米", level: "L3上" },
          { id: "p2c1t4", title: "4. 认识分米", level: "L3上" },
          { id: "p2c1t5", title: "5. 长度单位换算", level: "L3上" },
          { id: "p2c1t6", title: "6. 认识千米", level: "L3上" },
        ]
      },
      {
        id: "p2c2",
        title: "2. 面积单位",
        topics: [
          { id: "p2c2t1", title: "1. 面积单位的认识", level: "L3下" },
          { id: "p2c2t2", title: "2. 公顷和平方千米", level: "L4上" },
        ]
      },
      {
        id: "p2c3",
        title: "3. 体积容积单位",
        topics: [
          { id: "p2c3t1", title: "1. 体积单位", level: "L5下" },
          { id: "p2c3t2", title: "2. 容积单位", level: "L5下" },
        ]
      },
      {
        id: "p2c4",
        title: "4. 简单图形",
        topics: [
          { id: "p2c4t1", title: "1. 认识线段，直线，射线", level: "L3上" },
          { id: "p2c4t2", title: "2. 角的初步认识", level: "L3上" },
          { id: "p2c4t3", title: "3. 角的度量", level: "L4上" },
          { id: "p2c4t4", title: "4. 角的分类", level: "L4上" },
          { id: "p2c4t5", title: "5. 平行与垂直", level: "L4上" },
        ]
      },
      {
        id: "p2c5",
        title: "5. 正方形和长方形",
        topics: [
          { id: "p2c5t1", title: "1. 认识正方形和长方形", level: "L1下" },
          { id: "p2c5t2", title: "2. 正方形和长方形的周长", level: "L3下" },
          { id: "p2c5t3", title: "3. 正方形和长方形的面积", level: "L3下" },
        ]
      },
      {
        id: "p2c6",
        title: "6. 平行四边形",
        topics: [
          { id: "p2c6t1", title: "1. 认识平行四边形(底和高)", level: "L4上" },
          { id: "p2c6t2", title: "2. 平行四边形面积", level: "L5上" },
        ]
      },
      {
        id: "p2c7",
        title: "7. 梯形",
        topics: [
          { id: "p2c7t1", title: "1. 认识梯形", level: "L4上" },
          { id: "p2c7t2", title: "2. 梯形的面积", level: "L5上" },
        ]
      },
      {
        id: "p2c8",
        title: "8. 三角形",
        topics: [
          { id: "p2c8t1", title: "1. 认识三角形", level: "L4下" },
          { id: "p2c8t2", title: "2. 三角形三边的关系", level: "L4下" },
          { id: "p2c8t3", title: "3. 三角形按角的分类", level: "L4下" },
          { id: "p2c8t4", title: "4. 三角形的内角和", level: "L4下" },
          { id: "p2c8t5", title: "5. 三角形的面积", level: "L5上" },
        ]
      },
      {
        id: "p2c9",
        title: "9. 圆",
        topics: [
          { id: "p2c9t1", title: "1. 圆的认识", level: "L6上" },
          { id: "p2c9t2", title: "2. 圆的周长", level: "L6上" },
          { id: "p2c9t3", title: "3. 圆的面积", level: "L6上" },
          { id: "p2c9t4", title: "4. 圆环的面积", level: "L6上" },
          { id: "p2c9t5", title: "5. 扇形的面积", level: "L6上" },
        ]
      },
      {
        id: "p2c10",
        title: "10. 长方体和正方体",
        topics: [
          { id: "p2c10t1", title: "1. 长方体和正方体的认识", level: "L5下" },
          { id: "p2c10t2", title: "2. 长方体和正方体的展开图", level: "L5下" },
          { id: "p2c10t3", title: "3. 长方体的表面积", level: "L5下" },
          { id: "p2c10t4", title: "4. 正方体的表面积", level: "L5下" },
          { id: "p2c10t5", title: "5. 长方体和正方体的体积1", level: "L5下" },
          { id: "p2c10t6", title: "6. 长方体和正方体的体积2", level: "L5下" },
          { id: "p2c10t7", title: "7. 正方体和长方体的容积", level: "L5下" },
          { id: "p2c10t8", title: "8. 不规则图形的面积", level: "L6上" },
        ]
      },
      {
        id: "p2c11",
        title: "11. 圆柱",
        topics: [
          { id: "p2c11t1", title: "1. 圆柱的认识", level: "L6下" },
          { id: "p2c11t2", title: "2. 圆柱的表面积", level: "L6下" },
          { id: "p2c11t3", title: "3. 圆柱的体积", level: "L6下" },
          { id: "p2c11t4", title: "4. 圆锥的认识", level: "L6下" },
          { id: "p2c11t5", title: "5. 圆锥的体积", level: "L6下" },
        ]
      },
      {
        id: "p2c12",
        title: "12. 观察物体",
        topics: [
          { id: "p2c12t1", title: "1. 观察物体(一)", level: "L3上" },
          { id: "p2c12t2", title: "2. 观察物体(二)", level: "L3上" },
          { id: "p2c12t3", title: "3. 观察物体(三)", level: "L5下" },
          { id: "p2c12t4", title: "4. 观察物体的应用", level: "L5下" },
        ]
      },
      {
        id: "p2c13",
        title: "13. 图形的运动",
        topics: [
          { id: "p2c13t1", title: "1. 轴对称图形", level: "L5上" },
          { id: "p2c13t2", title: "2. 平移、旋转和对称的应用", level: "L4下" },
          { id: "p2c13t3", title: "3. 平移和旋转", level: "L4下" },
        ]
      },
      {
        id: "p2c14",
        title: "14. 位置与方向",
        topics: [
          { id: "p2c14t1", title: "1. 认识上下前后", level: "L1上" },
          { id: "p2c14t2", title: "2. 数对表示物体的位置", level: "L5上" },
          { id: "p2c14t3", title: "3. 认识东南西北", level: "L2上" },
          { id: "p2c14t4", title: "4. 认识东南、东北、西北、西南", level: "L2上" },
          { id: "p2c14t5", title: "5. 描述某个点位置", level: "L6上" },
        ]
      }
    ]
  },
  {
    id: "part3",
    title: "第三部分 概率与统计",
    colorClass: "text-green-500",
    bgColor: "#F0FFF0",
    chapters: [
      {
        id: "p3c1",
        title: "1. 统计",
        topics: [
          { id: "p3c1t1", title: "1. 条形统计图", level: "L4上" },
          { id: "p3c1t2", title: "2. 折线统计图", level: "L5下" },
          { id: "p3c1t3", title: "3. 扇形统计图", level: "L6上" },
          { id: "p3c1t4", title: "4. 平均数", level: "L4下" },
        ]
      },
      {
        id: "p3c2",
        title: "2. 可能性",
        topics: [
          { id: "p3c2t1", title: "1. 可能性", level: "L5上" },
          { id: "p3c2t2", title: "2. 排列组合解决可能性问题", level: "L5上" },
        ]
      }
    ]
  },
  {
    id: "part4",
    title: "第四部分 解决问题",
    colorClass: "text-orange-500",
    bgColor: "#FFFACD",
    chapters: [
      {
        id: "p4c1",
        title: "1. 时间单位",
        topics: [
          { id: "p4c1t1", title: "1. 认识整时", level: "L2下" },
          { id: "p4c1t2", title: "2. 认识几时几分", level: "L2下" },
          { id: "p4c1t3", title: "3. 时，分，秒换算", level: "L2下" },
          { id: "p4c1t4", title: "4. 认识年、月、日", level: "L3下" },
        ]
      },
      {
        id: "p4c2",
        title: "2. 认识人民币",
        topics: [
          { id: "p4c2t1", title: "1. 认识人民币", level: "L1下" },
          { id: "p4c2t2", title: "2. 人民币的换算", level: "L1下" },
        ]
      },
      {
        id: "p4c3",
        title: "3. 数学广角",
        topics: [
          { id: "p4c3t1", title: "1. 找规律", level: "L1下" },
          { id: "p4c3t2", title: "2. 搭配(一)", level: "L2上" },
          { id: "p4c3t3", title: "3. 搭配(二)", level: "L3下" },
          { id: "p4c3t4", title: "4. 推理", level: "L2下" },
          { id: "p4c3t5", title: "5. 集合", level: "L3上" },
          { id: "p4c3t6", title: "6. 优化", level: "L4上" },
          { id: "p4c3t7", title: "7. 鸡兔同笼", level: "L4上" },
          { id: "p4c3t8", title: "8. 植树问题", level: "L5上" },
          { id: "p4c3t9", title: "9. 找次品", level: "L5下" },
          { id: "p4c3t10", title: "10. 数与形", level: "L6上" },
          { id: "p4c3t11", title: "11. 鸽巢问题", level: "L6下" },
        ]
      },
      {
        id: "p4c4",
        title: "4. 学校同步应用题",
        topics: [
          { id: "p4c4t1", title: "1. 简单加法应用题", level: "L1-L2" },
          { id: "p4c4t2", title: "2. 简单减法应用题", level: "L2-L3" },
          { id: "p4c4t3", title: "3. 简单乘法应用题", level: "L2-L5" },
          { id: "p4c4t4", title: "4. 简单除法应用题", level: "L2-L5" },
          { id: "p4c4t5", title: "5. 综合应用题", level: "L2-L5" },
          { id: "p4c4t6", title: "6. 分数的乘法应用题", level: "L6上" },
          { id: "p4c4t7", title: "7. 分数的除法应用题", level: "L6上" },
          { id: "p4c4t8", title: "8. 百分数的应用题", level: "L6上" },
          { id: "p4c4t9", title: "9. 浓度问题", level: "L6下" },
          { id: "p4c4t10", title: "10. 利润问题", level: "L6下" },
          { id: "p4c4t11", title: "11. 税率和利率", level: "L6下" },
          { id: "p4c4t12", title: "12. 列方程问题", level: "L5上" },
          { id: "p4c4t13", title: "13. 按比分配", level: "L6下" },
          { id: "p4c4t14", title: "14. 比例尺", level: "L6下" },
          { id: "p4c4t15", title: "15. 正比例，反比例问题", level: "L6下" },
        ]
      },
      {
        id: "p4c5",
        title: "5. 思维拓展应用题",
        topics: [
          { id: "p4c5t1", title: "1. 归一问题" },
          { id: "p4c5t2", title: "2. 归总问题" },
          { id: "p4c5t3", title: "3. 和差问题" },
          { id: "p4c5t4", title: "4. 和倍问题" },
          { id: "p4c5t5", title: "5. 差倍问题" },
          { id: "p4c5t6", title: "6. 倍比问题" },
          { id: "p4c5t7", title: "7. 植树问题" },
          { id: "p4c5t8", title: "8. 年龄问题" },
          { id: "p4c5t9", title: "9. 平均数问题" },
          { id: "p4c5t10", title: "10. 还原问题" },
          { id: "p4c5t11", title: "11. 盈亏问题" },
          { id: "p4c5t12", title: "12. 公约公倍问题" },
          { id: "p4c5t13", title: "13. 抽屉原则问题" },
          { id: "p4c5t14", title: "14. 鸡兔同笼问题" },
          { id: "p4c5t15", title: "15. 牛吃草问题" },
          { id: "p4c5t16", title: "16. 正反比例问题" },
          { id: "p4c5t17", title: "17. 按比例分配问题" },
          { id: "p4c5t18", title: "18. 百分数问题" },
          { id: "p4c5t19", title: "19. 商品利润问题" },
          { id: "p4c5t20", title: "20. 存款利率问题" },
          { id: "p4c5t21", title: "21. 溶液浓度问题" },
          { id: "p4c5t22", title: "22. 相遇问题" },
          { id: "p4c5t23", title: "23. 追及问题" },
          { id: "p4c5t24", title: "24. 行船问题" },
          { id: "p4c5t25", title: "25. 列车问题" },
          { id: "p4c5t26", title: "26. 时钟问题" },
          { id: "p4c5t27", title: "27. 工程问题" },
          { id: "p4c5t28", title: "28. 逻辑推理问题" },
          { id: "p4c5t29", title: "29. 周期问题" },
          { id: "p4c5t30", title: "30. 对策问题" },
          { id: "p4c5t31", title: "31. 重复计算问题" },
          { id: "p4c5t32", title: "32. 方阵问题" },
          { id: "p4c5t33", title: "33. 构图布数问题" },
          { id: "p4c5t34", title: "34. 幻方问题" },
          { id: "p4c5t35", title: "35. 最优化问题" },
          { id: "p4c5t36", title: "36. 列方程问题" },
        ]
      },
      {
        id: "p4c6",
        title: "6. 思维拓展应用题(二)",
        topics: [
          { id: "p4c6t1", title: "1. 枚举法" },
          { id: "p4c6t2", title: "2. 假设法" },
          { id: "p4c6t3", title: "3. 整体思想" },
          { id: "p4c6t4", title: "4. 作图法" },
        ]
      }
    ]
  }
];
