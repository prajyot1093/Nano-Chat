import { Link } from "react-router-dom";
import { useAuth } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuth();

 return (
  <header className="sticky top-0 z-50 border-b border-base-300/40 bg-base-100/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-base-100/60">
    <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
      {/* Logo */}
      <Link
        to="/"
        className="group flex items-center gap-3 transition-all duration-300"
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-primary-content shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl">
          <MessageSquare className="h-5 w-5" />
        </div>

        <div className="hidden sm:block">
          <h1 className="text-xl font-extrabold tracking-tight">
            Nano<span className="text-primary">Chat</span>
          </h1>
          <p className="text-xs text-base-content/60">
            Connecting humans and memes 🫶
          </p>
        <p className="text-xs text-base-content/60"> ~ Developed by Prajyot</p>
        </div>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <Link
          to="/settings"
          className="btn btn-ghost btn-circle hover:bg-primary/10"
        >
          <Settings className="h-5 w-5" />
        </Link>

        {authUser && (
          <>
            <Link
              to="/profile"
              className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-base-200"
            >
              <div className="avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  <img
                    src={authUser.profilePic || "/avatar.png"}
                    alt="Profile"
                  />
                </div>
              </div>

              <div className="hidden md:block text-left">
                <p className="font-semibold leading-none">
                  {authUser.fullName}
                </p>
                <p className="text-xs text-base-content/60">
                  Online
                </p>
              </div>
            </Link>

            <button
              onClick={logout}
              className="btn btn-primary rounded-xl px-4 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </>
        )}
      </div>
    </div>
  </header>
);
};
export default Navbar;