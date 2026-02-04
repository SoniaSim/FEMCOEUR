import { getAllMembers } from '@/lib/dato-cms/fetchers';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Linkedin, Mail, Twitter } from 'lucide-react';

export default async function MembersPage() {
  const members = await getAllMembers();

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold mb-8">Nos Membres</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Découvrez les cardiologues femmes qui font partie de notre association.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <Card key={member.id}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={member.photo?.url}
                    alt={`${member.firstName} ${member.lastName}`}
                  />
                  <AvatarFallback>
                    {member.firstName[0]}
                    {member.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>
                    {member.firstName} {member.lastName}
                  </CardTitle>
                  {member.role && <CardDescription>{member.role}</CardDescription>}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Badge variant="secondary" className="mb-4">
                {member.specialty}
              </Badge>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {member.biography}
              </p>
              {member.socialLinks && (
                <div className="flex gap-2">
                  {member.socialLinks.linkedin && (
                    <Link
                      href={member.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Linkedin className="h-4 w-4" />
                    </Link>
                  )}
                  {member.socialLinks.twitter && (
                    <Link
                      href={member.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                  )}
                  {member.socialLinks.email && (
                    <Link
                      href={`mailto:${member.socialLinks.email}`}
                      className="text-muted-foreground hover:text-primary"
                    >
                      <Mail className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      {members.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun membre disponible pour le moment.</p>
        </div>
      )}
    </div>
  );
}

