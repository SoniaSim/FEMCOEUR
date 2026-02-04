import { getAllResources } from '@/lib/dato-cms/fetchers';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, Video, Download } from 'lucide-react';
import Link from 'next/link';
import { groupBy } from 'lodash';

export default async function ResourcesPage() {
  const resources = await getAllResources();
  const resourcesByCategory = groupBy(resources, 'category');

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Ressources</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Accédez à nos ressources documentaires, guides et outils.
      </p>

      {Object.entries(resourcesByCategory).map(([category, categoryResources]) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryResources.map((resource) => (
              <Card key={resource.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {getIcon(resource.type)}
                    <Badge variant="outline">{resource.type.toUpperCase()}</Badge>
                  </div>
                  <CardTitle className="line-clamp-2">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {resource.description}
                  </p>
                  {resource.type === 'pdf' && resource.file && (
                    <Button asChild size="sm" className="w-full">
                      <Link href={resource.file.url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-4 w-4 mr-2" />
                        Télécharger
                      </Link>
                    </Button>
                  )}
                  {resource.type === 'link' && resource.link && (
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Ouvrir le lien
                      </Link>
                    </Button>
                  )}
                  {resource.type === 'video' && resource.link && (
                    <Button asChild size="sm" variant="outline" className="w-full">
                      <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                        <Video className="h-4 w-4 mr-2" />
                        Voir la vidéo
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}

      {resources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucune ressource disponible pour le moment.</p>
        </div>
      )}
    </div>
  );
}
