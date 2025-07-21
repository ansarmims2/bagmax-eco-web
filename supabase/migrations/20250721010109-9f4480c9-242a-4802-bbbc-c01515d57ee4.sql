-- Create function to check if user is bagmax admin
CREATE OR REPLACE FUNCTION public.is_bagmax_admin(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
AS $$
  SELECT user_email = 'bagmax@bagmax.com';
$$;

-- Create the bagmax user with email and secure auth
-- Note: This will be created via Supabase auth, not direct insertion

-- Update RLS policies for gallery_images to allow only bagmax admin
DROP POLICY IF EXISTS "Only bagmax can insert gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Only bagmax can update gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Only bagmax can delete gallery images" ON public.gallery_images;

CREATE POLICY "Only bagmax can insert gallery images" 
ON public.gallery_images 
FOR INSERT 
WITH CHECK (is_bagmax_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Only bagmax can update gallery images" 
ON public.gallery_images 
FOR UPDATE 
USING (is_bagmax_admin((auth.jwt() ->> 'email'::text)));

CREATE POLICY "Only bagmax can delete gallery images" 
ON public.gallery_images 
FOR DELETE 
USING (is_bagmax_admin((auth.jwt() ->> 'email'::text)));