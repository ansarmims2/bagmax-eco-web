-- Create the bagmax user account
-- Note: This creates the user in auth.users which requires special handling
-- We'll need to use the Supabase auth API to create this user properly

-- Create a function to check if user is bagmax admin
CREATE OR REPLACE FUNCTION public.is_bagmax_admin(user_email text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT user_email = 'bagmax@bagmax.com';
$$;

-- Update gallery_images RLS policies to be permission-based
DROP POLICY IF EXISTS "Anyone can delete gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Anyone can insert gallery images" ON public.gallery_images;
DROP POLICY IF EXISTS "Anyone can update gallery images" ON public.gallery_images;

-- Create new permission-based policies
CREATE POLICY "Only bagmax can delete gallery images" 
ON public.gallery_images 
FOR DELETE 
TO authenticated
USING (public.is_bagmax_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Only bagmax can insert gallery images" 
ON public.gallery_images 
FOR INSERT 
TO authenticated
WITH CHECK (public.is_bagmax_admin(auth.jwt() ->> 'email'));

CREATE POLICY "Only bagmax can update gallery images" 
ON public.gallery_images 
FOR UPDATE 
TO authenticated
USING (public.is_bagmax_admin(auth.jwt() ->> 'email'));

-- Everyone can still view gallery images
-- (keeping the existing view policy)