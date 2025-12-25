
import React, { useState } from 'react';

type AdminTab = 'Bookings' | 'Live View' | 'Inventory' | 'Users';

interface BookingRecord {
  id: string;
  user: string;
  type: 'Flight' | 'Hotel' | 'Car';
  date: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  total: string;
}

interface InventoryItem {
  id: string;
  name: string;
  type: 'Stay' | 'Flight' | 'Car';
  stock: number;
  price: string;
  status: 'Active' | 'Low Stock' | 'Sold Out';
}

interface UserRecord {
  id: string;
  name: string;
  email: string;
  tier: 'Genius 2' | 'Genius 1' | 'Standard';
  status: 'Active' | 'Suspended';
}

interface LiveEvent {
  time: string;
  event: string;
  user: string;
  severity: 'info' | 'warning' | 'success';
}

const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('Bookings');
  const [filterType, setFilterType] = useState<string>('All');

  // Booking Management State
  const [bookings, setBookings] = useState<BookingRecord[]>([
    { id: 'EB-1001', user: 'James T.', type: 'Flight', date: 'Oct 24, 2024', status: 'Confirmed', total: 'NGN 120,000' },
    { id: 'EB-1002', user: 'Sarah M.', type: 'Hotel', date: 'Oct 25, 2024', status: 'Pending', total: 'NGN 45,000' },
    { id: 'EB-1003', user: 'David O.', type: 'Flight', date: 'Oct 24, 2024', status: 'Confirmed', total: 'NGN 850,000' },
    { id: 'EB-1004', user: 'Linda K.', type: 'Car', date: 'Oct 26, 2024', status: 'Cancelled', total: 'NGN 15,000' },
    { id: 'EB-1005', user: 'John B.', type: 'Hotel', date: 'Oct 28, 2024', status: 'Confirmed', total: 'NGN 120,000' },
    { id: 'EB-1006', user: 'Musa A.', type: 'Flight', date: 'Oct 30, 2024', status: 'Pending', total: 'NGN 210,000' },
  ]);

  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);
  const [isBookingEditMode, setIsBookingEditMode] = useState(false);
  const [isBookingViewModalOpen, setIsBookingViewModalOpen] = useState(false);

  // User Management State
  const [users, setUsers] = useState<UserRecord[]>([
    { id: 'USR-001', name: 'James Thompson', email: 'james@example.com', tier: 'Genius 2', status: 'Active' },
    { id: 'USR-002', name: 'Sarah Miller', email: 'sarah.m@travel.co', tier: 'Standard', status: 'Active' },
    { id: 'USR-003', name: 'David Okoro', email: 'dokoro@domain.ng', tier: 'Genius 1', status: 'Suspended' },
    { id: 'USR-004', name: 'Musa Abubakar', email: 'musa.abu@mail.com', tier: 'Standard', status: 'Active' },
  ]);

  const [selectedUser, setSelectedUser] = useState<UserRecord | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Inventory Management State
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 'INV-001', name: 'Lagos Intercontinental (King Room)', type: 'Stay', stock: 45, price: 'NGN 85,000', status: 'Active' },
    { id: 'INV-002', name: 'LOS to LHR (Economy Class)', type: 'Flight', stock: 12, price: 'NGN 980,000', status: 'Low Stock' },
    { id: 'INV-003', name: 'Toyota Corolla (Sedan)', type: 'Car', stock: 0, price: 'NGN 15,000', status: 'Sold Out' },
    { id: 'INV-004', name: 'Abuja Sheraton (Suites)', type: 'Stay', stock: 8, price: 'NGN 145,000', status: 'Active' },
  ]);

  const [selectedInventoryItem, setSelectedInventoryItem] = useState<InventoryItem | null>(null);
  const [isInventoryEditMode, setIsInventoryEditMode] = useState(false);
  const [isInventoryAddModalOpen, setIsInventoryAddModalOpen] = useState(false);
  const [newInventoryItem, setNewInventoryItem] = useState({
    name: '',
    type: 'Stay' as const,
    stock: 1,
    price: '',
    status: 'Active' as const
  });

  // Stats Data
  const stats = [
    { label: 'Total Revenue', value: 'NGN 45.2M', trend: '+12%' },
    { label: 'Active Bookings', value: '1,240', trend: '+5%' },
    { label: 'Pending Issues', value: '14', trend: '-2%' },
    { label: 'New Users (24h)', value: '86', trend: '+24%' },
  ];

  const liveEvents: LiveEvent[] = [
    { time: '14:20:05', event: 'New search: Lagos to London', user: 'Guest_422', severity: 'info' },
    { time: '14:18:22', event: 'Payment Success: EB-1001', user: 'James T.', severity: 'success' },
    { time: '14:15:10', event: 'Multiple failed logins detected', user: 'Unknown', severity: 'warning' },
    { time: '14:10:45', event: 'Account Registered', user: 'Sarah M.', severity: 'success' },
    { time: '14:05:30', event: 'Search: Abuja Hotels', user: 'Guest_109', severity: 'info' },
  ];

  const handleDownloadReport = () => {
    const headers = ['Reference', 'Customer', 'Product', 'Date', 'Status', 'Value'];
    const csvRows = bookings.map(b => [
      b.id,
      `"${b.user}"`,
      b.type,
      `"${b.date}"`,
      b.status,
      `"${b.total}"`
    ].join(','));

    const csvContent = [headers.join(','), ...csvRows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Ebony_Bruce_Bookings_Report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? selectedUser : u));
    setIsEditMode(false);
    setSelectedUser(null);
  };

  const handleRemoveUser = (id: string) => {
    if (window.confirm('PERMANENTLY DELETE USER?\nThis action cannot be undone.')) {
      setUsers(prev => prev.filter(u => u.id !== id));
    }
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('DELETE BOOKING RECORD?')) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleUpdateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBooking) return;
    setBookings(prev => prev.map(b => b.id === selectedBooking.id ? selectedBooking : b));
    setIsBookingEditMode(false);
    setSelectedBooking(null);
  };

  const handleUpdateInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInventoryItem) return;
    setInventory(prev => prev.map(item => item.id === selectedInventoryItem.id ? selectedInventoryItem : item));
    setIsInventoryEditMode(false);
    setSelectedInventoryItem(null);
  };

  const handleAddInventory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInventoryItem.name.trim() || !newInventoryItem.price.trim()) {
      alert("Please fill in both the Name and Price.");
      return;
    }
    const newId = `INV-${Date.now().toString().slice(-4)}`;
    const finalPrice = newInventoryItem.price.toUpperCase().startsWith('NGN') 
      ? newInventoryItem.price 
      : `NGN ${newInventoryItem.price}`;
      
    const itemToAdd: InventoryItem = {
      id: newId,
      name: newInventoryItem.name,
      type: newInventoryItem.type,
      stock: Number(newInventoryItem.stock) || 0,
      price: finalPrice,
      status: newInventoryItem.status
    };
    
    setInventory(prev => [...prev, itemToAdd]);
    setIsInventoryAddModalOpen(false);
    setNewInventoryItem({ name: '', type: 'Stay', stock: 1, price: '', status: 'Active' });
  };

  const handleRemoveInventory = (id: string) => {
    if (window.confirm('PERMANENTLY REMOVE FROM INVENTORY?\nThis item will no longer be bookable.')) {
      setInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const renderBookings = () => {
    const filteredBookings = filterType === 'All' 
      ? bookings 
      : bookings.filter(b => b.type === (filterType === 'Hotel' ? 'Hotel' : filterType));

    return (
      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-6 border-b-2 border-black flex flex-col md:flex-row justify-between items-center bg-gray-50 gap-4">
          <h2 className="font-black uppercase text-sm">Global Booking Feed</h2>
          <div className="flex space-x-2">
            {['All', 'Flight', 'Hotel', 'Car'].map((type) => (
              <button 
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-4 py-1.5 text-[10px] font-black uppercase border-2 border-black transition-all ${filterType === type ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Booking Modals */}
        {(isBookingEditMode || isBookingViewModalOpen) && selectedBooking && (
          <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white border-4 border-black p-8 w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-2xl font-black uppercase mb-6">{isBookingEditMode ? 'Edit Booking' : 'Booking Details'}</h3>
              <form onSubmit={handleUpdateBooking} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Reference ID</label>
                    <input disabled type="text" className="border-2 border-black p-2 text-sm font-bold bg-gray-200" value={selectedBooking.id} />
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Product Type</label>
                    <input disabled type="text" className="border-2 border-black p-2 text-sm font-bold bg-gray-200" value={selectedBooking.type} />
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Customer Name</label>
                  <input 
                    disabled={!isBookingEditMode}
                    type="text"
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 disabled:opacity-50"
                    value={selectedBooking.user}
                    onChange={(e) => setSelectedBooking({...selectedBooking, user: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Booking Status</label>
                    <select 
                      disabled={!isBookingEditMode}
                      className="border-2 border-black p-2 text-sm font-bold bg-gray-50 disabled:opacity-50"
                      value={selectedBooking.status}
                      onChange={(e) => setSelectedBooking({...selectedBooking, status: e.target.value as any})}
                    >
                      <option>Confirmed</option>
                      <option>Pending</option>
                      <option>Cancelled</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Total Value</label>
                    <input 
                      disabled={!isBookingEditMode}
                      type="text"
                      className="border-2 border-black p-2 text-sm font-bold bg-gray-50 disabled:opacity-50"
                      value={selectedBooking.total}
                      onChange={(e) => setSelectedBooking({...selectedBooking, total: e.target.value})}
                    />
                  </div>
                </div>
                
                {!isBookingEditMode && (
                  <div className="pt-4 border-t-2 border-black">
                     <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Transaction Date</p>
                     <p className="text-xs font-bold">{selectedBooking.date}</p>
                  </div>
                )}

                <div className="flex space-x-2 pt-6">
                  {isBookingEditMode ? (
                    <>
                      <button type="submit" className="flex-1 bg-black text-white py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Save Changes</button>
                      <button type="button" onClick={() => { setIsBookingEditMode(false); setSelectedBooking(null); }} className="flex-1 border-2 border-black py-3 text-xs font-black uppercase hover:bg-gray-100">Cancel</button>
                    </>
                  ) : (
                    <button type="button" onClick={() => { setIsBookingViewModalOpen(false); setSelectedBooking(null); }} className="w-full bg-black text-white py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Close Details</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b-2 border-black bg-gray-50 text-[10px] font-black uppercase text-gray-500">
                <th className="p-4">Reference</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
                <th className="p-4">Value</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-black text-xs uppercase">{booking.id}</td>
                  <td className="p-4 text-xs font-bold">{booking.user}</td>
                  <td className="p-4">
                    <span className="text-[10px] font-black uppercase border border-black px-2 py-0.5">
                      {booking.type}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-500 font-bold">{booking.date}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        booking.status === 'Confirmed' ? 'bg-black' : 
                        booking.status === 'Cancelled' ? 'bg-red-500' : 'bg-gray-400 animate-pulse'
                      }`}></div>
                      <span className="text-[10px] font-black uppercase">{booking.status}</span>
                    </div>
                  </td>
                  <td className="p-4 text-xs font-black">{booking.total}</td>
                  <td className="p-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => { setSelectedBooking({...booking}); setIsBookingViewModalOpen(true); }}
                        className="text-[9px] font-black uppercase border border-black px-2 py-1 hover:bg-gray-100"
                      >View</button>
                      <button 
                        onClick={() => { setSelectedBooking({...booking}); setIsBookingEditMode(true); }}
                        className="text-[9px] font-black uppercase border border-black px-2 py-1 hover:bg-gray-100"
                      >Edit</button>
                      <button 
                        onClick={() => handleDeleteBooking(booking.id)}
                        className="text-[9px] font-black uppercase border border-red-600 text-red-600 px-2 py-1 hover:bg-red-600 hover:text-white transition-colors"
                      >Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const renderLiveView = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-6">
        <h2 className="font-black uppercase text-sm mb-6 flex items-center">
          <span className="w-2 h-2 bg-red-600 rounded-full animate-ping mr-2"></span>
          Real-time System Logs
        </h2>
        <div className="space-y-4">
          {liveEvents.map((ev, i) => (
            <div key={i} className="flex items-center justify-between p-3 border-2 border-black bg-gray-50">
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-mono font-black text-gray-400">{ev.time}</span>
                <span className={`w-2 h-2 rounded-full ${
                  ev.severity === 'success' ? 'bg-black' : 
                  ev.severity === 'warning' ? 'bg-red-500' : 'bg-gray-300'
                }`}></span>
                <span className="text-xs font-bold">{ev.event}</span>
              </div>
              <span className="text-[10px] font-black uppercase text-gray-500">{ev.user}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black text-white p-6 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <h3 className="text-xs font-black uppercase mb-4 opacity-60">System Health</h3>
        <div className="space-y-6">
          {[
            { label: 'API Gateway', status: 'Optimal' },
            { label: 'Database Node', status: 'Healthy' },
            { label: 'CDN Sync', status: 'Delayed (3s)' },
            { label: 'Email Server', status: 'Optimal' },
          ].map((sys, i) => (
            <div key={i} className="flex justify-between items-center border-b border-white/20 pb-4 last:border-none">
              <span className="text-xs font-black uppercase">{sys.label}</span>
              <span className="text-[10px] font-black uppercase bg-white text-black px-2 py-0.5">{sys.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
      <div className="p-6 border-b-2 border-black flex justify-between items-center bg-gray-50">
        <h2 className="font-black uppercase text-sm">Product Inventory</h2>
        <button 
          onClick={() => setIsInventoryAddModalOpen(true)}
          className="bg-black text-white px-6 py-2 text-[10px] font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1"
        >
          + Add New Item
        </button>
      </div>

      {/* Inventory Add Modal */}
      {isInventoryAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-8 w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase mb-6">Add New Product</h3>
            <form onSubmit={handleAddInventory} className="space-y-4">
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Item Name</label>
                <input 
                  type="text"
                  required
                  className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                  placeholder="e.g. Lagos City Center Suites"
                  value={newInventoryItem.name}
                  onChange={(e) => setNewInventoryItem({...newInventoryItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Product Type</label>
                  <select 
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                    value={newInventoryItem.type}
                    onChange={(e) => setNewInventoryItem({...newInventoryItem, type: e.target.value as any})}
                  >
                    <option value="Stay">Stay (Hotel)</option>
                    <option value="Flight">Flight</option>
                    <option value="Car">Car Rental</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Status</label>
                  <select 
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                    value={newInventoryItem.status}
                    onChange={(e) => setNewInventoryItem({...newInventoryItem, status: e.target.value as any})}
                  >
                    <option value="Active">Active</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Initial Stock</label>
                  <input 
                    type="number"
                    required
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                    value={newInventoryItem.stock}
                    onChange={(e) => setNewInventoryItem({...newInventoryItem, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Price Label</label>
                  <input 
                    type="text"
                    required
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                    placeholder="e.g. 45,000"
                    value={newInventoryItem.price}
                    onChange={(e) => setNewInventoryItem({...newInventoryItem, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex space-x-2 pt-6">
                <button type="submit" className="flex-1 bg-black text-white py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Create Product</button>
                <button type="button" onClick={() => setIsInventoryAddModalOpen(false)} className="flex-1 border-2 border-black py-3 text-xs font-black uppercase hover:bg-gray-100 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inventory Edit Modal */}
      {isInventoryEditMode && selectedInventoryItem && (
        <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-8 w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase mb-6">Update Inventory</h3>
            <form onSubmit={handleUpdateInventory} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">SKU / ID</label>
                  <input disabled type="text" className="border-2 border-black p-2 text-sm font-bold bg-gray-200" value={selectedInventoryItem.id} />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Type</label>
                  <select 
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                    value={selectedInventoryItem.type}
                    onChange={(e) => setSelectedInventoryItem({...selectedInventoryItem, type: e.target.value as any})}
                  >
                    <option>Stay</option>
                    <option>Flight</option>
                    <option>Car</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Item Name</label>
                <input 
                  type="text"
                  className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                  value={selectedInventoryItem.name}
                  onChange={(e) => setSelectedInventoryItem({...selectedInventoryItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Stock Level</label>
                  <input 
                    type="number"
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                    value={selectedInventoryItem.stock}
                    onChange={(e) => setSelectedInventoryItem({...selectedInventoryItem, stock: parseInt(e.target.value) || 0})}
                  />
                </div>
                <div className="flex flex-col col-span-2">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Price Label</label>
                  <input 
                    type="text"
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                    value={selectedInventoryItem.price}
                    onChange={(e) => setSelectedInventoryItem({...selectedInventoryItem, price: e.target.value})}
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Stock Status</label>
                <select 
                  className="border-2 border-black p-2 text-sm font-bold bg-gray-50 outline-none focus:bg-white"
                  value={selectedInventoryItem.status}
                  onChange={(e) => setSelectedInventoryItem({...selectedInventoryItem, status: e.target.value as any})}
                >
                  <option>Active</option>
                  <option>Low Stock</option>
                  <option>Sold Out</option>
                </select>
              </div>

              <div className="flex space-x-2 pt-6">
                <button type="submit" className="flex-1 bg-black text-white py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Update Item</button>
                <button type="button" onClick={() => { setIsInventoryEditMode(false); setSelectedInventoryItem(null); }} className="flex-1 border-2 border-black py-3 text-xs font-black uppercase hover:bg-gray-100 transition-all">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-black bg-gray-50 text-[10px] font-black uppercase text-gray-500">
              <th className="p-4">SKU / ID</th>
              <th className="p-4">Item Name</th>
              <th className="p-4">Type</th>
              <th className="p-4">Price</th>
              <th className="p-4">In Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-[10px] font-mono font-black">{item.id}</td>
                <td className="p-4 text-xs font-bold">{item.name}</td>
                <td className="p-4 text-xs uppercase">{item.type}</td>
                <td className="p-4 text-xs font-black">{item.price}</td>
                <td className="p-4 text-xs font-bold">{item.stock}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 border-2 border-black ${
                    item.status === 'Low Stock' ? 'bg-yellow-100' : 
                    item.status === 'Sold Out' ? 'bg-red-50 text-red-600' : 'bg-gray-50'
                  }`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => { setSelectedInventoryItem({...item}); setIsInventoryEditMode(true); }}
                      className="text-[10px] font-black uppercase border border-black px-2 py-1 hover:bg-gray-100 transition-colors"
                    >Update</button>
                    <button 
                      onClick={() => handleRemoveInventory(item.id)}
                      className="text-[10px] font-black uppercase border border-red-600 text-red-600 px-2 py-1 hover:bg-red-600 hover:text-white transition-colors"
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative">
      <div className="p-6 border-b-2 border-black flex justify-between items-center bg-gray-50">
        <h2 className="font-black uppercase text-sm">User Directory</h2>
        <input type="text" placeholder="Search by email..." className="border-2 border-black px-4 py-1.5 text-[10px] font-black uppercase outline-none focus:bg-gray-100 w-48 shadow-inner" />
      </div>

      {/* User Modals */}
      {(isEditMode || isViewModalOpen) && selectedUser && (
        <div className="fixed inset-0 bg-black/40 z-[200] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white border-4 border-black p-8 w-full max-w-lg shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="text-2xl font-black uppercase mb-6">{isEditMode ? 'Edit User' : 'User Profile'}</h3>
            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Full Name</label>
                  <input 
                    disabled={!isEditMode}
                    type="text"
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 disabled:opacity-50 outline-none"
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({...selectedUser, name: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">User ID</label>
                  <input disabled type="text" className="border-2 border-black p-2 text-sm font-bold bg-gray-200 outline-none" value={selectedUser.id} />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Email Address</label>
                <input 
                  disabled={!isEditMode}
                  type="email"
                  className="border-2 border-black p-2 text-sm font-bold bg-gray-50 disabled:opacity-50 outline-none"
                  value={selectedUser.email}
                  onChange={(e) => setSelectedUser({...selectedUser, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Genius Tier</label>
                  <select 
                    disabled={!isEditMode}
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 disabled:opacity-50 outline-none"
                    value={selectedUser.tier}
                    onChange={(e) => setSelectedUser({...selectedUser, tier: e.target.value as any})}
                  >
                    <option>Standard</option>
                    <option>Genius 1</option>
                    <option>Genius 2</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-[10px] uppercase font-bold text-gray-500 mb-1">Status</label>
                  <select 
                    disabled={!isEditMode}
                    className="border-2 border-black p-2 text-sm font-bold bg-gray-50 disabled:opacity-50 outline-none"
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({...selectedUser, status: e.target.value as any})}
                  >
                    <option>Active</option>
                    <option>Suspended</option>
                  </select>
                </div>
              </div>
              
              {!isEditMode && (
                <div className="pt-4 border-t-2 border-black">
                   <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Member Since</p>
                   <p className="text-xs font-bold">January 12, 2024</p>
                </div>
              )}

              <div className="flex space-x-2 pt-6">
                {isEditMode ? (
                  <>
                    <button type="submit" className="flex-1 bg-black text-white py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Save Changes</button>
                    <button type="button" onClick={() => { setIsEditMode(false); setSelectedUser(null); }} className="flex-1 border-2 border-black py-3 text-xs font-black uppercase hover:bg-gray-100 transition-all">Cancel</button>
                  </>
                ) : (
                  <button type="button" onClick={() => { setIsViewModalOpen(false); setSelectedUser(null); }} className="w-full bg-black text-white py-3 text-xs font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">Close Profile</button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b-2 border-black bg-gray-50 text-[10px] font-black uppercase text-gray-500">
              <th className="p-4">User ID</th>
              <th className="p-4">Full Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Genius Tier</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="p-4 text-[10px] font-mono font-black">{user.id}</td>
                <td className="p-4 text-xs font-bold">{user.name}</td>
                <td className="p-4 text-xs text-gray-600">{user.email}</td>
                <td className="p-4">
                  <span className="text-[10px] font-black uppercase border border-black px-2 py-0.5">{user.tier}</span>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] font-black uppercase ${user.status === 'Suspended' ? 'text-red-600 line-through' : 'text-black'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end space-x-2">
                    <button 
                      onClick={() => { setSelectedUser({...user}); setIsViewModalOpen(true); }}
                      className="text-[10px] font-black uppercase border border-black px-2 py-1 hover:bg-gray-100 transition-colors"
                    >View</button>
                    <button 
                      onClick={() => { setSelectedUser({...user}); setIsEditMode(true); }}
                      className="text-[10px] font-black uppercase border border-black px-2 py-1 hover:bg-gray-100 transition-colors"
                    >Edit</button>
                    <button 
                      onClick={() => handleRemoveUser(user.id)}
                      className="text-[10px] font-black uppercase border border-red-600 text-red-600 px-2 py-1 hover:bg-red-600 hover:text-white transition-colors"
                    >Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Admin Sidebar/TopNav */}
      <nav className="bg-black text-white p-4 flex justify-between items-center sticky top-0 z-[100] border-b-2 border-white/20">
        <div className="flex items-center space-x-4">
          <div className="border-2 border-white px-2 py-0.5 font-black text-xs">ADMIN</div>
          <span className="font-black uppercase tracking-tighter text-sm cursor-pointer" onClick={() => window.location.reload()}>Ebony Bruce Control Center</span>
        </div>
        <div className="flex items-center space-x-6 text-[10px] font-black uppercase">
          {(['Bookings', 'Live View', 'Inventory', 'Users'] as AdminTab[]).map((tab) => (
            <span 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer transition-all ${activeTab === tab ? 'opacity-100 underline decoration-2 underline-offset-4' : 'opacity-50 hover:opacity-100'}`}
            >
              {tab}
            </span>
          ))}
          <button 
            onClick={onLogout}
            className="border border-white px-3 py-1 hover:bg-white hover:text-black transition-all"
          >Sign Out</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-4xl font-black uppercase">{activeTab}</h1>
            <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">
              {activeTab === 'Bookings' && 'Managing Global Transactions'}
              {activeTab === 'Live View' && 'Real-time Traffic and System Health'}
              {activeTab === 'Inventory' && 'Stock levels and Pricing Management'}
              {activeTab === 'Users' && 'Member Directory and Access Control'}
            </p>
          </div>
          {activeTab === 'Bookings' && (
            <div className="flex space-x-2">
              <button 
                onClick={handleDownloadReport}
                className="bg-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase hover:bg-black hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5"
              >
                Download Report
              </button>
              <button className="bg-black text-white border-2 border-black px-4 py-2 text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Manual Entry</button>
            </div>
          )}
        </div>

        {/* Stats Grid - Shared across most views */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 transition-colors">
              <p className="text-[10px] font-black uppercase text-gray-400 mb-2">{stat.label}</p>
              <div className="text-2xl font-black mb-1">{stat.value}</div>
              <p className={`text-[10px] font-black uppercase ${stat.trend.startsWith('+') ? 'text-black' : 'text-gray-400'}`}>
                {stat.trend} <span className="text-gray-300">vs last month</span>
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Content */}
        <div className="pb-16">
          {activeTab === 'Bookings' && renderBookings()}
          {activeTab === 'Live View' && renderLiveView()}
          {activeTab === 'Inventory' && renderInventory()}
          {activeTab === 'Users' && renderUsers()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
