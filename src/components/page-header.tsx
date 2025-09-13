import Link from 'next/link';
import { Logo } from '@/components/icons';
import { Button } from './ui/button';
import { Home } from 'lucide-react';

export function PageHeader() {
  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-foreground transition-opacity hover:opacity-80">
          <Logo className="h-6 w-6 text-primary" />
          <span className='hidden sm:inline'>Academia Authenticity Verifier</span>
        </Link>
        <Button asChild variant="outline">
          <Link href="/">
            <Home className="h-4 w-4 sm:mr-2" />
            <span className='hidden sm:inline'>Home</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
