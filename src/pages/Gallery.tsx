import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Placeholder images for paper bags
  const galleryImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
      alt: 'Brown paper bags collection',
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      alt: 'Eco-friendly shopping bags',
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1556909114-2e388c1d5c1a?w=400&h=300&fit=crop',
      alt: 'Sustainable packaging solutions',
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop',
      alt: 'Handcrafted paper bags',
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop',
      alt: 'Custom printed bags',
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      alt: 'Luxury paper bags',
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
      alt: 'Bulk paper bag manufacturing',
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop',
      alt: 'Export quality paper bags',
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1600798646742-d3705743cea4?w=400&h=300&fit=crop',
      alt: 'Colorful paper bag collection',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-4xl font-bold text-gradient mb-4">Our Gallery</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our wide range of eco-friendly paper bags designed for various needs,
          from shopping to gift packaging.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={`bg-card rounded-lg overflow-hidden shadow-card card-hover cursor-pointer slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedImage(image.url)}
          >
            <div className="aspect-w-4 aspect-h-3 relative">
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-card-foreground">{image.alt}</h3>
            </div>
          </div>
        ))}
      </div>

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