import React, { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { useTranslation } from '@/lib/translations';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Briefcase, Building2, Shield, Star, Edit, Lock, Bell } from 'lucide-react';
import { toast } from 'sonner';

export const ProfilePage = () => {
  const { user, updateUser, language } = useApp();
  const t = useTranslation(language);
  
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [notificationsDialogOpen, setNotificationsDialogOpen] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    department: user.department,
  });
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateUser(editForm);
    setEditDialogOpen(false);
    toast.success('Perfil atualizado com sucesso!');
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordDialogOpen(false);
    toast.success('Senha alterada com sucesso!');
  };
  
  const handleNotificationsSubmit = (e) => {
    e.preventDefault();
    setNotificationsDialogOpen(false);
    toast.success('Preferências de notificação atualizadas!');
  };
  
  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">{t('myProfile')}</h1>
        <p className="text-muted-foreground mt-1">Gerencie suas informações pessoais</p>
      </div>
      
      {/* Profile Card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* Avatar */}
            <Avatar className="w-24 h-24">
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {user.avatar}
              </AvatarFallback>
            </Avatar>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.role}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                  <span>{user.department}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm justify-center sm:justify-start">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span>{user.permissions}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Briefcase className="w-8 h-8 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-muted-foreground">{t('projectsManaged')}</p>
              <p className="text-3xl font-bold mt-1">{user.stats.totalProjects}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <svg className="w-8 h-8 mx-auto mb-2 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm text-muted-foreground">{t('projectsConcluded')}</p>
              <p className="text-3xl font-bold mt-1">{user.stats.concluded}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500 fill-yellow-500" />
              <p className="text-sm text-muted-foreground">{t('myRating')}</p>
              <p className="text-3xl font-bold mt-1">{user.stats.rating}</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setEditDialogOpen(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {t('editProfile')}
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setPasswordDialogOpen(true)}
          >
            <Lock className="w-4 h-4 mr-2" />
            {t('changePassword')}
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setNotificationsDialogOpen(true)}
          >
            <Bell className="w-4 h-4 mr-2" />
            {t('notifications')}
          </Button>
        </CardContent>
      </Card>
      
      {/* Edit Profile Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('editProfile')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Cargo</Label>
              <Input
                id="role"
                value={editForm.role}
                onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="department">Departamento</Label>
              <Input
                id="department"
                value={editForm.department}
                onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit">{t('save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('changePassword')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit">{t('save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Notifications Dialog */}
      <Dialog open={notificationsDialogOpen} onOpenChange={setNotificationsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('notifications')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleNotificationsSubmit} className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="email-notif" className="text-sm font-medium">Notificações por Email</label>
                <input id="email-notif" type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="project-notif" className="text-sm font-medium">Atualizações de Projeto</label>
                <input id="project-notif" type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <label htmlFor="feedback-notif" className="text-sm font-medium">Novos Feedbacks</label>
                <input id="feedback-notif" type="checkbox" className="w-4 h-4" defaultChecked />
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setNotificationsDialogOpen(false)}>
                {t('cancel')}
              </Button>
              <Button type="submit">{t('save')}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};