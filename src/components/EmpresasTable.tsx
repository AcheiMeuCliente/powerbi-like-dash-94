import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ExternalLink, MapPin, Phone, Mail, MessageCircle, Eye, Globe, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Empresa } from '@/types/empresa';
import EmpresaDetailsDialog from './EmpresaDetailsDialog';
import LeadCRMDialog from './LeadCRMDialog';

interface EmpresasTableProps {
  empresas: Empresa[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

type SortField = keyof Empresa;
type SortDirection = 'asc' | 'desc';

const EmpresasTable = ({ empresas, currentPage, itemsPerPage, onPageChange }: EmpresasTableProps) => {
  const [sortField, setSortField] = useState<SortField>('razao_social');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [crmDialogOpen, setCrmDialogOpen] = useState(false);
  const [selectedEmpresaForCRM, setSelectedEmpresaForCRM] = useState<Empresa | null>(null);

  const sortedEmpresas = useMemo(() => {
    return [...empresas].sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (aValue === bValue) return 0;
      
      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [empresas, sortField, sortDirection]);

  const paginatedEmpresas = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedEmpresas.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedEmpresas, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(empresas.length / itemsPerPage);

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th 
      className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider cursor-pointer bg-gradient-to-r from-slate-50 to-blue-50 hover:from-blue-100 hover:to-indigo-100 select-none transition-all duration-200 border-b-2 border-blue-200"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortField === field && (
          sortDirection === 'asc' ? 
            <ChevronUp className="h-4 w-4 text-blue-600" /> : 
            <ChevronDown className="h-4 w-4 text-blue-600" />
        )}
      </div>
    </th>
  );

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getSituacaoColor = (situacao: string) => {
    switch (situacao.toLowerCase()) {
      case 'ativa': return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-300 shadow-sm';
      case 'suspensa': return 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-300 shadow-sm';
      case 'baixada': return 'bg-gradient-to-r from-rose-100 to-red-100 text-rose-800 border border-rose-300 shadow-sm';
      default: return 'bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border border-slate-300 shadow-sm';
    }
  };

