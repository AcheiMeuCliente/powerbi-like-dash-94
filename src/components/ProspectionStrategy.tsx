
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Target, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Lead, ProspectionStrategy as Strategy } from '@/types/crm';

interface ProspectionStrategyProps {
  lead: Lead | null;
}

const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: 'Sequência WhatsApp - Tecnologia',
    type: 'whatsapp',
    description: 'Sequência de 5 mensagens para empresas de tecnologia',
    steps: [
      {
        id: '1-1',
        order: 1,
        title: 'Primeira Abordagem',
        description: 'Mensagem inicial de apresentação',
        type: 'message',
        delay_days: 0,
        template: 'Olá! Sou {nome} da {empresa}. Vi que vocês trabalham com {setor} e gostaria de apresentar uma solução que pode otimizar seus processos.'
      },
      {
        id: '1-2',
        order: 2,
        title: 'Follow-up com Valor',
        description: 'Segunda mensagem com case de sucesso',
        type: 'message',
        delay_days: 3,
        template: 'Olá novamente! Queria compartilhar um case de como ajudamos a {empresa_similar} a reduzir custos em 30%. Posso agendar 15 minutos para mostrar?'
      },
      {
        id: '1-3',
        order: 3,
        title: 'Ligação de Qualificação',
        description: 'Ligação para qualificar o lead',
        type: 'call',
        delay_days: 5
      },
      {
        id: '1-4',
        order: 4,
        title: 'Proposta Comercial',
        description: 'Envio da proposta personalizada',
        type: 'email',
        delay_days: 7
      },
      {
        id: '1-5',
        order: 5,
        title: 'Follow-up Final',
        description: 'Última tentativa de contato',
        type: 'message',
        delay_days: 10,
        template: 'Oi! Sei que vocês devem estar ocupados. Esta é minha última mensagem. Se tiverem interesse futuramente, estarei à disposição!'
      }
    ]
  },
  {
    id: '2',
    name: 'Visita Presencial - Alto Valor',
    type: 'visit',
    description: 'Estratégia para leads de alto valor com visita presencial',
    steps: [
      {
        id: '2-1',
        order: 1,
        title: 'Pesquisa Prévia',
        description: 'Pesquisar informações sobre a empresa',
        type: 'message',
        delay_days: 0
      },
      {
        id: '2-2',
        order: 2,
        title: 'Primeiro Contato',
        description: 'Ligação para agendar visita',
        type: 'call',
        delay_days: 1
      },
      {
        id: '2-3',
        order: 3,
        title: 'Visita Comercial',
        description: 'Reunião presencial na empresa',
        type: 'visit',
        delay_days: 7
      },
      {
        id: '2-4',
        order: 4,
        title: 'Proposta Personalizada',
        description: 'Envio de proposta baseada na reunião',
        type: 'email',
        delay_days: 10
      }
    ]
  }
];

const ProspectionStrategy = ({ lead }: ProspectionStrategyProps) => {
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [strategyStatus, setStrategyStatus] = useState<'inactive' | 'active' | 'paused' | 'completed'>('inactive');

  if (!lead) {
    return (
      <Card className="border-2 border-slate-200">
        <CardContent className="p-8 text-center">
          <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Converta a empresa para lead para acessar estratégias de prospecção</p>
        </CardContent>
      </Card>
    );
  }

  const handleStartStrategy = (strategy: Strategy) => {
    setSelectedStrategy(strategy);
    setActiveStep(0);
    setStrategyStatus('active');
  };

  const handleNextStep = () => {
    if (selectedStrategy && activeStep < selectedStrategy.steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      setStrategyStatus('completed');
    }
  };

  const getStepIcon = (type: string) => {
    switch (type) {
      case 'message': return MessageCircle;
      case 'call': return Phone;
      case 'email': return Mail;
      case 'visit': return MapPin;
      default: return CheckCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Estratégias Disponíveis */}
      <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg text-green-800">
            <Target className="h-5 w-5" />
            Estratégias de Prospecção
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockStrategies.map((strategy) => {
            const isActive = selectedStrategy?.id === strategy.id;
            return (
              <Card key={strategy.id} className={`border-2 ${isActive ? 'border-green-400 bg-green-50' : 'border-slate-200 bg-white'} transition-all`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-slate-800">{strategy.name}</h4>
                        <Badge variant="outline" className={strategy.type === 'whatsapp' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                          {strategy.type === 'whatsapp' ? (
                            <><MessageCircle className="h-3 w-3 mr-1" /> WhatsApp</>
                          ) : (
                            <><MapPin className="h-3 w-3 mr-1" /> Visita</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{strategy.description}</p>
                      <div className="text-xs text-slate-500">
                        {strategy.steps.length} etapas • Duração: {Math.max(...strategy.steps.map(s => s.delay_days || 0))} dias
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!isActive ? (
                        <Button 
                          onClick={() => handleStartStrategy(strategy)}
                          size="sm"
                          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                        >
                          <Play className="h-4 w-4 mr-1" />
                          Iniciar
                        </Button>
                      ) : (
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Pause className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </CardContent>
      </Card>

      {/* Estratégia Ativa */}
      {selectedStrategy && (
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
              <CheckCircle className="h-5 w-5" />
              Estratégia em Andamento: {selectedStrategy.name}
            </CardTitle>
            <div className="flex items-center gap-4">
              <Progress value={(activeStep / selectedStrategy.steps.length) * 100} className="flex-1 h-2" />
              <span className="text-sm font-medium text-blue-700">
                {activeStep + 1} de {selectedStrategy.steps.length}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {selectedStrategy.steps.map((step, index) => {
                const StepIcon = getStepIcon(step.type);
                const isCompleted = index < activeStep;
                const isCurrent = index === activeStep;
                const isPending = index > activeStep;

                return (
                  <div 
                    key={step.id} 
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isCompleted ? 'bg-green-50 border-green-300' :
                      isCurrent ? 'bg-blue-50 border-blue-300' :
                      'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        isCompleted ? 'bg-green-200 text-green-700' :
                        isCurrent ? 'bg-blue-200 text-blue-700' :
                        'bg-slate-200 text-slate-500'
                      }`}>
                        <StepIcon className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-slate-800">{step.title}</h5>
                          <div className="flex items-center gap-2">
                            {step.delay_days !== undefined && step.delay_days > 0 && (
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                +{step.delay_days}d
                              </Badge>
                            )}
                            {isCompleted && (
                              <Badge className="bg-green-100 text-green-800 text-xs">
                                Concluído
                              </Badge>
                            )}
                            {isCurrent && (
                              <Badge className="bg-blue-100 text-blue-800 text-xs">
                                Atual
                              </Badge>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{step.description}</p>
                        {step.template && (
                          <div className="p-3 bg-white rounded border border-slate-200">
                            <p className="text-xs text-slate-500 mb-1">Template:</p>
                            <p className="text-sm text-slate-700 italic">"{step.template}"</p>
                          </div>
                        )}
                        {isCurrent && strategyStatus === 'active' && (
                          <div className="mt-3 flex gap-2">
                            <Button onClick={handleNextStep} size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Marcar como Concluído
                            </Button>
                            <Button variant="outline" size="sm">
                              Editar Template
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ProspectionStrategy;
