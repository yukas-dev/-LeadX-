
import React from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  MessageSquare, 
  FileText, 
  Video,
  ExternalLink,
  Edit,
  Trash2,
  Clock
} from 'lucide-react';
import { Lead, LeadStatus } from '../types';

interface LeadDetailProps {
  lead: Lead;
  onBack: () => void;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ lead, onBack }) => {
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

  const InteractionIcon = ({ type }: { type: string }) => {
    switch (type) {
      case 'call': return <Phone size={14} className="text-blue-500" />;
      case 'email': return <Mail size={14} className="text-emerald-500" />;
      case 'meeting': return <Video size={14} className="text-purple-500" />;
      default: return <FileText size={14} className="text-gray-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-right-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors mb-6 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Voltar para a lista</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Summary & Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center font-bold text-blue-700 text-2xl mx-auto mb-4 border-2 border-white shadow-sm">
              {lead.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-1">{lead.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{lead.email}</p>
            
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${getStatusColor(lead.status)}`}>
                {lead.status}
              </span>
              <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                {lead.origin}
              </span>
            </div>

            <div className="flex items-center justify-center gap-3">
               <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 rounded-lg transition-colors font-medium">Contatar</button>
               <button className="p-2 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50"><Edit size={18}/></button>
               <button className="p-2 border border-gray-200 rounded-lg text-red-400 hover:bg-red-50"><Trash2 size={18}/></button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-blue-500" /> Detalhes Básicos
            </h3>
            <div className="space-y-4">
              <InfoRow label="Telefone" value={lead.phone} icon={Phone} />
              <InfoRow label="Proprietário" value={lead.owner} icon={Calendar} />
              <InfoRow label="Desde" value={new Date(lead.createdAt).toLocaleDateString('pt-BR')} icon={Clock} />
              <InfoRow label="Valor Estimado" value={(lead.value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={ExternalLink} />
            </div>
          </div>
        </div>

        {/* Right Column: Interaction History */}
        <div className="lg:col-span-2 flex flex-col gap-6">
           {/* Add Interaction Box */}
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                   <MessageSquare size={20} />
                </div>
                <h3 className="font-bold text-gray-800">Registrar nova interação</h3>
              </div>
              <textarea 
                placeholder="Ex: Liguei para o lead e marcamos uma visita para amanhã..." 
                className="w-full h-24 p-4 bg-gray-50 border border-gray-100 rounded-xl resize-none text-sm focus:ring-2 focus:ring-blue-500 outline-none mb-4"
              ></textarea>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                   <button className="p-2 bg-gray-100 rounded-md text-gray-500 hover:bg-blue-100 hover:text-blue-600"><Phone size={16} /></button>
                   <button className="p-2 bg-gray-100 rounded-md text-gray-500 hover:bg-emerald-100 hover:text-emerald-600"><Mail size={16} /></button>
                   <button className="p-2 bg-gray-100 rounded-md text-gray-500 hover:bg-purple-100 hover:text-purple-600"><Video size={16} /></button>
                </div>
                <button className="bg-[#1E3A8A] text-white px-6 py-2 rounded-lg font-medium text-sm hover:bg-blue-800 transition-all">Salvar Nota</button>
              </div>
           </div>

           {/* Timeline */}
           <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex-1">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Clock size={18} className="text-blue-500" /> Histórico de Atividades
              </h3>
              
              <div className="relative pl-8 space-y-8 before:content-[''] before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
                {lead.history.length > 0 ? (
                  lead.history.slice().reverse().map((item) => (
                    <div key={item.id} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-10 top-1 w-6 h-6 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center z-10 shadow-sm">
                        <InteractionIcon type={item.type} />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <div className="flex items-center justify-between mb-2">
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.date}</span>
                           <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border text-gray-400">{item.type}</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-400 italic text-sm">Nenhuma interação registrada ainda.</p>
                  </div>
                )}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const InfoRow = ({ label, value, icon: Icon }: any) => (
  <div className="flex items-start gap-3">
    <div className="p-1.5 bg-gray-50 rounded text-gray-400 mt-0.5">
      <Icon size={14} />
    </div>
    <div>
      <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-700">{value}</p>
    </div>
  </div>
);

export default LeadDetail;
