import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, language } = useApp();
  const t = useTranslation(language);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
    navigate('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-md p-8 space-y-8 animate-fadeIn">
        {/* Logo */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <svg viewBox="0 0 24 24" fill="none" className="w-10 h-10 text-primary-foreground">
              <path d="M12 2L2 7v10c0 5.523 4.477 10 10 10s10-4.477 10-10V7L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 11v6M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-foreground">Elevatos Manager</h1>
          <p className="text-muted-foreground mt-2">{t('loginSubtitle')}</p>
        </div>
        
        {/* Login Form */}
        <div className="bg-card rounded-2xl shadow-xl border border-border p-8">
          <h2 className="text-2xl font-semibold mb-6 text-foreground">{t('welcomeBack')}</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">{t('email')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-11 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                {t('forgotPassword')}
              </a>
            </div>
            
            <Button type="submit" className="w-full h-11" size="lg">
              {t('login')}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            {t('dontHaveAccount')}{' '}
            <a href="#" className="text-primary hover:text-primary/80 font-medium transition-colors">
              {t('signUp')}
            </a>
          </div>
        </div>
        
        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          © 2024 Elevatos Manager. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};