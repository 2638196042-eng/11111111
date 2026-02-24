import React, { useState, useEffect, useMemo } from 'react';
import { catalogData } from './data';
import { cn } from './utils';
import { BookOpen, Calendar, PieChart, CheckCircle2, Circle, Download, ChevronDown, ChevronRight, Award, Star, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type TabType = 'dashboard' | 'catalog' | 'plan';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [appName, setAppName] = useState(() => localStorage.getItem('appName') || '宝贝学习计划');
  const [isEditingName, setIsEditingName] = useState(false);
  const [learnedTopics, setLearnedTopics] = useState<string[]>(() => {
    const saved = localStorage.getItem('learnedTopics');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('learnedTopics', JSON.stringify(learnedTopics));
  }, [learnedTopics]);

  useEffect(() => {
    localStorage.setItem('appName', appName);
  }, [appName]);

  const toggleTopic = (id: string) => {
    setLearnedTopics(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const toggleChapter = (partIdx: number, chapterIdx: number, isAllLearned: boolean) => {
    const chapter = catalogData[partIdx].chapters[chapterIdx];
    const topicIds = chapter.topics.map((_, tIdx) => `${partIdx}-${chapterIdx}-${tIdx}`);
    
    setLearnedTopics(prev => {
      if (isAllLearned) {
        // Remove all topics in this chapter
        return prev.filter(id => !topicIds.includes(id));
      } else {
        // Add all topics in this chapter
        const newSet = new Set([...prev, ...topicIds]);
        return Array.from(newSet);
      }
    });
  };

  const stats = useMemo(() => {
    let total = 0;
    catalogData.forEach(part => {
      part.chapters.forEach(chapter => {
        total += chapter.topics.length;
      });
    });
    const learned = learnedTopics.length;
    return {
      total,
      learned,
      unlearned: total - learned,
      percentage: total === 0 ? 0 : Math.round((learned / total) * 100)
    };
  }, [learnedTopics]);

  const downloadCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,\uFEFF"; // Add BOM for Chinese characters
    csvContent += "部分,专题,知识点\n";
    
    catalogData.forEach((part, pIdx) => {
      part.chapters.forEach((chapter, cIdx) => {
        chapter.topics.forEach((topic, tIdx) => {
          const id = `${pIdx}-${cIdx}-${tIdx}`;
          if (!learnedTopics.includes(id)) {
            csvContent += `"${part.part}","${chapter.title}","${topic}"\n`;
          }
        });
      });
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${appName}专属学习计划表.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pb-24 font-sans max-w-3xl mx-auto bg-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-blue-100 shadow-sm px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-xl">
            <Star className="text-blue-500 w-6 h-6 fill-blue-500" />
          </div>
          {isEditingName ? (
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              onBlur={() => setIsEditingName(false)}
              onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)}
              autoFocus
              className="text-2xl font-bold text-blue-600 tracking-wide bg-transparent border-b-2 border-blue-300 focus:outline-none w-40"
              style={{ fontFamily: '"ZCOOL KuaiLe", sans-serif' }}
            />
          ) : (
            <h1 
              className="text-2xl font-bold text-blue-600 tracking-wide cursor-pointer hover:opacity-80 flex items-center gap-1" 
              style={{ fontFamily: '"ZCOOL KuaiLe", sans-serif' }}
              onClick={() => setIsEditingName(true)}
              title="点击修改名称"
            >
              {appName}
              <Edit2 className="w-4 h-4 text-blue-300 inline-block" />
            </h1>
          )}
        </div>
        <div className="text-sm font-bold text-blue-400 bg-blue-50 px-3 py-1 rounded-full">
          {stats.percentage}% 完成
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {activeTab === 'dashboard' && <DashboardView key="dashboard" stats={stats} />}
          {activeTab === 'catalog' && (
            <CatalogView 
              key="catalog" 
              learnedTopics={learnedTopics} 
              toggleTopic={toggleTopic} 
              toggleChapter={toggleChapter} 
            />
          )}
          {activeTab === 'plan' && (
            <PlanView 
              key="plan" 
              learnedTopics={learnedTopics} 
              downloadCSV={downloadCSV} 
            />
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-blue-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe">
        <div className="max-w-3xl mx-auto flex justify-around p-2">
          <NavButton 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<PieChart />} 
            label="进度看板" 
          />
          <NavButton 
            active={activeTab === 'catalog'} 
            onClick={() => setActiveTab('catalog')} 
            icon={<BookOpen />} 
            label="学习目录" 
          />
          <NavButton 
            active={activeTab === 'plan'} 
            onClick={() => setActiveTab('plan')} 
            icon={<Calendar />} 
            label="学习计划" 
          />
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center w-20 py-2 rounded-2xl transition-all duration-300",
        active ? "text-blue-600 bg-blue-50 scale-105" : "text-gray-400 hover:text-blue-400 hover:bg-blue-50/50"
      )}
    >
      <div className={cn("mb-1 transition-transform duration-300", active && "transform -translate-y-1")}>
        {icon}
      </div>
      <span className="text-xs font-bold">{label}</span>
    </button>
  );
}

