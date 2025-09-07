import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Common/Sidebar";
import Topbar from "../Common/Topbar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="flex-1 pt-2 pl-2 p-4 pr-2 overflow-y-auto">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}
