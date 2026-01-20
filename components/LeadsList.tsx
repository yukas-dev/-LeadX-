
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Mail, Phone, ExternalLink } from 'lucide-react';
import { MOCK_LEADS } from '../mockData';
import { Lead, LeadStatus } from '../types';

interface LeadsListProps {
  onSelectLead: (lead: Lead) => void;
}

const LeadsList: React.FC<LeadsListProps> = ({ onSelectLead }) => {
  const [filter, setFilter] = useState<string>('Todos');

  const filteredLeads = filter === 'Todos' 
    ? MOCK_LEADS 
    : MOCK_LEADS.filter(l => l.status === filter);

  const getStatusColor = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.NEW: return 'bg-blue-100 text-blue-700';
      case LeadStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-700';
      case LeadStatus.QUALIFIED: return 'bg-purple-100 text-purple-700';
      case LeadStatus.PROPOSAL: return 'bg-orange-100 text-orange-700';
      case LeadStatus.CONVERTED: return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Gestão de Leads</h2>
        <p className="text-slate-500">Gerencie contatos, acompanhe o progresso e feche negócios.</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {['Todos', ...Object.values(LeadStatus)].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === s 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Filtrar nesta lista..." 
                className="pl-9 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-48"
              />
            </div>
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg border border-gray-200">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Nome do Lead</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Origem</th>
                <th className="px-6 py-4">Responsável</th>
                <th className="px-6 py-4">Criação</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.map((lead) => (
                <tr 
                  key={lead.id} 
                  className="hover:bg-blue-50/30 transition-colors cursor-pointer group"
                  onClick={() => onSelectLead(lead)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-700 text-xs">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{lead.name}</p>
                        <p className="text-xs text-gray-400 font-normal">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-bold px-2 py-1 rounded-full uppercase tracking-tight ${getStatusColor(lead.status)}`}>
                      {lead.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-xs text-gray-600 bg-gray-100 w-fit px-2 py-1 rounded">
                       {lead.origin}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{lead.owner}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                        <Phone size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                        <Mail size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div className="p-20 text-center">
              <p className="text-gray-400 italic">Nenhum lead encontrado para este status.</p>
            </div>
          )}
        </div>
        
        {/* Table Info Note */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
           <p className="text-xs text-gray-500 text-center">
             Exibindo {filteredLeads.length} de {MOCK_LEADS.length} leads totais.
           </p>
        </div>
      </div>
    </div>
  );
};

export default LeadsList;