function DashboardView({ stats }: { key?: React.Key, stats: { total: number, learned: number, unlearned: number, percentage: number } }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full opacity-50" />
        <div className="absolute -left-6 -bottom-6 w-24 h-24 bg-cyan-50 rounded-full opacity-50" />
        
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Award className="text-yellow-500" />
            学习总进度
          </h2>
          
          <div className="mt-6 mb-2 flex justify-between items-end">
            <span className="text-4xl font-black text-blue-500">{stats.percentage}<span className="text-2xl">%</span></span>
            <span className="text-sm text-gray-500 font-medium">加油鸭！🦆</span>
          </div>
          
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.percentage}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-blue-300 to-blue-500 rounded-full"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <StatCard 
          title="已学知识点" 
          value={stats.learned} 
          total={stats.total} 
          color="bg-emerald-50" 
          textColor="text-emerald-600"
          icon="🎉"
        />
        <StatCard 
          title="待学知识点" 
          value={stats.unlearned} 
          total={stats.total} 
          color="bg-blue-50" 
          textColor="text-blue-600"
          icon="📚"
        />
      </div>
      
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50 text-center">
        <img src="https://picsum.photos/seed/cute/400/200?blur=2" alt="Cute placeholder" className="w-full h-32 object-cover rounded-2xl mb-4 opacity-80" referrerPolicy="no-referrer" />
        <p className="text-gray-600 font-medium">
          {stats.percentage === 100 
            ? "太棒啦！所有知识点都学完啦！🏆" 
            : stats.percentage > 50 
              ? "已经完成一半以上啦，继续保持哦！✨" 
              : "千里之行，始于足下。开始今天的学习吧！🚀"}
        </p>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, total, color, textColor, icon }: { title: string, value: number, total: number, color: string, textColor: string, icon: string }) {
  return (
    <div className={cn("rounded-3xl p-5 shadow-sm border border-white/50", color)}>
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-sm font-bold text-gray-600 mb-1">{title}</div>
      <div className="flex items-baseline gap-1">
        <span className={cn("text-3xl font-black", textColor)}>{value}</span>
        <span className="text-sm text-gray-500 font-medium">/ {total}</span>
      </div>
    </div>
  );
}

function CatalogView({ learnedTopics, toggleTopic, toggleChapter }: { 
  key?: React.Key,
  learnedTopics: string[], 
  toggleTopic: (id: string) => void,
  toggleChapter: (pIdx: number, cIdx: number, isAllLearned: boolean) => void
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-blue-50 mb-4">
        <p className="text-sm text-gray-500 text-center font-medium">
          家长可以在这里勾选孩子已经掌握的知识点哦~ 👇
        </p>
      </div>

      {catalogData.map((part, pIdx) => (
        <div key={pIdx} className="space-y-3">
          <h2 className="text-lg font-bold text-blue-600 sticky top-[72px] bg-blue-50/90 backdrop-blur-sm py-2 z-10 rounded-lg px-2">
            {part.part}
          </h2>
          <div className="space-y-3">
            {part.chapters.map((chapter, cIdx) => {
              const chapterTopicIds = chapter.topics.map((_, tIdx) => `${pIdx}-${cIdx}-${tIdx}`);
              const learnedCount = chapterTopicIds.filter(id => learnedTopics.includes(id)).length;
              const isAllLearned = learnedCount === chapter.topics.length;
              const isPartiallyLearned = learnedCount > 0 && !isAllLearned;

              return (
                <ChapterAccordion 
                  key={cIdx}
                  title={chapter.title}
                  topics={chapter.topics}
                  pIdx={pIdx}
                  cIdx={cIdx}
                  learnedTopics={learnedTopics}
                  toggleTopic={toggleTopic}
                  toggleChapter={() => toggleChapter(pIdx, cIdx, isAllLearned)}
                  isAllLearned={isAllLearned}
                  isPartiallyLearned={isPartiallyLearned}
                  learnedCount={learnedCount}
                  totalCount={chapter.topics.length}
                />
              );
            })}
          </div>
        </div>
      ))}
    </motion.div>
  );
}

