
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Plus, 
  Navigation,
  User,
  FileText
} from 'lucide-react';
import { Lead, VisitPlan } from '@/types/crm';

interface VisitPlannerProps {
  lead: Lead | null;
}

const VisitPlanner = ({ lead }: VisitPlannerProps) => {
  const [showNewVisit, setShowNewVisit] = useState(false);
  const [newVisit, setNewVisit] = useState({
    planned_date: '',
    objective: '',
    notes: '',
    duration_minutes: 60
  });

  const mockVisits: VisitPlan[] = [
    {
      id: '1',
      lead_id: lead?.cnpj || '',
      planned_date: '2024-01-25T14:00:00Z',
      address: `${lead?.logradouro}, ${lead?.numero} - ${lead?.bairro}, ${lead?.municipio} - ${lead?.estado}`,
      objective: 'Apresentação inicial da solução e levantamento de necessidades',
      status: 'planned',
      duration_minutes: 90,
      notes: 'Levar material de apresentação e cases de sucesso do setor'
    },
    {
      id: '2',
      lead_id: lead?.cnpj || '',
      planned_date: '2024-01-30T10:00:00Z',
      address: `${lead?.logradouro}, ${lead?.numero} - ${lead?.bairro}, ${lead?.municipio} - ${lead?.estado}`,
      objective: 'Apresentação da proposta comercial personalizada',
      status: 'confirmed',
      duration_minutes: 60,
      notes: 'Reunião confirmada com decisor. Levar contrato para assinatura.'
    }
  ];

  if (!lead) {
    return (
      <Card className="border-2 border-slate-200">
        <CardContent className="p-8 text-center">
          <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Converta a empresa para lead para planejar visitas presenciais</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'planned': return 'Planejada';
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Realizada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const handleAddVisit = () => {
    console.log('Nova visita:', newVisit);
    setNewVisit({
      planned_date: '',
      objective: '',
      notes: '',
      duration_minutes: 60
    });
    setShowNewVisit(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-orange-800">
            <MapPin className="h-5 w-5" />
            Planejamento de Visitas
          </CardTitle>
          <Button 
            onClick={() => setShowNewVisit(!showNewVisit)}
            size="sm"
            className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova Visita
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Informações do Endereço */}
          <Card className="border border-orange-300 bg-white">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Navigation className="h-5 w-5 text-orange-600 mt-1" />
                <div className="flex-1">
                  <h4 className="font-medium text-slate-800 mb-1">Endereço da Empresa</h4>
                  <p className="text-sm text-slate-600">
                    {lead.logradouro}, {lead.numero}
                    {lead.complemento && ` - ${lead.complemento}`}
                  </p>
                  <p className="text-sm text-slate-600">
                    {lead.bairro} - {lead.municipio}, {lead.estado}
                  </p>
                  <p className="text-sm text-slate-600">CEP: {lead.cep}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(lead.maps, '_blank')}
                  className="border-orange-300 text-orange-700 hover:bg-orange-50"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Ver Rota
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Nova Visita */}
          {showNewVisit && (
            <Card className="border-2 border-orange-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-orange-800">Agendar Nova Visita</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      Data e Hora
                    </label>
                    <Input 
                      type="datetime-local"
                      value={newVisit.planned_date}
                      onChange={(e) => setNewVisit({...newVisit, planned_date: e.target.value})}
                      className="border-orange-300"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-700 mb-1 block">
                      Duração (minutos)
                    </label>
                    <Input 
                      type="number"
                      value={newVisit.duration_minutes}
                      onChange={(e) => setNewVisit({...newVisit, duration_minutes: parseInt(e.target.value)})}
                      className="border-orange-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Objetivo da Visita
                  </label>
                  <Input 
                    placeholder="Ex: Apresentação da solução, levantamento de necessidades..."
                    value={newVisit.objective}
                    onChange={(e) => setNewVisit({...newVisit, objective: e.target.value})}
                    className="border-orange-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Observações
                  </label>
                  <Textarea 
                    placeholder="Anotações importantes, materiais necessários, contatos..."
                    value={newVisit.notes}
                    onChange={(e) => setNewVisit({...newVisit, notes: e.target.value})}
                    className="border-orange-300"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddVisit}>
                    <Calendar className="h-4 w-4 mr-1" />
                    Agendar Visita
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewVisit(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Visitas */}
          <div className="space-y-3">
            {mockVisits.map((visit) => (
              <Card key={visit.id} className="border border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange-600" />
                      <div>
                        <h4 className="font-medium text-slate-800">
                          {new Date(visit.planned_date).toLocaleDateString('pt-BR')}
                        </h4>
                        <p className="text-sm text-slate-600">
                          {new Date(visit.planned_date).toLocaleTimeString('pt-BR', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })} • {visit.duration_minutes} min
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(visit.status)} font-medium`}>
                      {getStatusLabel(visit.status)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-slate-600">Objetivo:</label>
                      <p className="text-sm text-slate-800">{visit.objective}</p>
                    </div>
                    
                    {visit.notes && (
                      <div>
                        <label className="text-xs font-medium text-slate-600">Observações:</label>
                        <p className="text-sm text-slate-700">{visit.notes}</p>
                      </div>
                    )}
                    
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="border-orange-300 text-orange-700">
                        <FileText className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="border-orange-300 text-orange-700">
                        <MapPin className="h-4 w-4 mr-1" />
                        Navegação
                      </Button>
                      {visit.status === 'planned' && (
                        <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                          <Clock className="h-4 w-4 mr-1" />
                          Confirmar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VisitPlanner;
