
import React, { useState } from 'react';

type AdminTab = 'Overview' | 'Bookings' | 'Inventory' | 'Users' | 'Settings';

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Overview');

  const stats = [
    { label: 'Net Revenue', value: '£42,850', trend: '+14%', icon: '💳' },
    { label: 'Total Bookings', value: '1,284', trend: '+8%', icon: '📅' },
    { label: 'Active Users', value: '5,920', trend: '+22%', icon: '👥' },
    { label: 'Conversion Rate', value: '18.4%', trend: '+3%', icon: '📈' },
  ];

  const recentBookings = [
    { id: 'EB-7721', user: 'James T.', type: 'Flight', destination: 'Dubai', status: 'Confirmed', price: '£820' },
    { id: 'EB-7722', user: 'Sarah M.', type: 'Stay', destination: 'London', status: 'Pending', price: '£450' },
    { id: 'EB-7723', user: 'David O.', type: 'Car', destination: 'Lagos', status: 'Confirmed', price: '£55' },
    { id: 'EB-7724', user: 'Linda K.', type: 'Flight', destination: 'London', status: 'Cancelled', price: '£1,150' },
  ];

  return (
    <div className="bg-[#F8FAFC] min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-80 bg-[#002D5B] text-white flex flex-col sticky top-0 h-screen">
        <div className="p-10 flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1F93D0] rounded-xl flex items-center justify-center font-black text-xl">EB</div>
          <span className="font-extrabold text-lg tracking-tighter uppercase">Admin Core</span>
        </div>
        
        <nav className="flex-grow px-6 py-4 space-y-2">
          {(['Overview', 'Bookings', 'Inventory', 'Users', 'Settings'] as AdminTab[]).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab ? 'bg-[#1F93D0] text-white shadow-lg' : 'text-white/40 hover:bg-white/5 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="p-10 border-t border-white/10">
          <button 
            onClick={onLogout}
            className="w-full bg-red-500/10 text-red-400 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all"
          >
            System Logout
          </button>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="flex-grow p-12">
        <header className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-4xl font-black text-[#002D5B] uppercase tracking-tighter italic leading-none mb-2">{activeTab}</h1>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Master Management Console v2.0</p>
          </div>
          <div className="flex space-x-4">
             <button className="bg-white border border-slate-200 px-6 py-3 rounded-xl text-[10px] font-black uppercase text-slate-500 hover:bg-slate-50">Generate Report</button>
             <button className="bg-[#002D5B] text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase shadow-lg shadow-blue-900/20">Add New Product</button>
          </div>
        </header>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
              <div className="flex justify-between items-start mb-6">
                 <span className="text-2xl">{stat.icon}</span>
                 <span className="text-[10px] font-black text-green-500 bg-green-50 px-2 py-1 rounded-md">{stat.trend}</span>
              </div>
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-[#002D5B] tracking-tighter">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Data Table */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm overflow-hidden">
          <h3 className="text-xl font-black text-[#002D5B] uppercase tracking-tight mb-8">Recent Global Activity</h3>
          <table className="w-full text-left">
            <thead>
               <tr className="border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  <th className="pb-6">ID</th>
                  <th className="pb-6">Customer</th>
                  <th className="pb-6">Type</th>
                  <th className="pb-6">Status</th>
                  <th className="pb-6 text-right">Revenue</th>
               </tr>
            </thead>
            <tbody>
               {recentBookings.map((b, i) => (
                 <tr key={i} className="group border-b border-slate-50 last:border-none">
                    <td className="py-6 font-bold text-xs text-slate-400 uppercase">{b.id}</td>
                    <td className="py-6 font-black text-sm text-[#002D5B] uppercase">{b.user}</td>
                    <td className="py-6">
                       <span className="bg-slate-50 text-[10px] font-black uppercase px-3 py-1 rounded-lg text-slate-400">{b.type}</span>
                    </td>
                    <td className="py-6">
                       <span className={`text-[10px] font-black uppercase ${
                         b.status === 'Confirmed' ? 'text-green-500' : 
                         b.status === 'Cancelled' ? 'text-red-400' : 'text-slate-300'
                       }`}>{b.status}</span>
                    </td>
                    <td className="py-6 text-right font-black text-[#002D5B]">{b.price}</td>
                 </tr>
               ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
