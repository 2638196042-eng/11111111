import React, { useState, useEffect, useMemo } from 'react';
import { Loader2, Lock, Unlock, BookOpen, CheckCircle2, Circle, Download, ChevronDown, ChevronRight, PieChart, Calendar, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { catalogData, Part, Chapter, Topic } from './data';
import { cn } from './utils';

type TabType = 'catalog' | 'dashboard' | 'plan';

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('authToken'));
  const [isVerifying, setIsVerifying] = useState(true);
  const [isValidated, setIsValidated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsVerifying(false);
        return;
      }
      try {
        const res = await fetch('/api/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });
        const data = await res.json();
        if (data.valid) {
          setIsValidated(true);
        } else {
          localStorage.removeItem('authToken');
          setToken(null);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsVerifying(false);
      }
    };
    verifyToken();
  }, [token]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isValidated) {
    return <ActivationScreen onActivate={(newToken) => {
      localStorage.setItem('authToken', newToken);
      setToken(newToken);
      setIsValidated(true);
    }} />;
  }

  return <MainApp />;
}

function ActivationScreen({ onActivate }: { onActivate: (token: string) => void }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError('请输入专属授权码');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: code.trim() })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        onActivate(data.token);
      } else {
        setError(data.error || '激活失败');
      }
    } catch (err) {
      setError('网络错误，请检查连接');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 font-sans selection:bg-blue-600 selection:text-white p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-10 rounded-[2rem] shadow-xl max-w-md w-full border border-blue-100 mx-4 relative overflow-hidden"
      >
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full opacity-50" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-cyan-50 rounded-full opacity-50" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">一键生成提前学规划表</h1>
            <p className="text-sm text-gray-500 font-medium tracking-wide">用最底层的逻辑，拆解高阶的知识</p>
          </div>
          
          <form onSubmit={handleActivate} className="space-y-5">
            <div>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="请联系管理员Lmxd56领取激活码"
                className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-400 focus:bg-white outline-none transition-all text-center text-lg tracking-widest font-mono text-gray-800 placeholder:text-gray-400 placeholder:font-sans placeholder:tracking-normal placeholder:text-base"
                disabled={isLoading}
              />
              {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mt-3 text-center font-medium">
                  {error}
                </motion.p>
              )}
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all flex justify-center items-center disabled:opacity-70 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5"
            >
              {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "验证授权"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [learnedTopics, setLearnedTopics] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('learnedTopics');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('learnedTopics', JSON.stringify(learnedTopics));
  }, [learnedTopics]);

  const toggleTopic = (topicId: string) => {
    setLearnedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId]
    }));
  };

  const stats = useMemo(() => {
    let total = 0;
    let learned = 0;
    const unlearnedList: { part: string, chapter: string, topic: string, level: string, color: string }[] = [];

    catalogData.forEach(part => {
      part.chapters.forEach(chapter => {
        chapter.topics.forEach(topic => {
          total++;
          if (learnedTopics[topic.id]) {
            learned++;
          } else {
            unlearnedList.push({
              part: part.title,
              chapter: chapter.title,
              topic: topic.title,
              level: topic.level || '',
              color: part.bgColor
            });
          }
        });
      });
    });

    return { total, learned, remaining: total - learned, progress: total === 0 ? 0 : Math.round((learned / total) * 100), unlearnedList };
  }, [learnedTopics]);

  const downloadPlan = () => {
    let html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8" />
        <style>
          table { border-collapse: collapse; width: 100%; font-family: "Microsoft YaHei", sans-serif; }
          th, td { border: 1px solid #cbd5e1; padding: 12px; text-align: left; }
          th { background-color: #f8fafc; font-weight: bold; color: #334155; }
          .part1 { background-color: #FFE4E1; }
          .part2 { background-color: #E0FFFF; }
          .part3 { background-color: #F0FFF0; }
          .part4 { background-color: #FFFACD; }
        </style>
      </head>
      <body>
        <h2>宝贝专属学习计划表 (待学知识点)</h2>
        <table>
          <thead>
            <tr>
              <th>模块</th>
              <th>章节</th>
              <th>知识点</th>
              <th>建议年级</th>
              <th>学习时间</th>
              <th>家长评分</th>
            </tr>
          </thead>
          <tbody>
    `;

    stats.unlearnedList.forEach(item => {
      let colorClass = '';
      if (item.part.includes('第一部分')) colorClass = 'part1';
      else if (item.part.includes('第二部分')) colorClass = 'part2';
      else if (item.part.includes('第三部分')) colorClass = 'part3';
      else if (item.part.includes('第四部分')) colorClass = 'part4';

      html += `
        <tr class="${colorClass}">
          <td>${item.part}</td>
          <td>${item.chapter}</td>
          <td>${item.topic}</td>
          <td>${item.level}</td>
          <td></td>
          <td></td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    const blob = new Blob([html], { type: 'application/vnd.ms-excel' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = '宝贝学习计划表.xls';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-blue-50 font-sans pb-24">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-30 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
            <Star className="w-6 h-6 text-blue-500 fill-blue-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-800">宝贝学习计划</h1>
        </div>
        <button 
          onClick={() => {
            localStorage.removeItem('authToken');
            window.location.reload();
          }}
          className="text-sm text-gray-500 hover:text-gray-800 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          退出
        </button>
      </div>

      <div className="max-w-3xl mx-auto p-4 md:p-6 mt-4">
        {activeTab === 'dashboard' && <Dashboard stats={stats} />}
        {activeTab === 'catalog' && <Catalog learnedTopics={learnedTopics} toggleTopic={toggleTopic} />}
        {activeTab === 'plan' && <Plan unlearnedList={stats.unlearnedList} onDownload={downloadPlan} />}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3 flex justify-around items-center z-40 pb-safe">
        <NavButton 
          icon={<PieChart />} 
          label="进度看板" 
          isActive={activeTab === 'dashboard'} 
          onClick={() => setActiveTab('dashboard')} 
        />
        <NavButton 
          icon={<BookOpen />} 
          label="学习目录" 
          isActive={activeTab === 'catalog'} 
          onClick={() => setActiveTab('catalog')} 
        />
        <NavButton 
          icon={<Calendar />} 
          label="学习计划" 
          isActive={activeTab === 'plan'} 
          onClick={() => setActiveTab('plan')} 
        />
      </div>
    </div>
  );
}

function NavButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-1 p-2 rounded-2xl transition-all duration-300",
        isActive ? "text-blue-600 scale-110" : "text-gray-400 hover:text-gray-600"
      )}
    >
      <div className={cn("w-6 h-6", isActive && "drop-shadow-md")}>
        {icon}
      </div>
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

function Dashboard({ stats }: { stats: any }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-blue-100 relative overflow-hidden">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-blue-50 rounded-full opacity-50" />
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-gray-500 font-bold mb-2">总学习进度</h2>
          <div className="flex items-end gap-2 mb-6">
            <span className="text-6xl font-black text-blue-600">{stats.progress}</span>
            <span className="text-2xl font-bold text-blue-400 mb-1">%</span>
          </div>
          
          <div className="w-full bg-gray-100 rounded-full h-4 mb-8 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${stats.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full"
            />
          </div>

          <div className="grid grid-cols-3 w-full gap-4">
            <div className="bg-blue-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-blue-600">{stats.total}</div>
              <div className="text-xs text-gray-500 font-bold mt-1">总知识点</div>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-green-600">{stats.learned}</div>
              <div className="text-xs text-gray-500 font-bold mt-1">已掌握</div>
            </div>
            <div className="bg-orange-50 rounded-2xl p-4 text-center">
              <div className="text-2xl font-black text-orange-600">{stats.remaining}</div>
              <div className="text-xs text-gray-500 font-bold mt-1">待学习</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-blue-100 text-center">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-yellow-500" />
        </div>
        <h3 className="font-bold text-gray-800 text-lg mb-2">继续加油哦！</h3>
        <p className="text-gray-500 text-sm">每天进步一点点，知识的海洋任你遨游~</p>
      </div>
    </motion.div>
  );
}

function Catalog({ learnedTopics, toggleTopic }: { learnedTopics: Record<string, boolean>, toggleTopic: (id: string) => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-blue-100 mb-6">
        <p className="text-gray-600 text-sm font-medium flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          请在下方勾选宝贝已经掌握的知识点
        </p>
      </div>

      {catalogData.map((part) => (
        <PartView key={part.id} part={part} learnedTopics={learnedTopics} toggleTopic={toggleTopic} />
      ))}
    </motion.div>
  );
}

function PartView({ part, learnedTopics, toggleTopic }: { part: Part, learnedTopics: Record<string, boolean>, toggleTopic: (id: string) => void }) {
  const [isOpen, setIsOpen] = useState(true);

  // Calculate part progress
  let total = 0;
  let learned = 0;
  part.chapters.forEach(c => c.topics.forEach(t => {
    total++;
    if (learnedTopics[t.id]) learned++;
  }));

  return (
    <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden mb-6">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-5 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", part.colorClass.replace('text-', 'bg-').replace('600', '100').replace('500', '100'))}>
            <BookOpen className={cn("w-5 h-5", part.colorClass)} />
          </div>
          <div className="text-left">
            <h2 className="font-bold text-gray-800 text-lg">{part.title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">进度: {learned}/{total}</p>
          </div>
        </div>
        {isOpen ? <ChevronDown className="text-gray-400" /> : <ChevronRight className="text-gray-400" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {part.chapters.map(chapter => (
                <div key={chapter.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                  <h3 className="font-bold text-gray-700 mb-3 pl-2 border-l-4 border-blue-400">{chapter.title}</h3>
                  <div className="space-y-2">
                    {chapter.topics.map(topic => {
                      const isLearned = !!learnedTopics[topic.id];
                      return (
                        <button
                          key={topic.id}
                          onClick={() => toggleTopic(topic.id)}
                          className={cn(
                            "w-full flex items-center justify-between p-3 rounded-xl transition-all",
                            isLearned ? "bg-green-50 border border-green-200" : "bg-white border border-gray-200 hover:border-blue-300"
                          )}
                        >
                          <div className="flex items-center gap-3 text-left">
                            {isLearned ? (
                              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-gray-300 shrink-0" />
                            )}
                            <span className={cn(
                              "text-sm font-medium",
                              isLearned ? "text-green-700 line-through opacity-70" : "text-gray-700"
                            )}>
                              {topic.title}
                            </span>
                          </div>
                          {topic.level && (
                            <span className="text-[10px] px-2 py-1 bg-gray-100 text-gray-500 rounded-md shrink-0">
                              {topic.level}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Plan({ unlearnedList, onDownload }: { unlearnedList: any[], onDownload: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-blue-100 text-center relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-50 rounded-full opacity-50" />
        <div className="relative z-10">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">专属学习计划</h2>
          <p className="text-gray-500 text-sm mb-6">系统已根据未掌握的知识点，为您生成了专属计划表</p>
          
          <button 
            onClick={onDownload}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5"
          >
            <Download className="w-5 h-5" />
            下载完整计划表 (Excel)
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-gray-700 px-2 flex items-center gap-2">
          <span className="w-1.5 h-4 bg-blue-400 rounded-full"></span>
          待学清单预览
        </h3>
        
        {unlearnedList.length === 0 ? (
          <div className="bg-white rounded-[2rem] p-8 text-center border border-blue-50">
            <div className="text-4xl mb-4">🌟</div>
            <p className="text-gray-500 font-bold">太棒啦！所有知识点都学完了！</p>
          </div>
        ) : (
          <div className="bg-white rounded-[2rem] shadow-sm border border-blue-50 overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto p-3 space-y-3">
              {unlearnedList.map((item, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col gap-2">
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg">{item.part.split(' ')[0]}</span>
                    <span>{item.chapter}</span>
                  </div>
                  <div className="text-base font-bold text-gray-800 pl-1">
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
