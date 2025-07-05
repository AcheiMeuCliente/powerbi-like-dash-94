
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Clock, 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  FileText, 
  Plus,
  User,
  Calendar
} from 'lucide-react';
import { Lead, LeadActivity } from '@/types/crm';

interface LeadTimelineProps {
  lead: Lead | null;
}

const activityIcons = {
  note: FileText,
  call: Phone,
  email: Mail,
  whatsapp: MessageCircle,
  visit: MapPin,
  status_change: User
};

const activityColors = {
  note: 'bg-blue-100 text-blue-700 border-blue-300',
  call: 'bg-green-100 text-green-700 border-green-300',
  email: 'bg-purple-100 text-purple-700 border-purple-300',
  whatsapp: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  visit: 'bg-orange-100 text-orange-700 border-orange-300',
  status_change: 'bg-indigo-100 text-indigo-700 border-indigo-300'
};

const LeadTimeline = ({ lead }: LeadTimelineProps) => {
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [newActivity, setNewActivity] = useState({
    type: 'note' as keyof typeof activityIcons,
    title: '',
    description: ''
  });

  const mockActivities: LeadActivity[] = [
    {
      id: '1',
      lead_id: lead?.cnpj || '',
      type: 'status_change',
      title: 'Lead convertido',
      description: 'Empresa convertida para lead ativo',
      created_at: '2024-01-15T10:30:00Z',
      created_by: 'João Silva'
    },
    {
      id: '2',
      lead_id: lead?.cnpj || '',
      type: 'call',
      title: 'Primeira ligação realizada',
      description: 'Conversei com o responsável comercial. Demonstrou interesse no produto.',
      created_at: '2024-01-16T14:15:00Z',
      created_by: 'João Silva'
    },
    {
      id: '3',
      lead_id: lead?.cnpj || '',
      type: 'email',
      title: 'Proposta enviada por email',
      description: 'Enviada proposta comercial detalhada conforme necessidades identificadas.',
      created_at: '2024-01-18T09:45:00Z',
      created_by: 'Maria Santos'
    },
    {
      id: '4',
      lead_id: lead?.cnpj || '',
      type: 'whatsapp',
      title: 'Follow-up via WhatsApp',
      description: 'Mensagem de acompanhamento sobre a proposta enviada.',
      created_at: '2024-01-20T16:20:00Z',
      created_by: 'João Silva'
    }
  ];

  if (!lead) {
    return (
      <Card className="border-2 border-slate-200">
        <CardContent className="p-8 text-center">
          <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Converta a empresa para lead para visualizar o timeline de atividades</p>
        </CardContent>
      </Card>
    );
  }

  const handleAddActivity = () => {
    // Simular adição de atividade
    console.log('Nova atividade:', newActivity);
    setNewActivity({ type: 'note', title: '', description: '' });
    setShowAddActivity(false);
  };

  return (
    <div className="space-y-4">
      <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
            <Clock className="h-5 w-5" />
            Timeline de Atividades
          </CardTitle>
          <Button 
            onClick={() => setShowAddActivity(!showAddActivity)}
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova Atividade
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {showAddActivity && (
            <Card className="border border-blue-300 bg-white">
              <CardContent className="p-4 space-y-3">
                <div className="flex gap-2">
                  <select 
                    value={newActivity.type}
                    onChange={(e) => setNewActivity({...newActivity, type: e.target.value as keyof typeof activityIcons})}
                    className="px-3 py-2 border border-blue-300 rounded-md text-sm"
                  >
                    <option value="note">Nota</option>
                    <option value="call">Ligação</option>
                    <option value="email">Email</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="visit">Visita</option>
                  </select>
                  <Input 
                    placeholder="Título da atividade"
                    value={newActivity.title}
                    onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                    className="flex-1 border-blue-300"
                  />
                </div>
                <Textarea 
                  placeholder="Descrição detalhada da atividade..."
                  value={newActivity.description}
                  onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  className="border-blue-300"
                  rows={3}
                />
                <div className="flex gap-2">
                  <Button onClick={handleAddActivity} size="sm">
                    Adicionar
                  </Button>
                  <Button 
                    onClick={() => setShowAddActivity(false)} 
                    variant="outline" 
                    size="sm"
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-300 to-indigo-300"></div>
            <div className="space-y-4">
              {mockActivities.map((activity, index) => {
                const IconComponent = activityIcons[activity.type];
                const colorClass = activityColors[activity.type];
                
                return (
                  <div key={activity.id} className="relative flex gap-4">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 ${colorClass} flex items-center justify-center bg-white shadow-sm`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 pb-4">
                      <Card className="border border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-medium text-slate-800">{activity.title}</h4>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline" className={`text-xs ${colorClass}`}>
                                  {activity.type === 'note' && 'Nota'}
                                  {activity.type === 'call' && 'Ligação'}
                                  {activity.type === 'email' && 'Email'}
                                  {activity.type === 'whatsapp' && 'WhatsApp'}
                                  {activity.type === 'visit' && 'Visita'}
                                  {activity.type === 'status_change' && 'Status'}
                                </Badge>
                                <span className="text-xs text-slate-500">
                                  por {activity.created_by}
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-slate-500">
                                {new Date(activity.created_at).toLocaleDateString('pt-BR')}
                              </div>
                              <div className="text-xs text-slate-400">
                                {new Date(activity.created_at).toLocaleTimeString('pt-BR', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                              </div>
                            </div>
                          </div>
                          {activity.description && (
                            <p className="text-sm text-slate-600 mt-2">{activity.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadTimeline;
