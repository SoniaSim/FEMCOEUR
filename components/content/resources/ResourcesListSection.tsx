import { getAllResources } from "@/lib/dato-cms/fetchers";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Link as LinkIcon,
  Video,
  Download,
  ExternalLink,
  FolderOpen,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import { groupBy } from "lodash";

export async function ResourcesListSection() {
  const resources = await getAllResources();
  const resourcesByCategory = groupBy(resources, "category");

  const getIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return FileText;
      case "link":
        return LinkIcon;
      case "video":
        return Video;
      default:
        return FileText;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "pdf":
        return "PDF";
      case "link":
        return "Lien";
      case "video":
        return "Vidéo";
      default:
        return type.toUpperCase();
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "pdf":
        return "bg-primary/10 text-primary border-primary/20";
      case "link":
        return "bg-accent/10 text-accent-foreground border-accent/20";
      case "video":
        return "bg-secondary/10 text-secondary border-secondary/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  if (resources.length === 0) {
    return (
      <section className="py-section md:py-section-md bg-background">
        <div className="container">
          <Card className="p-12 text-center border-2 border-dashed max-w-2xl mx-auto">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Aucune ressource disponible pour le moment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Nous travaillons activement à enrichir notre bibliothèque de
              ressources.
            </p>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-7xl mx-auto space-y-16">
          {Object.entries(resourcesByCategory).map(
            ([category, categoryResources]) => (
              <div key={category}>
                <div className="flex items-center gap-3 mb-8">
                  <FolderOpen className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    {category}
                  </h2>
                  <Badge variant="outline" className="ml-2">
                    {categoryResources.length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryResources.map((resource) => {
                    const Icon = getIcon(resource.type);
                    return (
                      <Card
                        key={resource.id}
                        className="p-6 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col"
                      >
                        <div className="flex items-start justify-between gap-3 mb-4">
                          <div
                            className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${getTypeColor(
                              resource.type
                            )}`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <Badge
                            variant="outline"
                            className={getTypeColor(resource.type)}
                          >
                            {getTypeLabel(resource.type)}
                          </Badge>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2">
                          {resource.title}
                        </h3>

                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3 grow">
                          {resource.description}
                        </p>

                        <div className="mt-auto">
                          {resource.type === "pdf" && resource.file && (
                            <Button asChild size="sm" className="w-full gap-2">
                              <Link
                                href={resource.file.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="w-4 h-4" />
                                Télécharger
                              </Link>
                            </Button>
                          )}
                          {resource.type === "link" && resource.link && (
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="w-full gap-2"
                            >
                              <Link
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="w-4 h-4" />
                                Ouvrir le lien
                              </Link>
                            </Button>
                          )}
                          {resource.type === "video" && resource.link && (
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="w-full gap-2"
                            >
                              <Link
                                href={resource.link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Video className="w-4 h-4" />
                                Voir la vidéo
                              </Link>
                            </Button>
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
