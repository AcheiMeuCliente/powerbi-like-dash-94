
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  MessageCircle, 
  Send, 
  Plus, 
  Phone,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Lead, WhatsAppCampaign as Campaign } from '@/types/crm';

interface WhatsAppCampaignProps {
  lead: Lead | null;
}

const WhatsAppCampaign = ({ lead }: WhatsAppCampaignProps) => {
  const [showNewCampaign, setShowNewCampaign] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    message_template: '',
    send_date: ''
  });

  const extractWhatsAppNumber = (whatsappUrl: string) => {
    if (!whatsappUrl) return '';
    const match = whatsappUrl.match(/(\d+)$/);
    return match ? match[1] : '';
  };

  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 13) {
      return `+${cleaned.slice(0, 2)} (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
    }
    return phone;
  };

  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      name: 'Primeira Abordagem - Tecnologia',
      message_template: `Olá! 👋 

Sou João da TechSolutions. Vi que a ${lead?.nome_fantasia || lead?.razao_social} trabalha com tecnologia e gostaria de apresentar uma solução que está ajudando empresas como a sua a otimizar processos e reduzir custos.

Posso agendar 15 minutos para uma conversa rápida? 📞

Obrigado!`,
      leads: [lead?.cnpj || ''],
      status: 'draft',
      created_at: '2024-01-20T10:00:00Z'
    },
    {
      id: '2',
      name: 'Follow-up com Case de Sucesso',
      message_template: `Oi! 😊

Queria compartilhar rapidamente um resultado que conseguimos com a TechCorp (empresa similar à ${lead?.nome_fantasia || lead?.razao_social}):

✅ 30% redução nos custos operacionais
✅ 50% mais agilidade nos processos
✅ ROI de 200% em 6 meses

Vale uma conversa de 10 minutos para mostrar como pode funcionar na sua empresa?`,
      leads: [lead?.cnpj || ''],
      status: 'active',
      created_at: '2024-01-22T14:30:00Z',
      send_date: '2024-01-25T09:00:00Z'
    }
  ];

  if (!lead) {
    return (
      <Card className="border-2 border-slate-200">
        <CardContent className="p-8 text-center">
          <MessageCircle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Converta a empresa para lead para criar campanhas de WhatsApp</p>
        </CardContent>
      </Card>
    );
  }

  const whatsappNumber = lead.whatsapp_1 ? extractWhatsAppNumber(lead.whatsapp_1) : '';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'active': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const handleCreateCampaign = () => {
    console.log('Nova campanha:', newCampaign);
    setNewCampaign({
      name: '',
      message_template: '',
      send_date: ''
    });
    setShowNewCampaign(false);
  };

  const handleSendMessage = (message: string) => {
    if (lead.whatsapp_1) {
      const encodedMessage = encodeURIComponent(message);
      window.open(`${lead.whatsapp_1}&text=${encodedMessage}`, '_blank');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-green-800">
            <MessageCircle className="h-5 w-5" />
            Campanhas WhatsApp
          </CardTitle>
          <Button 
            onClick={() => setShowNewCampaign(!showNewCampaign)}
            size="sm"
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova Campanha
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Informações do WhatsApp */}
          <Card className="border border-green-300 bg-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <h4 className="font-medium text-slate-800">WhatsApp do Lead</h4>
                    {whatsappNumber ? (
                      <p className="text-sm text-slate-600">
                        {formatPhoneNumber(whatsappNumber)}
                      </p>
                    ) : (
                      <p className="text-sm text-red-600">WhatsApp não disponível</p>
                    )}
                  </div>
                </div>
                {whatsappNumber && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(lead.whatsapp_1, '_blank')}
                    className="border-green-300 text-green-700 hover:bg-green-50"
                  >
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Abrir Chat
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Formulário de Nova Campanha */}
          {showNewCampaign && (
            <Card className="border-2 border-green-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Nova Campanha WhatsApp</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Nome da Campanha
                  </label>
                  <Input 
                    placeholder="Ex: Primeira Abordagem - Tecnologia"
                    value={newCampaign.name}
                    onChange={(e) => setNewCampaign({...newCampaign, name: e.target.value})}
                    className="border-green-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Agendamento (opcional)
                  </label>
                  <Input 
                    type="datetime-local"
                    value={newCampaign.send_date}
                    onChange={(e) => setNewCampaign({...newCampaign, send_date: e.target.value})}
                    className="border-green-300"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Mensagem Template
                  </label>
                  <Textarea 
                    placeholder="Digite sua mensagem aqui... Use variáveis como {nome_empresa}, {setor}, etc."
                    value={newCampaign.message_template}
                    onChange={(e) => setNewCampaign({...newCampaign, message_template: e.target.value})}
                    className="border-green-300"
                    rows={8}
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    💡 Dica: Use emojis e quebras de linha para tornar a mensagem mais atrativa
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleCreateCampaign}>
                    <MessageCircle className="h-4 w-4 mr-1" />
                    Criar Campanha
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewCampaign(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Campanhas */}
          <div className="space-y-3">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id} className="border border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-slate-800 mb-1">{campaign.name}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(campaign.status)} font-medium text-xs`}>
                          {campaign.status === 'draft' && 'Rascunho'}
                          {campaign.status === 'active' && 'Ativa'}
                          {campaign.status === 'paused' && 'Pausada'}
                          {campaign.status === 'completed' && 'Enviada'}
                        </Badge>
                        {campaign.send_date && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(campaign.send_date).toLocaleDateString('pt-BR')} às{' '}
                            {new Date(campaign.send_date).toLocaleTimeString('pt-BR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {campaign.status === 'draft' && whatsappNumber && (
                        <Button 
                          size="sm"
                          onClick={() => handleSendMessage(campaign.message_template)}
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                          <Send className="h-4 w-4 mr-1" />
                          Enviar Agora
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="border-green-300 text-green-700">
                        Editar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                    <label className="text-xs font-medium text-slate-600 mb-2 block">Preview da Mensagem:</label>
                    <div className="bg-white rounded-lg p-3 border-l-4 border-green-400 shadow-sm">
                      <div className="whitespace-pre-wrap text-sm text-slate-700">
                        {campaign.message_template}
                      </div>
                    </div>
                  </div>

                  {!whatsappNumber && (
                    <div className="mt-3 flex items-center gap-2 text-amber-700 bg-amber-50 p-2 rounded border border-amber-200">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm">WhatsApp não disponível para este lead</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WhatsAppCampaign;
