
export enum LeadStatus {
  NEW = 'Novo',
  IN_PROGRESS = 'Em Atendimento',
  QUALIFIED = 'Qualificado',
  PROPOSAL = 'Proposta',
  CONVERTED = 'Convertido'
}

export enum LeadOrigin {
  INSTAGRAM = 'Instagram',
  WHATSAPP = 'WhatsApp',
  SITE = 'Site'
}

export interface Interaction {
  id: string;
  date: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  description: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: LeadStatus;
  origin: LeadOrigin;
  owner: string;
  createdAt: string;
  value?: number;
  history: Interaction[];
}

export type ViewType = 'dashboard' | 'leads' | 'funnel' | 'detail';
