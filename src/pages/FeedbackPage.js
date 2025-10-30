import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star } from 'lucide-react';
import { toast } from 'sonner';

export const FeedbackPage = () => {
  const { projects, feedback, feedbackStats, addFeedback, language } = useApp();
  const t = useTranslation(language);
  
  const [selectedProject, setSelectedProject] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [suggestions, setSuggestions] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedProject || rating === 0) {
      toast.error('Por favor, selecione um projeto e dê uma avaliação');
      return;
    }
    
    const project = projects.find(p => p.id === selectedProject);
    
    addFeedback({
      projectId: selectedProject,
      projectName: project.name,
      name: 'Usuário Demo',
      rating,
      comment,
      suggestions,
    });
    
    // Reset form
    setSelectedProject('');
    setRating(0);
    setComment('');
    setSuggestions('');
    
    toast.success('Feedback enviado com sucesso!');
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('feedback')}</h1>
        <p className="text-muted-foreground mt-1">Compartilhe sua experiência conosco</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feedback Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t('submitFeedback')}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Project Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('selectProject')}</label>
                  <Select value={selectedProject} onValueChange={setSelectedProject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um projeto" />
                    </SelectTrigger>
                    <SelectContent>
                      {projects.slice(0, 20).map(project => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.flag} {project.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('rating')}</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            star <= (hoverRating || rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-muted-foreground'
                          } transition-colors`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="ml-3 text-sm text-muted-foreground self-center">
                        {rating} {rating === 1 ? 'estrela' : 'estrelas'}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Comment */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('comment')}</label>
                  <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Compartilhe sua experiência com este projeto..."
                    rows={4}
                    required
                  />
                </div>
                
                {/* Suggestions */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">{t('suggestions')} (opcional)</label>
                  <Textarea
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    placeholder="Tem alguma sugestão de melhoria?"
                    rows={3}
                  />
                </div>
                
                <Button type="submit" className="w-full">
                  {t('submit')}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        
        {/* Stats Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('averageRating')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{feedbackStats.averageRating}</div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(feedbackStats.averageRating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Baseado em {feedbackStats.totalReviews} {t('reviews')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>{t('recentFeedback')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {feedback.slice(0, 10).map((item) => (
              <div key={item.id} className="border-b border-border pb-6 last:border-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">{item.projectName}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= item.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-muted-foreground'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm mb-2">{item.comment}</p>
                {item.suggestions && (
                  <p className="text-sm text-muted-foreground italic">Sugestão: {item.suggestions}</p>
                )}
                <p className="text-xs text-muted-foreground mt-2">
                  {new Date(item.date).toLocaleDateString('pt-BR')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};