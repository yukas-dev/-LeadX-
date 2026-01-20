
import React from 'react';
import { HelpCircle, ArrowDown, Users, CheckCircle } from 'lucide-react';
import { LeadStatus } from '../types';
import { MOCK_LEADS } from '../mockData';

const FunnelView: React.FC = () => {
  const stages = Object.values(LeadStatus);
  
  const getLeadsInStage = (status: LeadStatus) => MOCK_LEADS.filter(l => l.status === status);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in zoom-in-95 duration-500">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Pipeline de Vendas</h2>
          <p className="text-slate-500">Visualize a jornada do cliente e a saúde do seu processo comercial.</p>
        </div>
        <div className="hidden md:flex items-center gap-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-blue-700">
           <HelpCircle size={18} />
           <span className="text-sm font-medium">Como ler o Funil?</span>
        </div>
      </div>

      {/* Visual Funnel Column Display */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {stages.map((stage, idx) => {
          const leads = getLeadsInStage(stage);
          const stageValue = leads.reduce((acc, curr) => acc + (curr.value || 0), 0);
          
          return (
            <div key={stage} className="flex flex-col gap-4">
              {/* Stage Header */}
              <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Etapa {idx + 1}</span>
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-1.5 py-0.5 rounded">
                    {leads.length} leads
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">{stage}</h3>
                <p className="text-xs text-gray-500 font-medium">
                  {stageValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                {/* Arrow indicator between columns on desktop */}
                {idx < stages.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <div className="bg-blue-500 p-1 rounded-full text-white shadow-md">
                      <ArrowDown className="-rotate-90" size={12} />
                    </div>
                  </div>
                )}
              </div>

              {/* Lead Cards in Stage (Visual Only) */}
              <div className="space-y-3 flex-1">
                {leads.map(lead => (
                  <div key={lead.id} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm text-xs hover:border-blue-300 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold truncate pr-2">{lead.name}</span>
                      <Users size={12} className="text-gray-300" />
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span>{(lead.value || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      <span className="bg-gray-50 px-1 rounded text-[9px]">{lead.origin}</span>
                    </div>
                  </div>
                ))}
                {leads.length === 0 && (
                   <div className="h-24 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center">
                     <span className="text-[10px] text-gray-400 uppercase font-medium">Vazio</span>
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Educational Summary Section */}
      <div className="mt-12 bg-[#1E3A8A] text-white p-8 rounded-2xl shadow-xl overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1">
             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
               <CheckCircle className="text-blue-400" /> O que aprendemos com o Funil?
             </h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-blue-300 font-bold text-sm mb-2 uppercase tracking-wide">Volume e Vazão</h4>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Identificamos onde estamos perdendo leads. Se muitos leads entram mas poucos avançam, o problema pode ser a qualificação.
                  </p>
                </div>
                <div>
                  <h4 className="text-blue-300 font-bold text-sm mb-2 uppercase tracking-wide">Previsão de Receita</h4>
                  <p className="text-sm text-blue-100 leading-relaxed">
                    Com base nos valores em cada etapa, a empresa consegue prever quanto irá faturar nos próximos meses.
                  </p>
                </div>
             </div>
           </div>
           <div className="shrink-0 bg-blue-800/50 p-6 rounded-xl border border-blue-700 text-center">
              <p className="text-sm text-blue-200 mb-1">Taxa Geral de Conversão</p>
              <h4 className="text-4xl font-black">9.3%</h4>
              <p className="text-xs text-blue-300 mt-2">Média da Indústria: 5-10%</p>
           </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full -ml-24 -mb-24 opacity-10"></div>
      </div>
    </div>
  );
};

export default FunnelView;
