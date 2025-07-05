
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  User, 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Star,
  Target,
  Clock,
  TrendingUp,
  Users,
  FileText,
  Settings
} from 'lucide-react';
import { Empresa } from '@/types/empresa';
import { Lead } from '@/types/crm';
import LeadStatusManager from './LeadStatusManager';
import LeadTimeline from './LeadTimeline';
import LeadNotes from './LeadNotes';
import ProspectionStrategy from './ProspectionStrategy';
import VisitPlanner from './VisitPlanner';
import WhatsAppCampaign from './WhatsAppCampaign';

interface LeadCRMDialogProps {
  empresa: Empresa | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConvertToLead?: (empresa: Empresa) => void;
}

const LeadCRMDialog = ({ empresa, open, onOpenChange, onConvertToLead }: LeadCRMDialogProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLead, setIsLead] = useState(false);

  if (!empresa) return null;

  // Simular conversão para lead
  const mockLead: Lead = {
    ...empresa,
    crm_status: 'novo',
    score: 75,
    tags: ['Potencial Alto', 'Tecnologia'],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    next_action: 'Primeira ligação',
    next_action_date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
  };

  const handleConvertToLead = () => {
    setIsLead(true);
    onConvertToLead?.(empresa);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
        <DialogHeader className="border-b border-blue-200 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  CRM - {empresa.nome_fantasia || empresa.razao_social}
                </DialogTitle>
                <p className="text-sm text-slate-600">Gestão completa de leads e prospecção</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isLead && (
                <Badge className={`px-3 py-1 font-semibold ${getScoreColor(mockLead.score)}`}>
                  Score: {mockLead.score}
                </Badge>
              )}
              {!isLead ? (
                <Button 
                  onClick={handleConvertToLead}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Converter para Lead
                </Button>
              ) : (
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300">
                  Lead Ativo
                </Badge>
              )}
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid grid-cols-6 bg-gradient-to-r from-blue-100 to-indigo-100 border border-blue-200">
              <TabsTrigger value="overview" className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-700">
                <User className="h-4 w-4" />
                Visão Geral
              </TabsTrigger>
              <TabsTrigger value="timeline" className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-700">
                <Clock className="h-4 w-4" />
                Timeline
              </TabsTrigger>
              <TabsTrigger value="prospection" className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-700">
                <TrendingUp className="h-4 w-4" />
                Prospecção
              </TabsTrigger>
              <TabsTrigger value="visits" className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-700">
                <MapPin className="h-4 w-4" />
                Visitas
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-700">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </TabsTrigger>
              <TabsTrigger value="notes" className="flex items-center gap-1 data-[state=active]:bg-white data-[state=active]:text-blue-700">
                <FileText className="h-4 w-4" />
                Anotações
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto p-4">
              <TabsContent value="overview" className="space-y-6 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-blue-700">Status do Lead</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLead ? (
                        <LeadStatusManager lead={mockLead} />
                      ) : (
                        <p className="text-slate-600">Converta para lead para gerenciar status</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-green-700">Próxima Ação</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLead ? (
                        <div className="space-y-2">
                          <p className="font-medium text-slate-800">{mockLead.next_action}</p>
                          <p className="text-sm text-slate-600">
                            {new Date(mockLead.next_action_date!).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-600">Nenhuma ação agendada</p>
                      )}
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-purple-700">Tags</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLead ? (
                        <div className="flex flex-wrap gap-1">
                          {mockLead.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-slate-600">Nenhuma tag definida</p>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Informações da empresa condensadas */}
                <Card className="border-2 border-slate-200 bg-white">
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-800">Informações da Empresa</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-xs font-medium text-slate-600">CNPJ</label>
                      <p className="font-mono text-sm">{empresa.cnpj}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600">Porte</label>
                      <p className="text-sm">{empresa.porte}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600">Município</label>
                      <p className="text-sm">{empresa.municipio} - {empresa.estado}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-slate-600">Situação</label>
                      <Badge className="text-xs">{empresa.situacao}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="mt-0">
                <LeadTimeline lead={isLead ? mockLead : null} />
              </TabsContent>

              <TabsContent value="prospection" className="mt-0">
                <ProspectionStrategy lead={isLead ? mockLead : null} />
              </TabsContent>

              <TabsContent value="visits" className="mt-0">
                <VisitPlanner lead={isLead ? mockLead : null} />
              </TabsContent>

              <TabsContent value="whatsapp" className="mt-0">
                <WhatsAppCampaign lead={isLead ? mockLead : null} />
              </TabsContent>

              <TabsContent value="notes" className="mt-0">
                <LeadNotes lead={isLead ? mockLead : null} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="border-t border-blue-200 pt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          {isLead && (
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <Settings className="h-4 w-4 mr-2" />
              Configurações Avançadas
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCRMDialog;
