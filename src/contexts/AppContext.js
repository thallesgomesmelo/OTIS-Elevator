import React, { createContext, useContext, useState, useEffect } from 'react';
import { projects as initialProjects, feedbackData as initialFeedback, initialFeedbackStats, currentUser } from '@/lib/mockData';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Load from localStorage or use initial data
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'pt';
  });
  
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('projects');
    return saved ? JSON.parse(saved) : initialProjects;
  });
  
  const [feedback, setFeedback] = useState(() => {
    const saved = localStorage.getItem('feedback');
    return saved ? JSON.parse(saved) : initialFeedback;
  });
  
  const [feedbackStats, setFeedbackStats] = useState(() => {
    const saved = localStorage.getItem('feedbackStats');
    return saved ? JSON.parse(saved) : initialFeedbackStats;
  });
  
  const [user, setUser] = useState(currentUser);
  
  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);
  
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);
  
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);
  
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);
  
  useEffect(() => {
    localStorage.setItem('feedbackStats', JSON.stringify(feedbackStats));
  }, [feedbackStats]);
  
  // Actions
  const login = () => {
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    setIsAuthenticated(false);
  };
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };
  
  const updateProject = (projectId, updates) => {
    setProjects(prev => prev.map(p => p.id === projectId ? { ...p, ...updates } : p));
  };
  
  const updateProjectStage = (projectId, stageId, progress) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return {
          ...p,
          stages: {
            ...p.stages,
            [stageId]: {
              ...p.stages[stageId],
              complete: progress,
            },
          },
        };
      }
      return p;
    }));
  };
  
  const addFeedback = (newFeedback) => {
    const feedbackWithId = {
      ...newFeedback,
      id: feedback.length + 1,
      date: new Date().toISOString().split('T')[0],
    };
    
    setFeedback(prev => [feedbackWithId, ...prev]);
    
    // Update average rating
    const newTotalReviews = feedbackStats.totalReviews + 1;
    const newAverage = ((feedbackStats.averageRating * feedbackStats.totalReviews) + newFeedback.rating) / newTotalReviews;
    
    setFeedbackStats({
      totalReviews: newTotalReviews,
      averageRating: Math.round(newAverage * 10) / 10,
    });
  };
  
  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };
  
  const value = {
    isAuthenticated,
    language,
    theme,
    projects,
    feedback,
    feedbackStats,
    user,
    login,
    logout,
    toggleTheme,
    changeLanguage,
    updateProject,
    updateProjectStage,
    addFeedback,
    updateUser,
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};