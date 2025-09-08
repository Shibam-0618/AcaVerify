'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { handleVerification } from './actions';
import type { SimulateVerificationOutput } from '@/ai/flows/simulate-verification-results';
import { Loader2, CheckCircle2, XCircle, Upload } from 'lucide-react';

const formSchema = z.object({
  certificateId: z.string().min(1, 'Certificate ID is required'),
  document: z.custom<FileList>().refine(files => files?.length > 0, 'A document is required'),
});

type FormValues = z.infer<typeof formSchema>;

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
    reader.readAsDataURL(file);
  });
}

export function VerifyForm() {
  const [result, setResult] = useState<SimulateVerificationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true);
    setResult(null);

    try {
      const file = data.document[0];
      const documentDataUri = await fileToDataUri(file);

      const response = await handleVerification({
        certificateId: data.certificateId,
        documentDataUri,
      });

      setResult(response);
    } catch (error) {
      console.error(error);
      setResult({
        isValid: false,
        reason: 'Failed to process the document. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    } else {
      setFileName('');
    }
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setIsLoading(false);
    setFileName('');
  };

  const documentFile = watch('document');
  React.useEffect(() => {
    if (documentFile && documentFile.length > 0) {
      setFileName(documentFile[0].name);
    } else {
      setFileName('');
    }
  }, [documentFile]);


  return (
    <div>
      <Card className="shadow-lg">
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="certificateId">Certificate ID / Roll Number</Label>
              <Input
                id="certificateId"
                placeholder="e.g., A1B2C3D4E5"
                {...register('certificateId')}
                disabled={isLoading}
              />
              {errors.certificateId && (
                <p className="text-sm text-destructive">{errors.certificateId.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="document">Document Upload</Label>
              <div className="relative">
                 <Input
                    id="document"
                    type="file"
                    className="hidden"
                    {...register('document')}
                    accept=".pdf,.png,.jpg,.jpeg"
                    disabled={isLoading}
                />
                <Label htmlFor="document" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer transition-colors hover:bg-accent/50">
                    <span className="text-muted-foreground truncate pr-2">{fileName || "Choose a file..."}</span>
                    <Upload className="h-4 w-4 shrink-0" />
                </Label>
              </div>
              {errors.document && (
                <p className="text-sm text-destructive">{errors.document.message as string}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Verifying...
                    </>
                    ) : (
                    'Verify'
                    )}
                </Button>
                { (result || isLoading) && <Button type="button" variant="outline" onClick={handleReset} disabled={isLoading}>Verify Another</Button> }
            </div>
          </form>
        </CardContent>
      </Card>
      
      <div id="results-container" className="mt-8">
        {isLoading && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed p-8 text-center animate-pulse">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="text-muted-foreground">Verifying document, please wait...</p>
          </div>
        )}

        {result && (
          <Alert variant={result.isValid ? 'default' : 'destructive'} className="transition-all duration-300 ease-in-out">
            {result.isValid ? (
              <CheckCircle2 className="h-4 w-4 text-[hsl(var(--chart-2))]" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <AlertTitle className="font-bold">
              Verification Result: {result.isValid ? 'Valid' : 'Potentially Invalid'}
            </AlertTitle>
            <AlertDescription>
              {result.reason}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
}
