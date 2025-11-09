-- Create contact_forms table for form submissions
CREATE TABLE IF NOT EXISTS public.contact_forms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  industry TEXT,
  company_size TEXT,
  urgency TEXT,
  services TEXT[],
  message TEXT,
  referral_source TEXT,
  kvkk_consent BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'completed', 'cancelled')),
  assigned_to UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contact_forms ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Public can insert (submit forms)
CREATE POLICY "Anyone can submit contact forms"
ON public.contact_forms
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins can view all forms
CREATE POLICY "Admins can view all contact forms"
ON public.contact_forms
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can update forms
CREATE POLICY "Admins can update contact forms"
ON public.contact_forms
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Admins can delete forms
CREATE POLICY "Admins can delete contact forms"
ON public.contact_forms
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_contact_forms_updated_at
BEFORE UPDATE ON public.contact_forms
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_contact_forms_status ON public.contact_forms(status);
CREATE INDEX idx_contact_forms_created_at ON public.contact_forms(created_at DESC);
CREATE INDEX idx_contact_forms_email ON public.contact_forms(email);

-- Enable realtime for contact_forms
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_forms;