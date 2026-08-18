import { useState } from "react";
import { api } from "../../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      await api.sendSupportMessage(formData);
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="flex-grow w-full max-w-[1440px] mx-auto px-5 md:px-20 py-16 lg:py-24">
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
        <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-primary-container rounded-full blur-[150px]" />
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display-lg text-headline-lg-mobile md:text-headline-lg text-on-surface mb-4">
            Contact <span className="text-gradient-cyan">Support</span>
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Need help? Our technical support team is ready to assist you.
          </p>
        </div>

        {sent ? (
          <div className="glass-panel rounded-lg p-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary-container/10 rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container text-3xl">
                check_circle
              </span>
            </div>
            <h2 className="font-display-lg text-xl text-on-surface mb-2">
              Message Sent
            </h2>
            <p className="text-on-surface-variant font-body-md mb-6">
              We have received your message and will get back to you soon.
            </p>
            <button
              onClick={() => setSent(false)}
              className="bg-primary-container text-on-primary font-label-caps text-label-caps px-6 py-3 rounded uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 font-bold"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-8 space-y-6">
            {error && (
              <div className="bg-error-container/10 border border-error-container/30 rounded px-4 py-3 text-error font-body-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="font-label-caps text-on-surface mb-2 block">
                NAME
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label className="font-label-caps text-on-surface mb-2 block">
                EMAIL
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="font-label-caps text-on-surface mb-2 block">
                SUBJECT
              </label>
              <select
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface focus:border-primary-container focus:outline-none transition-colors"
                required
              >
                <option value="">Select a subject</option>
                <option value="order">Order Issue</option>
                <option value="return">Return / Exchange</option>
                <option value="warranty">Warranty Claim</option>
                <option value="technical">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="font-label-caps text-on-surface mb-2 block">
                MESSAGE
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows="5"
                className="w-full bg-surface-container border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface placeholder-outline focus:border-primary-container focus:outline-none transition-colors resize-none"
                placeholder="Describe your issue..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-primary-container text-[#050B10] font-label-caps text-label-caps py-4 rounded uppercase tracking-widest hover:shadow-[0px_0px_20px_rgba(0,242,255,0.4)] transition-all duration-300 font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {sending ? (
                "Sending..."
              ) : (
                <>
                  Send Transmission
                  <span className="material-symbols-outlined text-lg">send</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
