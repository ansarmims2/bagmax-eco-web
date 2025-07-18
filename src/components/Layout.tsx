import { ReactNode } from 'react';
import Navigation from './Navigation';
import WhatsAppFloat from './WhatsAppFloat';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>{children}</main>
      <WhatsAppFloat />
    </div>
  );
};

export default Layout;