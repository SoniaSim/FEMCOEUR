import { getPageBySlug } from '@/lib/dato-cms/fetchers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function JoinPage() {
  const page = await getPageBySlug('join');

  return (
    <div className="container py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Rejoindre l&apos;association</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Devenez membre de FEMCOEUR et participez à notre mission.
        </p>

        {page && (
          <div
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        )}

        <Card>
          <CardHeader>
            <CardTitle>Comment adhérer ?</CardTitle>
            <CardDescription>
              Pour rejoindre notre association, veuillez nous contacter via le formulaire de contact.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
