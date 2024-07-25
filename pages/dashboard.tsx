import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";
import Home from './index';
import AddLink from "./add-link";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!user) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl mb-4">Welcome, {user.email}</h2>
      <Home />
      <AddLink />
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;
