import React from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { monthlyData, countryStats, projectStatuses } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Users, Briefcase, Star } from 'lucide-react';

export const ReportsPage = () => {
  const { projects, language } = useApp();
  const t = useTranslation(language);
  
  const totalProjects = projects.length;
  const totalRevenue = countryStats.reduce((sum, c) => sum + c.revenue, 0);
  const previousRevenue = totalRevenue * 0.85;
  const growthPercent = ((totalRevenue - previousRevenue) / previousRevenue * 100).toFixed(1);
  const activeClients = 87;
  
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };
  
  const kpiCards = [
    {
      title: t('totalProjects'),
      value: totalProjects,
      icon: Briefcase,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    },
    {
      title: t('revenue'),
      value: formatCurrency(totalRevenue),
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30',
    },
    {
      title: t('growth'),
      value: `+${growthPercent}%`,
      icon: TrendingUp,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-50 dark:bg-purple-950/30',
    },
    {
      title: t('activeClients'),
      value: activeClients,
      icon: Users,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30',
    },
  ];
  
  const chartData = monthlyData.map(item => ({
    month: item.month,
    [t('projects')]: item.projects,
    [t('revenue')]: item.revenue / 1000000,
  }));
  
  const projectsByStatus = projectStatuses.map(status => ({
    name: t(status.id),
    count: projects.filter(p => p.status === status.id).length,
  }));
  
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('reports')} & {t('analytics')}</h1>
        <p className="text-muted-foreground mt-1">Visão completa do desempenho</p>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          return (
            <Card key={index} className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                    <p className="text-2xl font-bold mt-2">{kpi.value}</p>
                  </div>
                  <div className={`${kpi.bgColor} ${kpi.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {/* Large Combined Chart */}
      <Card>
        <CardHeader>
          <CardTitle>{t('projects')} & {t('monthlyRevenue')} (M)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
              <YAxis yAxisId="left" className="text-xs" />
              <YAxis yAxisId="right" orientation="right" className="text-xs" />
              <Tooltip
                contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey={t('projects')} fill="hsl(var(--primary))" />
              <Bar yAxisId="right" dataKey={t('revenue')} fill="hsl(var(--secondary))" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      {/* Country KPI Table */}
      <Card>
        <CardHeader>
          <CardTitle>{t('kpiBreakdown')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('country')}</TableHead>
                <TableHead className="text-right">{t('projects')}</TableHead>
                <TableHead className="text-right">{t('revenue')}</TableHead>
                <TableHead className="text-right">{t('satisfaction')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countryStats.map((country) => (
                <TableRow key={country.country}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{country.flag}</span>
                      <span>{country.country}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">{country.projects}</TableCell>
                  <TableCell className="text-right">{formatCurrency(country.revenue)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{country.satisfaction}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {/* Projects by Status */}
      <Card>
        <CardHeader>
          <CardTitle>{t('projectsByStatus')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {projectsByStatus.map((item, index) => {
              const percentage = (item.count / totalProjects * 100).toFixed(1);
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="text-sm text-muted-foreground">{item.count} ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};