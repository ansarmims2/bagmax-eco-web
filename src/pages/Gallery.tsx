import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  aspectRatio: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      // Fetch image metadata from database
      const { data: imageData, error: dbError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) {
        console.error('Error fetching image metadata:', dbError);
        return;
      }

      if (imageData && imageData.length > 0) {
        // Get public URLs for each image
        const imagesWithUrls = await Promise.all(
          imageData.map(async (image) => {
            const { data } = supabase.storage
              .from('gallery')
              .getPublicUrl(image.file_path);

            // Calculate aspect ratio class based on stored data or default
            let aspectClass = 'aspect-square';
            if (image.file_name) {
              // You can enhance this logic based on your needs
              aspectClass = 'aspect-[4/3]'; // Default aspect ratio
            }

            return {
              id: image.id,
              url: data.publicUrl,
              alt: image.alt_text || image.file_name,
              aspectRatio: aspectClass
            };
          })
        );

        setGalleryImages(imagesWithUrls);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gradient mb-4">Our Gallery</h1>
          <p className="text-xl text-muted-foreground">Loading gallery images...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-4xl font-bold text-gradient mb-4">Our Gallery</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover our wide range of eco-friendly paper bags designed for various needs,
          from shopping to gift packaging.
        </p>
      </div>

      {galleryImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No images available in the gallery yet.</p>
        </div>
      ) : (
        <>
          {/* Masonry Grid Layout */}
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`break-inside-avoid bg-card rounded-lg overflow-hidden shadow-card card-hover cursor-pointer slide-up mb-6 ${image.aspectRatio}`}
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setSelectedImage(image.url)}
              >
                <div className="relative w-full">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-white text-sm">{image.alt}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal for image preview */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>
            <img
              src={selectedImage}
              alt="Gallery preview"
              className="max-w-full max-h-full object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;