ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin'));

CREATE OR REPLACE FUNCTION is_admin(uid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles WHERE id = uid AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admins can do everything on products"
  ON products FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can do everything on orders"
  ON orders FOR ALL
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins can do everything on order_items"
  ON order_items FOR ALL
  USING (is_admin(auth.uid()));
