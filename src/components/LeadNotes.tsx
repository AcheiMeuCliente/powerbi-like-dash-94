
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Plus, 
  User, 
  Clock,
  Star,
  Tag
} from 'lucide-react';
import { Lead } from '@/types/crm';

interface LeadNotesProps {
  lead: Lead | null;
}

interface Note {
  id: string;
  content: string;
  created_at: string;
  created_by: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

const LeadNotes = ({ lead }: LeadNotesProps) => {
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({
    content: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    tags: [] as string[]
  });

  const mockNotes: Note[] = [
    {
      id: '1',
      content: 'Empresa demonstrou interesse na solução. Decisor é o CEO que estava presente na ligação. Mencionou que o orçamento está aprovado para Q1 2024.',
      created_at: '2024-01-20T14:30:00Z',
      created_by: 'João Silva',
      priority: 'high',
      tags: ['interesse-alto', 'orçamento-ok', 'decisor-identificado']
    },
    {
      id: '2',
      content: 'Empresa já utiliza uma solução similar da concorrência (SoftwareX), mas está insatisfeita com o suporte técnico. Contrato vence em março/2024.',
      created_at: '2024-01-18T10:15:00Z',
      created_by: 'Maria Santos',
      priority: 'medium',
      tags: ['concorrência', 'oportunidade', 'suporte-técnico']
    },
    {
      id: '3',
      content: 'Agendada visita presencial para apresentação da solução. Levar cases específicos do setor de tecnologia.',
      created_at: '2024-01-16T16:45:00Z',
      created_by: 'João Silva',
      priority: 'medium',
      tags: ['visita-agendada', 'apresentação']
    }
  ];

  if (!lead) {
    return (
      <Card className="border-2 border-slate-200">
        <CardContent className="p-8 text-center">
          <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <p className="text-slate-600">Converta a empresa para lead para fazer anotações</p>
        </CardContent>
      </Card>
    );
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta';
      case 'medium': return 'Média';
      case 'low': return 'Baixa';
      default: return priority;
    }
  };

  const handleAddNote = () => {
    console.log('Nova nota:', newNote);
    setNewNote({
      content: '',
      priority: 'medium',
      tags: []
    });
    setShowNewNote(false);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg text-indigo-800">
            <FileText className="h-5 w-5" />
            Anotações do Lead
          </CardTitle>
          <Button 
            onClick={() => setShowNewNote(!showNewNote)}
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Nova Anotação
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Formulário de Nova Anotação */}
          {showNewNote && (
            <Card className="border-2 border-indigo-300 bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-indigo-800">Nova Anotação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Prioridade
                  </label>
                  <select 
                    value={newNote.priority}
                    onChange={(e) => setNewNote({...newNote, priority: e.target.value as 'low' | 'medium' | 'high'})}
                    className="px-3 py-2 border border-indigo-300 rounded-md text-sm w-32"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-1 block">
                    Anotação
                  </label>
                  <Textarea 
                    placeholder="Digite sua anotação sobre o lead..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    className="border-indigo-300"
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddNote}>
                    <FileText className="h-4 w-4 mr-1" />
                    Salvar Anotação
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowNewNote(false)}
                  >
                    Cancelar
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Lista de Anotações */}
          <div className="space-y-3">
            {mockNotes.map((note) => (
              <Card key={note.id} className="border border-slate-200 bg-white hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Star className={`h-4 w-4 ${
                        note.priority === 'high' ? 'text-red-500 fill-red-500' :
                        note.priority === 'medium' ? 'text-yellow-500 fill-yellow-500' :
                        'text-green-500 fill-green-500'
                      }`} />
                      <Badge className={`${getPriorityColor(note.priority)} font-medium text-xs`}>
                        {getPriorityLabel(note.priority)}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
                        <User className="h-3 w-3" />
                        {note.created_by}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        {new Date(note.created_at).toLocaleDateString('pt-BR')} às{' '}
                        {new Date(note.created_at).toLocaleTimeString('pt-BR', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-slate-700 mb-3 leading-relaxed">
                    {note.content}
                  </p>
                  
                  {note.tags.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap">
                      <Tag className="h-3 w-3 text-slate-400" />
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-300">
                          {tag}
                        </Badge>
                      ))}
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

export default LeadNotes;
