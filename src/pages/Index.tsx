import { Link } from 'react-router-dom';
import { Recycle, Globe, Award, Truck, Users, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import heroImage from '@/assets/Website page n-04.jpg';

const Index = () => {
  const features = [
    {
      icon: <Recycle className="h-8 w-8 text-primary" />,
      title: "100% Eco-Friendly",
      description: "Made from recyclable materials, biodegradable and sustainable"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "Global Export",
      description: "Serving customers worldwide with premium quality paper bags"
    },
    {
      icon: <Award className="h-8 w-8 text-primary" />,
      title: "Quality Assured",
      description: "ISO certified manufacturing with strict quality control"
    },
    {
      icon: <Truck className="h-8 w-8 text-primary" />,
      title: "Fast Delivery",
      description: "Timely delivery to meet your business requirements"
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Custom Solutions",
      description: "Tailored designs and sizes for your specific needs"
    },
    {
      icon: <Leaf className="h-8 w-8 text-primary" />,
      title: "Sustainable",
      description: "Contributing to a greener planet with every bag"
    }
  ];

  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "50+", label: "Countries Served" },
    { number: "1M+", label: "Bags Produced" },
    { number: "99%", label: "Customer Satisfaction" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Welcome to <span className="text-gradient">Bagmax</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Leading manufacturer and exporter of premium eco-friendly paper bags. 
            Sustainable packaging solutions for a greener tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-hero">
              <Link to="/gallery">View Our Products</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-secondary">
              <Link to="/contact">Get Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-4xl font-bold text-gradient mb-4">About Bagmax</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a leading manufacturer and exporter of eco-friendly paper bags, committed to 
              providing sustainable packaging solutions that help businesses reduce their environmental impact 
              while maintaining quality and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center card-hover slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-background">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 fade-in">
          <h2 className="text-4xl font-bold text-gradient mb-4">Ready to Go Green?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of businesses worldwide who trust Bagmax for their sustainable packaging needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="btn-hero">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="btn-secondary">
              <Link to="/gallery">Browse Gallery</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
