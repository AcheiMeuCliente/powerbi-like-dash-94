
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Calendar, 
  DollarSign,
  ExternalLink,
  FileText,
  User,
  Hash
} from 'lucide-react';
import { Empresa } from '@/types/empresa';

interface EmpresaDetailsDialogProps {
  empresa: Empresa | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EmpresaDetailsDialog = ({ empresa, open, onOpenChange }: EmpresaDetailsDialogProps) => {
  if (!empresa) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateCompanyAge = (dateString: string) => {
    const startDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25));
    return diffYears;
  };

  const extractWhatsAppNumber = (whatsappUrl: string) => {
    if (!whatsappUrl) return '';
    const match = whatsappUrl.match(/(\d+)$/);
    return match ? match[1] : '';
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao.toLowerCase()) {
      case 'ativa': return 'bg-gradient-to-r from-emerald-50 to-green-100 text-emerald-700 border-emerald-200';
      case 'suspensa': return 'bg-gradient-to-r from-amber-50 to-yellow-100 text-amber-700 border-amber-200';
      case 'baixada': return 'bg-gradient-to-r from-rose-50 to-red-100 text-rose-700 border-rose-200';
      default: return 'bg-gradient-to-r from-slate-50 to-gray-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50">
        <DialogHeader className="border-b border-blue-100 pb-4">
          <DialogTitle className="flex items-center gap-2 text-xl bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
            <Building2 className="h-6 w-6 text-blue-600" />
            {empresa.nome_fantasia || empresa.razao_social}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Informações Básicas */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100 border-b border-blue-200">
              <CardTitle className="flex items-center gap-2 text-lg text-blue-800">
                <Hash className="h-5 w-5 text-blue-600" />
                Identificação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              <div>
                <label className="text-sm font-medium text-blue-700">CNPJ</label>
                <p className="font-mono text-lg text-slate-800">{empresa.cnpj}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-blue-700">Razão Social</label>
                <p className="font-medium text-slate-800">{empresa.razao_social}</p>
              </div>
              
              {empresa.nome_fantasia && (
                <div>
                  <label className="text-sm font-medium text-blue-700">Nome Fantasia</label>
                  <p className="text-slate-700">{empresa.nome_fantasia}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-blue-700">Situação</label>
                <div className="mt-1">
                  <Badge className={`${getSituacaoColor(empresa.situacao)} border font-medium`}>
                    {empresa.situacao}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contato */}
          <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100 border-b border-green-200">
              <CardTitle className="flex items-center gap-2 text-lg text-green-800">
                <Phone className="h-5 w-5 text-green-600" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-4">
              {empresa.email && (
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-green-700">Email</label>
                    <p className="text-slate-700">{empresa.email}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-100"
                    onClick={() => window.open(`mailto:${empresa.email}`, '_blank')}
                  >
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {empresa.telefones && (
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-green-700">Telefone</label>
                    <p className="text-slate-700">{empresa.telefones}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-100"
                    onClick={() => window.open(`tel:${empresa.telefones}`, '_blank')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {empresa.whatsapp_1 && (
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-green-700">WhatsApp</label>
                    <p className="text-slate-700">{extractWhatsAppNumber(empresa.whatsapp_1)}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-green-600 border-green-300 hover:bg-green-100"
                    onClick={() => window.open(empresa.whatsapp_1, '_blank')}
                  >
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {empresa.site && (
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-green-700">Website</label>
                    <p className="truncate text-slate-700">{empresa.site}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-green-300 text-green-700 hover:bg-green-100"
                    onClick={() => window.open(empresa.site, '_blank')}
                  >
                    <Globe className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-violet-100 border-b border-purple-200">
              <CardTitle className="flex items-center gap-2 text-lg text-purple-800">
                <MapPin className="h-5 w-5 text-purple-600" />
                Endereço
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-4">
              <p className="text-slate-700">{empresa.logradouro}, {empresa.numero}</p>
              {empresa.complemento && <p className="text-slate-700">{empresa.complemento}</p>}
              <p className="text-slate-700">{empresa.bairro}</p>
              <p className="text-slate-700">{empresa.municipio} - {empresa.estado}</p>
              <p className="text-slate-700">CEP: {empresa.cep}</p>
              
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(empresa.maps, '_blank')}
                  className="w-full border-purple-300 text-purple-700 hover:bg-purple-100"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Ver no Mapa
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Atividade Econômica */}
          <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100 border-b border-orange-200">
              <CardTitle className="flex items-center gap-2 text-lg text-orange-800">
                <FileText className="h-5 w-5 text-orange-600" />
                Atividade Econômica
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div>
                <label className="text-sm font-medium text-orange-700">CNAE Principal</label>
                <p className="text-sm font-mono text-orange-600 font-semibold">{empresa.cnae_principal_codigo}</p>
                <p className="text-sm text-slate-700">{empresa.cnae_principal_nome}</p>
              </div>
              
              {empresa.cnae_secundario_nome && (
                <div>
                  <label className="text-sm font-medium text-orange-700">CNAE Secundário Completo</label>
                  <p className="text-sm text-slate-700">{empresa.cnae_secundario_nome}</p>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-orange-700">Porte</label>
                <p className="text-slate-700">{empresa.porte}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-orange-700">Natureza Jurídica</label>
                <p className="text-sm text-slate-700">{empresa.descricao_natureza_juridica}</p>
              </div>
            </CardContent>
          </Card>

          {/* Informações Financeiras */}
          <Card className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-emerald-100 to-green-100 border-b border-emerald-200">
              <CardTitle className="flex items-center gap-2 text-lg text-emerald-800">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                Informações Financeiras
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div>
                <label className="text-sm font-medium text-emerald-700">Capital Social</label>
                <p className="text-lg font-semibold text-emerald-600">{formatCurrency(empresa.capital_social)}</p>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {empresa.mei && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    MEI
                  </Badge>
                )}
                {empresa.simples && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Simples Nacional
                  </Badge>
                )}
                <Badge variant="outline" className="bg-indigo-50 text-indigo-700 border-indigo-200">
                  {empresa.matriz_filial}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Datas Importantes */}
          <Card className="border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-indigo-100 to-blue-100 border-b border-indigo-200">
              <CardTitle className="flex items-center gap-2 text-lg text-indigo-800">
                <Calendar className="h-5 w-5 text-indigo-600" />
                Datas Importantes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pt-4">
              <div>
                <label className="text-sm font-medium text-indigo-700">Início da Atividade</label>
                <p className="text-slate-700">{formatDate(empresa.inicio_atividade)}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-indigo-700">Idade da Empresa</label>
                <p className="text-slate-700 font-semibold">{calculateCompanyAge(empresa.inicio_atividade)} anos</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-indigo-700">Última Atualização</label>
                <p className="text-slate-700">{formatDate(empresa.atualizacao_cadastral)}</p>
              </div>
              
              {empresa.data_opcao_simples && (
                <div>
                  <label className="text-sm font-medium text-indigo-700">Opção Simples Nacional</label>
                  <p className="text-slate-700">{formatDate(empresa.data_opcao_simples)}</p>
                </div>
              )}
              
              {empresa.data_opcao_mei && (
                <div>
                  <label className="text-sm font-medium text-indigo-700">Opção MEI</label>
                  <p className="text-slate-700">{formatDate(empresa.data_opcao_mei)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Separator className="my-4 bg-gradient-to-r from-blue-200 to-indigo-200 h-0.5" />

        <div className="flex justify-end gap-2">
          <Button 
            variant="outline"
            onClick={() => window.open(empresa.receita_federal, '_blank')}
            className="border-blue-300 text-blue-700 hover:bg-blue-50"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Ver na Receita Federal
          </Button>
          <Button 
            onClick={() => onOpenChange(false)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmpresaDetailsDialog;
