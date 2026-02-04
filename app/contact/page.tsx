import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/ContactForm';

export default function ContactPage() {
  return (
    <div className="container py-16">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
        <p className="text-lg text-muted-foreground mb-12">
          N&apos;hésitez pas à nous contacter pour toute question ou demande d&apos;information.
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Formulaire de contact</CardTitle>
            <CardDescription>
              Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

