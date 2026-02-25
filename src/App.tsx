import React, { useState, useEffect } from 'react';
import { Loader2, Lock, Unlock, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

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
        <Loader2 className="w-8 h-8 animate-spin text-[#006241]" />
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
    <div className="min-h-screen flex items-center justify-center bg-[#F5F5F7] font-sans selection:bg-[#006241] selection:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-10 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md w-full border border-gray-100 mx-4"
      >
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-[#006241]/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-[#006241]" />
          </div>
        </div>
        
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">提前学-独有最高自学系统</h1>
          <p className="text-sm text-gray-500 font-medium tracking-wide">用最底层的逻辑，拆解高阶的知识</p>
        </div>
        
        <form onSubmit={handleActivate} className="space-y-5">
          <div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="请输入专属授权码解锁"
              className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#006241] focus:ring-2 focus:ring-[#006241]/20 focus:bg-white outline-none transition-all text-center text-lg tracking-widest font-mono text-gray-800 placeholder:text-gray-400 placeholder:font-sans placeholder:tracking-normal placeholder:text-base"
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
            className="w-full bg-[#006241] hover:bg-[#004d34] text-white font-medium py-4 rounded-xl transition-colors flex justify-center items-center disabled:opacity-70 shadow-lg shadow-[#006241]/20"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "验证授权"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

function MainApp() {
  return (
    <div className="min-h-screen bg-[#F5F5F7] p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#006241] rounded-xl flex items-center justify-center shadow-md shadow-[#006241]/20 shrink-0">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">提前学-独有最高自学系统</h1>
              <p className="text-sm text-gray-500">已授权，欢迎进入高阶知识库</p>
            </div>
          </div>
          <button 
            onClick={() => {
              localStorage.removeItem('authToken');
              window.location.reload();
            }}
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100 shrink-0 self-start md:self-auto"
          >
            退出登录
          </button>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
              <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#006241]/10 transition-colors">
                <Unlock className="w-5 h-5 text-gray-400 group-hover:text-[#006241] transition-colors" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">高阶模块 {i}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">底层逻辑拆解与深度推演，掌握核心原理...</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
