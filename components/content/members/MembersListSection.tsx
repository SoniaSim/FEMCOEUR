import { getMembers } from "@/lib/sanity/fetch";
import { toPlainText } from "@/lib/sanity/portable-text";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Users as UsersIcon, Award } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/social-icons";

export async function MembersListSection() {
  const members = await getMembers();

  if (members.length === 0) {
    return (
      <section className="py-section md:py-section-md bg-background">
        <div className="container">
          <Card className="p-12 text-center border-2 border-dashed max-w-2xl mx-auto">
            <UsersIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg text-muted-foreground">
              Aucun membre disponible pour le moment.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Notre réseau se construit progressivement.
            </p>
          </Card>
        </div>
      </section>
    );
  }

  // Séparer les membres avec rôle (bureau) et sans rôle
  const boardMembers = members.filter((m) => m.role);
  const regularMembers = members.filter((m) => !m.role);

  return (
    <section className="py-section md:py-section-md bg-background">
      <div className="container">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Bureau de l'association */}
          {boardMembers.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Bureau de l&apos;association
                </h2>
                <Badge variant="outline" className="ml-2">
                  {boardMembers.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {boardMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="p-6 md:p-8 border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="w-24 h-24 border-4 border-primary/20">
                        <AvatarImage
                          src={member.photo?.url}
                          alt={`${member.firstName} ${member.lastName}`}
                        />
                        <AvatarFallback className="text-xl bg-primary/10 text-primary">
                          {member.firstName[0]}
                          {member.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2 flex flex-col items-center">
                        <h3 className="text-lg md:text-xl font-bold text-foreground">
                          Dr. {member.firstName} {member.lastName}
                        </h3>
                        {member.role && (
                          <Badge className="bg-primary text-primary-foreground">
                            {member.role}
                          </Badge>
                        )}
                        <Badge variant="outline" className="block">
                          {member.specialty}
                        </Badge>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 grow">
                        {toPlainText(member.biography)}
                      </p>

                      {(member.linkedin || member.email) && (
                        <div className="flex gap-3 pt-4 border-t w-full justify-center">
                          {member.linkedin && (
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="hover:text-primary"
                            >
                              <Link
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LinkedInIcon className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                              </Link>
                            </Button>
                          )}
                          {member.email && (
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="hover:text-primary"
                            >
                              <Link href={`mailto:${member.email}`}>
                                <Mail className="w-5 h-5" />
                                <span className="sr-only">Email</span>
                              </Link>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Membres de l'association */}
          {regularMembers.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <UsersIcon className="w-6 h-6 text-primary" />
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                  Membres de l&apos;association
                </h2>
                <Badge variant="outline" className="ml-2">
                  {regularMembers.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {regularMembers.map((member) => (
                  <Card
                    key={member.id}
                    className="p-6 md:p-8 border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg flex flex-col"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <Avatar className="w-20 h-20 border-2 border-accent/20">
                        <AvatarImage
                          src={member.photo?.url}
                          alt={`${member.firstName} ${member.lastName}`}
                        />
                        <AvatarFallback className="text-lg bg-accent/10 text-accent-foreground">
                          {member.firstName[0]}
                          {member.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-foreground">
                          Dr. {member.firstName} {member.lastName}
                        </h3>
                        <Badge variant="outline">{member.specialty}</Badge>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 grow">
                        {toPlainText(member.biography)}
                      </p>

                      {(member.linkedin || member.email) && (
                        <div className="flex gap-3 pt-4 border-t w-full justify-center">
                          {member.linkedin && (
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="hover:text-primary"
                            >
                              <Link
                                href={member.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LinkedInIcon className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                              </Link>
                            </Button>
                          )}
                          {member.email && (
                            <Button
                              asChild
                              variant="ghost"
                              size="icon"
                              className="hover:text-primary"
                            >
                              <Link href={`mailto:${member.email}`}>
                                <Mail className="w-5 h-5" />
                                <span className="sr-only">Email</span>
                              </Link>
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
