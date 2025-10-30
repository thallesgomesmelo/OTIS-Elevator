import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/translations';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { projectStatuses, projects as allProjects } from '@/lib/mockData';
import { MapPin, ArrowRight } from 'lucide-react';

export const MapPage = () => {
  const navigate = useNavigate();
  const { language } = useApp();
  const t = useTranslation(language);
  const [selectedProject, setSelectedProject] = useState(null);
  
  // Use first 15 projects for map markers
  const mapProjects = allProjects.slice(0, 15);
  
  const getStatusColor = (status) => {
    const statusConfig = projectStatuses.find(s => s.id === status);
    return statusConfig?.color || 'bg-gray-500';
  };
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('map')}</h1>
        <p className="text-muted-foreground mt-1">Localização dos projetos na América Latina</p>
      </div>
      
      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Area */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* SVG Map Representation */}
              <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 h-[600px] overflow-hidden">
                {/* South America Outline */}
                <svg
                  viewBox="0 0 800 800"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Simplified South America path */}
                  <path
                    d="M300,100 L320,80 L360,90 L380,110 L400,150 L420,200 L440,250 L450,300 L460,350 L470,400 L480,450 L485,500 L480,550 L470,600 L450,650 L420,680 L380,700 L340,710 L300,700 L260,680 L230,650 L210,600 L200,550 L195,500 L200,450 L210,400 L220,350 L240,300 L260,250 L280,200 L290,150 L295,120 Z"
                    fill="hsl(var(--muted))"
                    stroke="hsl(var(--border))"
                    strokeWidth="2"
                    opacity="0.3"
                  />
                </svg>
                
                {/* Project Markers */}
                <div className="absolute inset-0">
                  {mapProjects.map((project, index) => {
                    // Distribute markers across the map
                    const positions = [
                      { top: '15%', left: '55%' }, // Mexico
                      { top: '30%', left: '40%' }, // Colombia
                      { top: '35%', left: '43%' }, // Colombia 2
                      { top: '50%', left: '52%' }, // Brazil
                      { top: '55%', left: '48%' }, // Brazil 2
                      { top: '58%', left: '55%' }, // Brazil 3
                      { top: '62%', left: '50%' }, // Brazil 4
                      { top: '70%', left: '30%' }, // Chile
                      { top: '75%', left: '28%' }, // Chile 2
                      { top: '80%', left: '32%' }, // Argentina
                      { top: '85%', left: '35%' }, // Argentina 2
                      { top: '25%', left: '38%' }, // Colombia 3
                      { top: '60%', left: '58%' }, // Brazil 5
                      { top: '78%', left: '30%' }, // Chile 3
                      { top: '82%', left: '37%' }, // Argentina 3
                    ];
                    
                    const position = positions[index % positions.length];
                    const statusColor = getStatusColor(project.status);
                    
                    return (
                      <div
                        key={project.id}
                        className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125"
                        style={position}
                        onClick={() => setSelectedProject(project)}
                      >
                        <div className="relative group">
                          <MapPin
                            className={`w-8 h-8 ${statusColor.replace('bg-', 'text-')} drop-shadow-lg`}
                            fill="currentColor"
                          />
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-card border border-border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs z-10">
                            {project.name}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Project Details Sidebar */}
        <div className="space-y-4">
          {selectedProject ? (
            <Card className="animate-fadeIn">
              <CardContent className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{selectedProject.flag}</span>
                    <h3 className="font-bold text-lg line-clamp-2">{selectedProject.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedProject.id}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status:</span>
                    <Badge className={`${getStatusColor(selectedProject.status)} text-white`}>
                      {t(selectedProject.status)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{t('progress')}:</span>
                    <span className="font-medium">{selectedProject.progress}%</span>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${selectedProject.progress}%` }}
                    ></div>
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground mb-1">{t('manager')}:</p>
                    <p className="font-medium">{selectedProject.manager}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Localização:</p>
                    <p className="font-medium">{selectedProject.city}, {selectedProject.countryName}</p>
                  </div>
                </div>
                
                <Button
                  className="w-full group"
                  onClick={() => navigate(`/projects/${selectedProject.id}`)}
                >
                  {t('viewDetails')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Clique em um marcador no mapa para ver os detalhes do projeto
                </p>
              </CardContent>
            </Card>
          )}
          
          {/* Legend */}
          <Card>
            <CardContent className="p-6">
              <h4 className="font-semibold mb-3">Legenda</h4>
              <div className="space-y-2">
                {projectStatuses.map(status => (
                  <div key={status.id} className="flex items-center gap-2">
                    <MapPin className={`w-5 h-5 ${status.color.replace('bg-', 'text-')}`} fill="currentColor" />
                    <span className="text-sm">{t(status.id)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};