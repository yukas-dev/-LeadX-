
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Filter, 
  Settings, 
  LogOut, 
  Bell, 
  Search, 
  Menu,
  HelpCircle
} from 'lucide-react';
import { ViewType, Lead } from './types';
import Dashboard from './components/Dashboard';
import LeadsList from './components/LeadsList';
import FunnelView from './components/FunnelView';
import LeadDetail from './components/LeadDetail';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const navigateTo = (view: ViewType, lead?: Lead) => {
    setCurrentView(view);
    if (lead) setSelectedLead(lead);
    else if (view !== 'detail') setSelectedLead(null);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onAction={(view) => navigateTo(view)} />;
      case 'leads':
        return <LeadsList onSelectLead={(lead) => navigateTo('detail', lead)} />;
      case 'funnel':
        return <FunnelView />;
      case 'detail':
        return selectedLead ? (
          <LeadDetail lead={selectedLead} onBack={() => navigateTo('leads')} />
        ) : (
          <div className="p-8 text-center text-gray-500">Selecione um lead na lista.</div>
        );
      default:
        return <Dashboard onAction={(view) => navigateTo(view)} />;
    }
  };

  const NavItem = ({ id, icon: Icon, label }: { id: ViewType; icon: any; label: string }) => (
    <button
      onClick={() => navigateTo(id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
        currentView === id 
        ? 'bg-blue-700 text-white shadow-md' 
        : 'text-blue-100 hover:bg-blue-800'
      }`}
    >
      <Icon size={20} />
      <span className={`${!isSidebarOpen && 'hidden'} md:block font-medium`}>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside 
        className={`${
          isSidebarOpen ? 'w-64' : 'w-20'
        } bg-[#1E3A8A] transition-all duration-300 flex flex-col hidden md:flex`}
      >
        <div className="p-6 flex items-center justify-between">
          <h1 className={`text-white text-2xl font-bold tracking-tight ${!isSidebarOpen && 'hidden'}`}>
            Lead<span className="text-blue-400">X</span>
          </h1>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-blue-200 hover:text-white">
            <Menu size={24} />
          </button>
        </div>

        <nav className="flex-1 px-4 mt-6 space-y-2">
          <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
          <NavItem id="leads" icon={Users} label="Gestão de Leads" />
          <NavItem id="funnel" icon={Filter} label="Funil de Vendas" />
          
          <div className="pt-8 pb-4">
            <p className={`text-xs uppercase font-bold text-blue-300 px-4 mb-2 tracking-wider ${!isSidebarOpen && 'hidden'}`}>
              Configuração
            </p>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-blue-100 hover:bg-blue-800">
              <Settings size={20} />
              <span className={`${!isSidebarOpen && 'hidden'} md:block`}>Ajustes</span>
            </button>
          </div>
        </nav>

        <div className="p-4 mt-auto">
          <div className={`mb-4 p-3 bg-blue-800 rounded-lg ${!isSidebarOpen && 'hidden'}`}>
            <p className="text-xs text-blue-200">Acesso Educacional</p>
            <p className="text-sm font-semibold text-white">Prof. Convidado</p>
          </div>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-200 hover:bg-red-900/40">
            <LogOut size={20} />
            <span className={`${!isSidebarOpen && 'hidden'} md:block`}>Sair</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
             <div className="relative w-full max-w-md hidden md:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
               <input 
                type="text" 
                placeholder="Buscar lead ou empresa..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-blue-500 outline-none text-sm"
               />
             </div>
             {/* Mobile Logo */}
             <h1 className="text-[#1E3A8A] text-xl font-bold md:hidden">LeadX</h1>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 border-l pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium">Demonstração</p>
                <p className="text-xs text-gray-400">Administrador</p>
              </div>
              <div className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                D
              </div>
            </div>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
           {renderContent()}
        </div>

        {/* Footer Concept Note */}
        <footer className="h-10 bg-white border-t border-gray-200 flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-widest px-4 shrink-0">
          <HelpCircle size={12} className="mr-2" /> LeadX - Protótipo Conceitual para Fins Educacionais
        </footer>
      </main>
    </div>
  );
};

export default App;
