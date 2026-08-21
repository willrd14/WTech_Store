import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle, loading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <main className="flex-grow flex items-center justify-center min-h-[80vh] px-5">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[30%] left-[30%] w-[400px] h-[400px] bg-primary-container rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display-lg text-headline-lg text-primary inline-block mb-4">
            WTech
          </Link>
          <h1 className="font-headline-lg-mobile text-on-surface">Bienvenido</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-2">
            Accede a tu terminal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-8 space-y-6">
          <div>
            <label className="font-label-caps text-on-surface mb-2 block">CORREO</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div>
            <label className="font-label-caps text-on-surface mb-2 block">CONTRASEÑA</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-container text-[#050B10] font-label-caps text-label-caps py-4 rounded uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 font-bold disabled:opacity-50"
          >
            {loading ? "Autenticando..." : "Iniciar Sesion"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-container px-2 font-label-caps text-outline">
                O
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={loginWithGoogle}
            disabled={loading}
            className="w-full bg-surface-container border border-outline-variant text-on-surface font-label-caps text-label-caps py-4 rounded uppercase hover:border-primary-container hover:text-primary-container transition-all duration-300 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            Iniciar sesion con Google
          </button>

          <p className="text-center font-body-md text-on-surface-variant text-sm mt-4">
            ¿No tienes cuenta?{" "}
            <Link to="/register" className="text-primary-container hover:underline">
              Crea una
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
