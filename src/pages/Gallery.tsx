import { useState, useEffect } from 'react';
import { X, Trash2, Edit2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import paperBagImage from '@/assets/Paper bag.png';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  aspectRatio: string;
  fileName: string;
  filePath: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const { data: imageData, error: dbError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('created_at', { ascending: false });

      if (dbError) {
        console.error('Error fetching image metadata:', dbError);
        return;
      }

      if (imageData && imageData.length > 0) {
        const imagesWithUrls = await Promise.all(
          imageData.map(async (image) => {
            const { data } = supabase.storage
              .from('gallery')
              .getPublicUrl(image.file_path);

            return {
              id: image.id,
              url: data.publicUrl,
              alt: image.alt_text || image.file_name,
              aspectRatio: 'aspect-[4/3]',
              fileName: image.file_name,
              filePath: image.file_path
            };
          })
        );

        setGalleryImages(imagesWithUrls);
      } else {
        setGalleryImages([]);
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteImage = async (image: GalleryImage) => {
    try {
      const { error: storageError } = await supabase.storage
        .from('gallery')
        .remove([image.filePath]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', image.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image deleted successfully!",
      });

      fetchGalleryImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast({
        title: "Error",
        description: "Failed to delete image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleRenameImage = async (image: GalleryImage) => {
    if (!newName.trim()) return;

    try {
      const fileExt = image.fileName.split('.').pop();
      const updatedFileName = `${newName}.${fileExt}`;

      const { error: dbError } = await supabase
        .from('gallery_images')
        .update({
          file_name: updatedFileName,
          alt_text: newName
        })
        .eq('id', image.id);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image renamed successfully!",
      });

      setEditingId(null);
      setNewName('');
      fetchGalleryImages();
    } catch (error) {
      console.error('Error renaming image:', error);
      toast({
        title: "Error",
        description: "Failed to rename image. Please try again.",
        variant: "destructive"
      });
    }
  };

  const startEditing = (image: GalleryImage) => {
    setEditingId(image.id);
    setNewName(image.fileName.split('.')[0]);
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
          <p className="text-lg text-muted-foreground mb-4">No images available in the gallery yet.</p>
          <div className="flex justify-center">
            <img
              src={paperBagImage}
              alt="Paper Bag"
              className="w-[300px] h-auto rounded-lg shadow-md"
            />
          </div>
        </div>
      ) : (
        <>
          <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`break-inside-avoid bg-card rounded-lg overflow-hidden shadow-card hover:shadow-lg transition-shadow duration-300 slide-up mb-6 ${image.aspectRatio}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative w-full">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => setSelectedImage(image.url)}
                  />

                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="icon"
                      className="h-8 w-8 bg-white/90 hover:bg-white"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEditing(image);
                      }}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteImage(image);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    {editingId === image.id ? (
                      <div className="flex gap-2 items-center">
                        <Input
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          className="text-sm h-8 bg-white/90"
                          placeholder="Enter new name"
                        />
                        <Button
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRenameImage(image)}
                        >
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => {
                            setEditingId(null);
                            setNewName('');
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <h3 className="font-semibold text-white text-sm truncate">
                        {image.alt}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

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
