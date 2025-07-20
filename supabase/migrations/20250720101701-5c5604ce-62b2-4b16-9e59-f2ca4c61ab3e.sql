-- Add RLS policies for gallery management
CREATE POLICY "Anyone can insert gallery images" 
ON public.gallery_images 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update gallery images" 
ON public.gallery_images 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete gallery images" 
ON public.gallery_images 
FOR DELETE 
USING (true);

-- Add storage policies for gallery bucket management
CREATE POLICY "Anyone can upload to gallery" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'gallery');

CREATE POLICY "Anyone can update gallery files" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'gallery');

CREATE POLICY "Anyone can delete gallery files" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'gallery');