import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Sidebar - Fixed Width */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
