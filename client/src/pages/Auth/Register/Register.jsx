import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { supabase } from "../../../services/supabase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [error, setError] = useState(null);
  const { register, loginWithGoogle, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await register(name, email, password);
      if (data?.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          name,
          email,
          phone: phone || null,
          address_line1: addressLine1 || null,
          address_line2: addressLine2 || null,
          city: city || null,
          postal_code: postalCode || null,
        });
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    }
  };

  return (
    <main className="flex-grow flex items-center justify-center min-h-[80vh] px-5">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[30%] right-[30%] w-[400px] h-[400px] bg-primary-container rounded-full blur-[150px]" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display-lg text-headline-lg text-primary inline-block mb-4">
            WTech
          </Link>
          <h1 className="font-headline-lg-mobile text-on-surface">Create Account</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-2">
            Join the WTech network
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-8 space-y-6">
          {error && (
            <div className="bg-error-container/20 border border-error/30 rounded px-4 py-3">
              <p className="font-body-md text-error text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="font-label-caps text-on-surface mb-2 block">NAME</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="font-label-caps text-on-surface mb-2 block">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="font-label-caps text-on-surface mb-2 block">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
              placeholder="Create password"
              required
            />
          </div>

          <div className="border-t border-outline-variant/30 pt-6">
            <p className="font-label-caps text-on-surface-variant mb-4 text-xs">
              OPTIONAL — SHIPPING INFO
            </p>
            <div className="space-y-4">
              <div>
                <label className="font-label-caps text-on-surface mb-2 block">PHONE</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="font-label-caps text-on-surface mb-2 block">ADDRESS</label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                  placeholder="Street address"
                />
              </div>
              <div>
                <label className="font-label-caps text-on-surface mb-2 block">ADDRESS LINE 2</label>
                <input
                  type="text"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                  placeholder="Apartment, suite, etc. (optional)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-on-surface mb-2 block">CITY</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-on-surface mb-2 block">POSTAL CODE</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-container text-[#050B10] font-label-caps text-label-caps py-4 rounded uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 font-bold disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-surface-container px-2 font-label-caps text-outline">
                OR
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
            Sign up with Google
          </button>

          <p className="text-center font-body-md text-on-surface-variant text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-primary-container hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
