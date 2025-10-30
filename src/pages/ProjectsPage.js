import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { countries, projectStatuses } from '@/lib/mockData';
import { ArrowRight } from 'lucide-react';

export const ProjectsPage = () => {
  const navigate = useNavigate();
  const { projects, language } = useApp();
  const t = useTranslation(language);
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  
  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesCountry = countryFilter === 'all' || project.country === countryFilter;
      return matchesStatus && matchesCountry;
    });
  }, [projects, statusFilter, countryFilter]);
  
  const getStatusBadge = (status) => {
    const statusConfig = projectStatuses.find(s => s.id === status);
    return statusConfig;
  };
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">{t('allProjects')}</h1>
          <p className="text-muted-foreground mt-1">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'projeto' : 'projetos'}
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('filterByStatus')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              {projectStatuses.map(status => (
                <SelectItem key={status.id} value={status.id}>
                  {t(status.id)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t('filterByCountry')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              {countries.map(country => (
                <SelectItem key={country.code} value={country.code}>
                  {country.flag} {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => {
          const statusConfig = getStatusBadge(project.status);
          return (
            <Card key={project.id} className="card-hover cursor-pointer" onClick={() => navigate(`/projects/${project.id}`)}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg line-clamp-1">{project.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-2xl">{project.flag}</span>
                      <span className="text-sm text-muted-foreground">{project.countryName}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <Badge className={`${statusConfig.color} text-white`}>
                    {t(project.status)}
                  </Badge>
                  <span className="text-sm font-medium">{project.progress}%</span>
                </div>
                
                {/* Progress Bar */}
                <Progress value={project.progress} className="h-2" />
                
                {/* Project Details */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('budget')}:</span>
                    <span className="font-medium">{formatCurrency(project.budget)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('manager')}:</span>
                    <span className="font-medium line-clamp-1">{project.manager}</span>
                  </div>
                </div>
                
                {/* View Details Button */}
                <Button
                  variant="outline"
                  className="w-full mt-4 group"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/projects/${project.id}`);
                  }}
                >
                  {t('viewDetails')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredProjects.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground text-center">
              Nenhum projeto encontrado com os filtros selecionados.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};