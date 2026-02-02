import { LogOut, Search, Bell, Menu } from "lucide-react";

function Navbar() {
  function logout() {
    localStorage.removeItem("user");
    window.location.href = "/login";
  }

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700 lg:hidden">
            <Menu size={24} />
        </button>
        
        {/* Search Bar - Visual Only */}
        <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="Search patients..." 
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all w-64"
            />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative cursor-pointer text-gray-500 hover:text-blue-600 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </div>

        <div className="h-8 w-px bg-gray-200 hidden md:block"></div>
        
        <div className="flex items-center gap-3">
             <div className="text-right hidden md:block leading-tight">
                <p className="text-sm font-semibold text-gray-800">Dr. Sarah Smith</p>
                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Chief Resident</p>
            </div>
            
            <button
                onClick={logout}
                className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition-all"
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
