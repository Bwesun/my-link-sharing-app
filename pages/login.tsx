import { useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login, user } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      router.push("/dashboard"); // Redirect to dashboard or another page after signup
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (user) {
    return <p>You are already logged in.</p>;
  }

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl mb-4">Log In</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
