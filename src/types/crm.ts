
export interface Lead extends Empresa {
  crm_status: 'novo' | 'contatado' | 'qualificado' | 'proposta' | 'fechado' | 'perdido';
  score: number;
  tags: string[];
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  last_contact?: string;
  next_action?: string;
  next_action_date?: string;
}

export interface LeadActivity {
  id: string;
  lead_id: string;
  type: 'note' | 'call' | 'email' | 'whatsapp' | 'visit' | 'status_change';
  title: string;
  description?: string;
  created_at: string;
  created_by: string;
  metadata?: Record<string, any>;
}

export interface ProspectionStrategy {
  id: string;
  name: string;
  type: 'whatsapp' | 'visit';
  description: string;
  template?: string;
  steps: ProspectionStep[];
}

export interface ProspectionStep {
  id: string;
  order: number;
  title: string;
  description: string;
  type: 'message' | 'call' | 'visit' | 'email';
  delay_days?: number;
  template?: string;
}

export interface VisitPlan {
  id: string;
  lead_id: string;
  planned_date: string;
  address: string;
  objective: string;
  status: 'planned' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  duration_minutes?: number;
}

export interface WhatsAppCampaign {
  id: string;
  name: string;
  message_template: string;
  leads: string[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  created_at: string;
  send_date?: string;
}
