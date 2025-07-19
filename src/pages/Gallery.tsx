import { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState([
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=350&h=250&fit=crop',
      alt: 'Brown paper bags collection',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=350&h=400&fit=crop',
      alt: 'Eco-friendly shopping bags',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1556909114-2e388c1d5c1a?w=350&h=300&fit=crop',
      alt: 'Sustainable packaging solutions',
      aspectRatio: 'aspect-square'
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=350&h=500&fit=crop',
      alt: 'Handcrafted paper bags',
      aspectRatio: 'aspect-[3/5]'
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=350&h=280&fit=crop',
      alt: 'Custom printed bags',
      aspectRatio: 'aspect-[5/4]'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=350&h=350&fit=crop',
      alt: 'Luxury paper bags',
      aspectRatio: 'aspect-square'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=350&h=450&fit=crop',
      alt: 'Bulk paper bag manufacturing',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=350&h=200&fit=crop',
      alt: 'Export quality paper bags',
      aspectRatio: 'aspect-[16/9]'
    },
    {
      id: 9,
      url: 'https://images.unsplash.com/photo-1600798646742-d3705743cea4?w=350&h=320&fit=crop',
      alt: 'Colorful paper bag collection',
      aspectRatio: 'aspect-[11/10]'
    },
    {
      id: 10,
      url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=350&h=480&fit=crop',
      alt: 'Premium packaging solutions',
      aspectRatio: 'aspect-[3/4]'
    },
    {
      id: 11,
      url: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=350&h=250&fit=crop',
      alt: 'Eco-conscious paper bags',
      aspectRatio: 'aspect-[4/3]'
    },
    {
      id: 12,
      url: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=350&h=600&fit=crop',
      alt: 'Custom branded bags',
      aspectRatio: 'aspect-[7/12]'
    }
  ]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const img = new Image();
          img.onload = () => {
            const aspectRatio = img.width / img.height;
            let aspectClass = 'aspect-square';
            
            if (aspectRatio > 1.5) aspectClass = 'aspect-[16/9]';
            else if (aspectRatio > 1.2) aspectClass = 'aspect-[4/3]';
            else if (aspectRatio > 0.9) aspectClass = 'aspect-square';
            else if (aspectRatio > 0.7) aspectClass = 'aspect-[3/4]';
            else aspectClass = 'aspect-[3/5]';

            const newImage = {
              id: Date.now() + Math.random(),
              url: result,
              alt: file.name,
              aspectRatio: aspectClass
            };
            setGalleryImages(prev => [...prev, newImage]);
          };
          img.src = result;
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12 fade-in">
        <h1 className="text-4xl font-bold text-gradient mb-4">Our Gallery</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Discover our wide range of eco-friendly paper bags designed for various needs,
          from shopping to gift packaging.
        </p>
        
        {/* Upload Button */}
        <div className="mb-8">
          <input
            type="file"
            id="image-upload"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <Button
            onClick={() => document.getElementById('image-upload')?.click()}
            className="btn-hero"
          >
            <Upload className="mr-2 h-5 w-5" />
            Upload Images
          </Button>
        </div>
      </div>

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
        
        {/* Add More Button */}
        <div className="break-inside-avoid mb-6">
          <div
            onClick={() => document.getElementById('image-upload')?.click()}
            className="bg-muted/50 border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:bg-muted/70 transition-colors card-hover aspect-square flex flex-col items-center justify-center"
          >
            <Plus className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground font-medium">Add More Images</p>
          </div>
        </div>
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