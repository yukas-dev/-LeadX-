
import { Lead, LeadStatus, LeadOrigin } from './types';

export const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Roberto Almeida',
    email: 'roberto@email.com',
    phone: '(11) 98765-4321',
    status: LeadStatus.NEW,
    origin: LeadOrigin.INSTAGRAM,
    owner: 'Ana Silva',
    createdAt: '2023-10-25',
    value: 1500,
    history: [
      { id: 'h1', date: '2023-10-25', type: 'note', description: 'Lead capturado via anúncio de Instagram.' }
    ]
  },
  {
    id: '2',
    name: 'Juliana Fernandes',
    email: 'juliana@email.com',
    phone: '(21) 99887-7665',
    status: LeadStatus.IN_PROGRESS,
    origin: LeadOrigin.WHATSAPP,
    owner: 'Bruno Costa',
    createdAt: '2023-10-24',
    value: 2800,
    history: [
      { id: 'h2', date: '2023-10-24', type: 'call', description: 'Primeiro contato realizado. Demonstrou interesse no plano Premium.' }
    ]
  },
  {
    id: '3',
    name: 'Carlos Mendes',
    email: 'carlos@empresa.com.br',
    phone: '(31) 97766-5544',
    status: LeadStatus.QUALIFIED,
    origin: LeadOrigin.SITE,
    owner: 'Carla Souza',
    createdAt: '2023-10-22',
    value: 5000,
    history: [
      { id: 'h3', date: '2023-10-22', type: 'note', description: 'Formulário do site preenchido.' },
      { id: 'h4', date: '2023-10-23', type: 'meeting', description: 'Reunião de diagnóstico realizada. Lead qualificado para proposta.' }
    ]
  },
  {
    id: '4',
    name: 'Marina Rocha',
    email: 'marina@design.com',
    phone: '(41) 96655-4433',
    status: LeadStatus.PROPOSAL,
    origin: LeadOrigin.INSTAGRAM,
    owner: 'Ana Silva',
    createdAt: '2023-10-20',
    value: 3200,
    history: [
      { id: 'h5', date: '2023-10-20', type: 'note', description: 'Interação via DM.' },
      { id: 'h6', date: '2023-10-21', type: 'call', description: 'Chamada de vídeo para apresentação.' },
      { id: 'h7', date: '2023-10-24', type: 'email', description: 'Proposta comercial enviada por e-mail.' }
    ]
  },
  {
    id: '5',
    name: 'Fábio Santos',
    email: 'fabio@construcao.com',
    phone: '(11) 95544-3322',
    status: LeadStatus.CONVERTED,
    origin: LeadOrigin.WHATSAPP,
    owner: 'Bruno Costa',
    createdAt: '2023-10-15',
    value: 12000,
    history: [
      { id: 'h8', date: '2023-10-15', type: 'note', description: 'Indicação de cliente antigo.' },
      { id: 'h9', date: '2023-10-24', type: 'meeting', description: 'Contrato assinado presencialmente.' }
    ]
  },
  {
    id: '6',
    name: 'Luciana Lima',
    email: 'luciana@loja.com',
    phone: '(13) 94433-2211',
    status: LeadStatus.NEW,
    origin: LeadOrigin.SITE,
    owner: 'Carla Souza',
    createdAt: '2023-10-26',
    value: 900,
    history: []
  }
];

export const FUNNEL_CHART_DATA = [
  { name: 'Novo', value: 45, fill: '#1E3A8A' },
  { name: 'Atendimento', value: 30, fill: '#2563EB' },
  { name: 'Qualificado', value: 20, fill: '#3B82F6' },
  { name: 'Proposta', value: 12, fill: '#60A5FA' },
  { name: 'Convertido', value: 8, fill: '#93C5FD' },
];
