import type { Metadata } from "next";

/**
 * Le back-office est tenu hors des moteurs de recherche par deux moyens, et il
 * en faut bien deux : `robots.txt` interdit l'exploration, cette balise interdit
 * l'indexation. Une page seulement interdite au crawl peut malgré tout être
 * indexée sur la foi de liens entrants — l'inverse n'est pas vrai.
 *
 * La déclaration est ici et non sur la page : `studio/[[...tool]]/page.tsx` est
 * un composant client, qui ne peut pas exporter `metadata`.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ height: "100vh" }}>{children}</div>;
}