function ChapterAccordion({ 
  title, topics, pIdx, cIdx, learnedTopics, toggleTopic, toggleChapter, 
  isAllLearned, isPartiallyLearned, learnedCount, totalCount 
}: any) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-blue-50 overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-blue-50/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 flex-1">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleChapter();
            }}
            className="focus:outline-none"
          >
            {isAllLearned ? (
              <CheckCircle2 className="w-6 h-6 text-emerald-500 fill-emerald-100" />
            ) : isPartiallyLearned ? (
              <div className="w-6 h-6 rounded-full border-2 border-emerald-500 flex items-center justify-center bg-emerald-50">
                <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
              </div>
            ) : (
              <Circle className="w-6 h-6 text-gray-300" />
            )}
          </button>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800">{title}</h3>
            <div className="text-xs text-gray-400 font-medium mt-0.5">
              进度: {learnedCount}/{totalCount}
            </div>
          </div>
        </div>
        <div className="text-gray-400">
          {isOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-gray-50 bg-gray-50/50"
          >
            <div className="p-2 space-y-1">
              {topics.map((topic: string, tIdx: number) => {
                const id = `${pIdx}-${cIdx}-${tIdx}`;
                const isLearned = learnedTopics.includes(id);
                return (
                  <div 
                    key={tIdx}
                    onClick={() => toggleTopic(id)}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white cursor-pointer transition-colors"
                  >
                    {isLearned ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                    )}
                    <span className={cn(
                      "text-sm font-medium transition-colors",
                      isLearned ? "text-gray-400 line-through" : "text-gray-700"
                    )}>
                      {topic}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PlanView({ learnedTopics, downloadCSV }: { key?: React.Key, learnedTopics: string[], downloadCSV: () => void }) {
  const unlearnedList = useMemo(() => {
    const list: { part: string, chapter: string, topic: string }[] = [];
    catalogData.forEach((part, pIdx) => {
      part.chapters.forEach((chapter, cIdx) => {
        chapter.topics.forEach((topic, tIdx) => {
          const id = `${pIdx}-${cIdx}-${tIdx}`;
          if (!learnedTopics.includes(id)) {
            list.push({
              part: part.part,
              chapter: chapter.title,
              topic
            });
          }
        });
      });
    });
    return list;
  }, [learnedTopics]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-50 flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">专属学习计划表</h2>
        <p className="text-sm text-gray-500 mb-6 font-medium">
          系统已为您整理好还未学习的知识点，共有 <span className="text-blue-500 font-bold text-lg">{unlearnedList.length}</span> 个。
          <br/>可以下载为表格，贴在书桌前哦！
        </p>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white px-6 py-3 rounded-full font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all active:scale-95"
        >
          <Download className="w-5 h-5" />
          下载专属学习计划表
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-700 px-2 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-blue-400 rounded-full"></span>
          待学清单预览
        </h3>
        
        {unlearnedList.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-blue-50">
            <div className="text-4xl mb-4">🌟</div>
            <p className="text-gray-500 font-bold">太棒啦！所有知识点都学完了！</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-blue-50 overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto p-2 space-y-2">
              {unlearnedList.map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md">{item.part.split(' ')[0]}</span>
                    <span>{item.chapter}</span>
                  </div>
                  <div className="text-sm font-bold text-gray-700 pl-1">
                    {item.topic}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
