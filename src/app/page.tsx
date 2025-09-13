import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldCheck, Building } from 'lucide-react';
import { Logo } from '@/components/icons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-4 sm:p-8">
      <div className="w-full max-w-4xl text-center">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Logo className="h-16 w-16 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
            Authenticity Validator for Academia
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A trusted platform for verifying academic credentials.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card className="flex flex-col text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Verify Certificate</CardTitle>
                  <CardDescription>For Employers & Individuals</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="mb-6 text-muted-foreground">
                Quickly and securely verify the authenticity of an academic certificate using the certificate ID and document.
              </p>
              <Button asChild size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/verify">Verify Now</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="flex flex-col text-left shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">Institutional Login</CardTitle>
                  <CardDescription>For Universities & Institutions</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-between">
              <p className="mb-6 text-muted-foreground">
                Access your institution's dashboard to manage certificates, issue new ones, and view verification history.
              </p>
              <Button asChild size="lg" className="w-full" variant="secondary">
                <Link href="/institution-login">Login</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