  const formatPhoneForDisplay = (phone: string) => {
    if (!phone) return '';
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11) {
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
    }
    return phone;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  const handleViewDetails = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setDetailsOpen(true);
  };

  const handleOpenCRM = (empresa: Empresa) => {
    setSelectedEmpresaForCRM(empresa);
    setCrmDialogOpen(true);
  };

  return (
    <TooltipProvider>
      <Card className="w-full shadow-xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <CardHeader className="bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 border-b-2 border-blue-300 shadow-sm">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
              Empresas Encontradas
            </CardTitle>
            <div className="text-sm font-semibold text-slate-600 bg-white px-4 py-2 rounded-full border border-blue-300 shadow-md">
              {empresas.length} empresa{empresas.length !== 1 ? 's' : ''} encontrada{empresas.length !== 1 ? 's' : ''}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
                <tr>
                  <SortableHeader field="cnpj">CNPJ</SortableHeader>
                  <SortableHeader field="razao_social">Empresa</SortableHeader>
                  <SortableHeader field="cnae_principal_nome">CNAE Principal</SortableHeader>
                  <SortableHeader field="cnae_secundario_nome">CNAE Secundário</SortableHeader>
                  <SortableHeader field="porte">Porte</SortableHeader>
                  <SortableHeader field="matriz_filial">Tipo</SortableHeader>
                  <SortableHeader field="municipio">Município</SortableHeader>
                  <SortableHeader field="estado">UF</SortableHeader>
                  <SortableHeader field="capital_social">Capital Social</SortableHeader>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-blue-200">
                    Contato
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider bg-gradient-to-r from-slate-50 to-blue-50 border-b-2 border-blue-200">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-blue-100">
                {paginatedEmpresas.map((empresa, index) => (
                  <tr key={empresa.cnpj} className="hover:bg-gradient-to-r hover:from-blue-25 hover:to-indigo-25 transition-all duration-200 border-l-4 border-transparent hover:border-blue-400">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-slate-700 bg-slate-50">
                      {empresa.cnpj}
                    </td>
                    <td className="px-4 py-4 text-sm max-w-xs">
                      <div className="space-y-1">
                        <div className="font-semibold text-slate-900 truncate" title={empresa.razao_social}>
                          {empresa.razao_social}
                        </div>
                        {empresa.nome_fantasia && (
                          <div className="text-sm text-slate-600 truncate" title={empresa.nome_fantasia}>
                            {empresa.nome_fantasia}
                          </div>
                        )}
                        <Badge className={`${getSituacaoColor(empresa.situacao)} text-xs font-medium`}>
                          {empresa.situacao}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 max-w-xs">
                      <div className="space-y-1">
                        <div className="font-mono text-xs text-blue-600 font-semibold">{empresa.cnae_principal_codigo}</div>
                        <div className="truncate text-slate-700" title={empresa.cnae_principal_nome}>
                          {empresa.cnae_principal_nome}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600 max-w-xs">
                      {empresa.cnae_secundario_nome ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="truncate cursor-help">
                              {truncateText(empresa.cnae_secundario_nome, 40)}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-sm">
                            <p>{empresa.cnae_secundario_nome}</p>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                      {empresa.porte}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-1 flex-wrap">
                        <Badge variant="outline" className="text-xs font-medium bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-300">
                          {empresa.matriz_filial}
                        </Badge>
                        {empresa.mei && (
                          <Badge variant="outline" className="text-xs bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-700 border-cyan-300 font-medium">
                            MEI
                          </Badge>
                        )}
                        {empresa.simples && (
                          <Badge variant="outline" className="text-xs bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-300 font-medium">
                            Simples
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                      {empresa.municipio}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-700">
                      {empresa.estado}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-emerald-700">
                      {formatCurrency(empresa.capital_social)}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        {empresa.tem_telefone && empresa.telefones && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 transition-all duration-200 rounded-full"
                                onClick={() => window.open(`tel:${empresa.telefones}`, '_blank')}
                              >
                                <Phone className="h-4 w-4 text-blue-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Telefone: {formatPhoneForDisplay(empresa.telefones)}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        
                        {empresa.tem_email && empresa.email && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-red-100 hover:to-rose-200 transition-all duration-200 rounded-full"
                                onClick={() => window.open(`mailto:${empresa.email}`, '_blank')}
                              >
                                <Mail className="h-4 w-4 text-red-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Email: {empresa.email}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        
                        {empresa.whatsapp_1 && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-200 transition-all duration-200 rounded-full"
                                onClick={() => window.open(empresa.whatsapp_1, '_blank')}
                              >
                                <MessageCircle className="h-4 w-4 text-green-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>WhatsApp disponível</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                        
                        {empresa.site && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-purple-100 hover:to-violet-200 transition-all duration-200 rounded-full"
                                onClick={() => window.open(empresa.site, '_blank')}
                              >
                                <Globe className="h-4 w-4 text-purple-600" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Website: {empresa.site}</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-1">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-indigo-100 hover:to-blue-200 transition-all duration-200 rounded-full"
                              onClick={() => handleViewDetails(empresa)}
                            >
                              <Eye className="h-4 w-4 text-indigo-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver detalhes completos</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-purple-100 hover:to-violet-200 transition-all duration-200 rounded-full"
                              onClick={() => handleOpenCRM(empresa)}
                            >
                              <Target className="h-4 w-4 text-purple-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Abrir CRM - Gestão de Lead</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-orange-100 hover:to-amber-200 transition-all duration-200 rounded-full"
                              onClick={() => window.open(empresa.maps, '_blank')}
                            >
                              <MapPin className="h-4 w-4 text-orange-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Ver localização no mapa</p>
                          </TooltipContent>
                        </Tooltip>
                        
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 hover:bg-gradient-to-r hover:from-gray-100 hover:to-slate-200 transition-all duration-200 rounded-full"
                              onClick={() => window.open(empresa.receita_federal, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 text-slate-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Consultar na Receita Federal</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginação */}
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 px-4 py-3 border-t-2 border-blue-200 flex items-center justify-between">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 disabled:bg-gray-100"
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="bg-white border-blue-300 text-blue-700 hover:bg-blue-50 disabled:bg-gray-100"
              >
                Próximo
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-700">
                  Mostrando{' '}
                  <span className="font-bold text-blue-700">{(currentPage - 1) * itemsPerPage + 1}</span>{' '}
                  a{' '}
                  <span className="font-bold text-blue-700">
                    {Math.min(currentPage * itemsPerPage, empresas.length)}
                  </span>{' '}
                  de{' '}
                  <span className="font-bold text-indigo-700">{empresas.length}</span>{' '}
                  resultados
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-lg shadow-sm -space-x-px">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                    className="rounded-r-none bg-white border-blue-300 text-blue-700 hover:bg-blue-50 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Anterior
                  </Button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = i + 1;
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => onPageChange(pageNum)}
                        className={`rounded-none ${
                          currentPage === pageNum 
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600' 
                            : 'bg-white border-blue-300 text-blue-700 hover:bg-blue-50'
                        }`}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                    className="rounded-l-none bg-white border-blue-300 text-blue-700 hover:bg-blue-50 disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    Próximo
                  </Button>
                </nav>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EmpresaDetailsDialog 
        empresa={selectedEmpresa}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
      />

      <LeadCRMDialog 
        empresa={selectedEmpresaForCRM}
        open={crmDialogOpen}
        onOpenChange={setCrmDialogOpen}
        onConvertToLead={(empresa) => {
          console.log('Empresa convertida para lead:', empresa);
        }}
      />
    </TooltipProvider>
  );
};

export default EmpresasTable;
