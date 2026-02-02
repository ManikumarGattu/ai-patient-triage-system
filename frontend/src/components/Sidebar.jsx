import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  UserPlus,
  ListOrdered,
  Activity,
  Settings,
  HelpCircle
} from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const displayName = user
    ? user.email.split("@")[0].charAt(0).toUpperCase() +
      user.email.split("@")[0].slice(1)
    : "";

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/register", label: "Register Patient", icon: <UserPlus size={20} /> },
    { path: "/triage", label: "Triage Queue", icon: <ListOrdered size={20} /> },
  ];

  const bottomItems = [
    { path: "#", label: "Settings", icon: <Settings size={20} /> },
    { path: "#", label: "Help & Support", icon: <HelpCircle size={20} /> },
  ];

  return (
    <div className="w-64 bg-slate-900 text-slate-300 h-screen flex flex-col shadow-xl border-r border-slate-800">
      
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-xl font-bold flex items-center gap-2 text-white tracking-wide">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Activity size={20} className="text-white" />
          </div>
          MedTriage AI
        </h2>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          Menu
        </p>
        <NavLinks items={menuItems} location={location} />

        <div className="pt-6 mt-6 border-t border-slate-800">
          <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            System
          </p>
          <NavLinks items={bottomItems} location={location} />
        </div>
      </div>

      {/* Account Footer */}
      {user && (
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">
              {displayName.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-medium text-white">
                {displayName}
              </p>
              <p className="text-xs text-slate-500 uppercase">
                {user.role} Account
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function NavLinks({ items, location }) {
  return (
    <>
      {items.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              isActive
                ? "bg-blue-600/10 text-blue-400 border-l-4 border-blue-500"
                : "hover:bg-slate-800 hover:text-white border-l-4 border-transparent"
            }`}
          >
            <span
              className={
                isActive
                  ? "text-blue-400"
                  : "text-slate-500 group-hover:text-white transition-colors"
              }
            >
              {item.icon}
            </span>
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}

export default Sidebar;
