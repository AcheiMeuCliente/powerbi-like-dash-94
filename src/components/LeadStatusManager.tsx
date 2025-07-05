
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  User, 
  Phone, 
  CheckCircle, 
  FileText, 
  DollarSign, 
  XCircle,
  Clock,
  TrendingUp
} from 'lucide-react';
import { Lead } from '@/types/crm';

interface LeadStatusManagerProps {
  lead: Lead;
}

const statusConfig = {
  novo: { 
    label: 'Novo', 
    color: 'bg-slate-100 text-slate-800 border-slate-300', 
    icon: User, 
    progress: 10 
  },
  contatado: { 
    label: 'Contatado', 
    color: 'bg-blue-100 text-blue-800 border-blue-300', 
    icon: Phone, 
    progress: 30 
  },
  qualificado: { 
    label: 'Qualificado', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300', 
    icon: CheckCircle, 
    progress: 50 
  },
  proposta: { 
    label: 'Proposta Enviada', 
    color: 'bg-purple-100 text-purple-800 border-purple-300', 
    icon: FileText, 
    progress: 75 
  },
  fechado: { 
    label: 'Fechado', 
    color: 'bg-green-100 text-green-800 border-green-300', 
    icon: DollarSign, 
    progress: 100 
  },
  perdido: { 
    label: 'Perdido', 
    color: 'bg-red-100 text-red-800 border-red-300', 
    icon: XCircle, 
    progress: 0 
  }
};

const LeadStatusManager = ({ lead }: LeadStatusManagerProps) => {
  const [currentStatus, setCurrentStatus] = useState(lead.crm_status);
  const [showHistory, setShowHistory] = useState(false);

  const currentConfig = statusConfig[currentStatus];
  const IconComponent = currentConfig.icon;

  const mockStatusHistory = [
    { status: 'novo', date: '2024-01-15', user: 'João Silva' },
    { status: 'contatado', date: '2024-01-16', user: 'Maria Santos' },
    { status: 'qualificado', date: '2024-01-18', user: 'João Silva' }
  ];

  return (
    <div className="space-y-4">
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg text-indigo-800">
            <TrendingUp className="h-5 w-5" />
            Pipeline de Vendas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <IconComponent className="h-6 w-6 text-indigo-600" />
            <div className="flex-1">
              <Badge className={`${currentConfig.color} font-medium`}>
                {currentConfig.label}
              </Badge>
              <Progress value={currentConfig.progress} className="w-full mt-2 h-2" />
            </div>
            <span className="text-sm font-semibold text-indigo-700">
              {currentConfig.progress}%
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-indigo-700">Alterar Status</label>
            <Select value={currentStatus} onValueChange={setCurrentStatus}>
              <SelectTrigger className="border-indigo-300 focus:border-indigo-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>
                    <div className="flex items-center gap-2">
                      <config.icon className="h-4 w-4" />
                      {config.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => setShowHistory(!showHistory)}
              variant="outline"
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50"
            >
              <Clock className="h-4 w-4 mr-1" />
              Histórico
            </Button>
            <Button 
              size="sm"
              className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
            >
              Salvar Alteração
            </Button>
          </div>

          {showHistory && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-indigo-200">
              <h4 className="font-medium text-indigo-800 mb-2">Histórico de Status</h4>
              <div className="space-y-2">
                {mockStatusHistory.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {statusConfig[item.status as keyof typeof statusConfig].label}
                      </Badge>
                      <span className="text-slate-600">por {item.user}</span>
                    </div>
                    <span className="text-slate-500">
                      {new Date(item.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LeadStatusManager;
