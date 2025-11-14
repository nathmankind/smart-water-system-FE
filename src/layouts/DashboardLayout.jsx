import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen w-full">
      {/* TODO: Add Dashboard Sidebar/Navbar here */}
      <div className="flex flex-col w-full">
        {/* TODO: Add Dashboard Header here */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
