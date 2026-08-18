import { auth } from "./auth.js";
import { supabase } from "../config/supabase.js";

export async function adminAuth(req, res, next) {
  auth(req, res, async () => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", req.user.id)
      .single();

    if (error || !data || data.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.profile = data;
    next();
  });
}
