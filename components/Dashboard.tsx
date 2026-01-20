
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  UserPlus, 
  CheckCircle,
  ArrowRight,
  ChevronRight,
  // Added missing Filter icon import
  Filter
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { FUNNEL_CHART_DATA } from '../mockData';
import { ViewType } from '../types';

interface DashboardProps {
  onAction: (view: ViewType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onAction }) => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Visão Geral</h2>
          <p className="text-slate-500">Bem-vindo ao LeadX. Aqui estão seus indicadores de hoje.</p>
        </div>
        <button 
          onClick={() => onAction('leads')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all w-fit"
        >
          <UserPlus size={18} /> Novo Lead
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total de Leads" 
          value="128" 
          change="+12%" 
          positive={true} 
          icon={Users} 
          color="blue"
        />
        <StatCard 
          title="Leads Novos" 
          value="34" 
          change="+5%" 
          positive={true} 
          icon={UserPlus} 
          color="indigo"
        />
        <StatCard 
          title="Taxa de Conversão" 
          value="9.3%" 
          change="-2%" 
          positive={false} 
          icon={TrendingUp} 
          color="emerald"
        />
        <StatCard 
          title="Convertidos" 
          value="12" 
          change="+3" 
          positive={true} 
          icon={CheckCircle} 
          color="green"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Funil de Vendas (Quantidade)</h3>
            <button onClick={() => onAction('funnel')} className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-1">
              Ver Funil <ChevronRight size={14} />
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={FUNNEL_CHART_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {FUNNEL_CHART_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-xs text-blue-700 leading-relaxed">
              <strong>Dica Didática:</strong> O funil de vendas mostra como os leads "esfriam" ou "aquecem" ao longo das etapas. O objetivo do CRM é mover o maior número possível para a etapa de <strong>Convertido</strong>.
            </p>
          </div>
        </div>

        {/* Quick Actions / Recent */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Origem dos Leads</h3>
          <div className="space-y-4">
             <SourceItem label="Instagram" value={45} total={128} color="bg-pink-500" />
             <SourceItem label="WhatsApp" value={62} total={128} color="bg-green-500" />
             <SourceItem label="Site Institucional" value={21} total={128} color="bg-blue-500" />
          </div>

          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-4">Atalhos</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => onAction('leads')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors">
                <Users className="mx-auto mb-2 text-blue-600" size={20} />
                <span className="text-xs font-medium text-gray-600">Ver Lista</span>
              </button>
              <button onClick={() => onAction('funnel')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-center transition-colors">
                <Filter className="mx-auto mb-2 text-blue-600" size={20} />
                <span className="text-xs font-medium text-gray-600">Ver Funil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, change, positive, icon: Icon, color }: any) => {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    indigo: 'bg-indigo-50 text-indigo-600',
    emerald: 'bg-emerald-50 text-emerald-600',
    green: 'bg-green-50 text-green-600',
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${colorMap[color] || colorMap.blue}`}>
          <Icon size={20} />
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {change}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
      <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
    </div>
  );
};

const SourceItem = ({ label, value, total, color }: any) => {
  const percentage = Math.round((value / total) * 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold">{value} ({percentage}%)</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div className={`${color} h-2 rounded-full`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

export default Dashboard;
