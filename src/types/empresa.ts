
export interface Empresa {
  cnpj: string;
  situacao: string;
  cnae_principal_codigo: string;
  cnae_principal_nome: string;
  cnae_secundario_codigo?: string;
  cnae_secundario_nome?: string;
  razao_social: string;
  nome_fantasia?: string;
  telefones?: string;
  email?: string;
  tipo: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cep: string;
  municipio: string;
  estado: string;
  endereco_mapa: string;
  maps: string;
  matriz_filial: string;
  porte: string;
  capital_social: number;
  mei: boolean;
  simples: boolean;
  inicio_atividade: string;
  atualizacao_cadastral: string;
  receita_federal: string;
  bairro_mun_uf_cep_br: string;
  data_opcao_simples?: string;
  data_exclusao_simples?: string;
  data_opcao_mei?: string;
  data_exclusao_mei?: string;
  descricao_motivo: string;
  descricao_natureza_juridica: string;
  email_de_contabilidade?: string;
  tem_email: boolean;
  tem_telefone: boolean;
  whatsapp_1?: string;
  whatsapp_2?: string;
  whatsapp_3?: string;
  dominio_corporativo?: string;
  site?: string;
  created_at: string;
  updated_at: string;
}

export interface FilterOptions {
  situacao: string[];
  cnae_principal: { codigo: string; nome: string }[];
  porte: string[];
  tipo: string[];
  matriz_filial: string[];
  estado: string[];
  municipio: string[];
  mei: boolean[];
  simples: boolean[];
}

export interface ActiveFilters {
  situacao: string[];
  cnae_principal: string[];
  porte: string[];
  tipo: string[];
  matriz_filial: string[];
  estado: string[];
  municipio: string[];
  mei: boolean[];
  simples: boolean[];
  busca: string;
}
