import { PageHeader } from '@/components/page-header';
import { VerifyForm } from './verify-form';

export default function VerifyPage() {
  return (
    <div className='flex flex-col min-h-screen'>
      <PageHeader />
      <main className="flex flex-1 flex-col items-center p-4">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline">Verify a Certificate</h1>
            <p className="text-muted-foreground">
              Upload the document and enter the certificate ID to check its authenticity.
            </p>
          </div>
          <VerifyForm />
        </div>
      </main>
    </div>
  );
}
