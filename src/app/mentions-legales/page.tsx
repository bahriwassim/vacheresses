"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MentionsLegalesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12">
            Mentions Légales
          </h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Informations légales</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  <strong>Nom de l'entreprise</strong> : Manoir de Vacheresses<br />
                  <strong>Forme juridique</strong> : [À compléter]<br />
                  <strong>Capital social</strong> : [À compléter]<br />
                  <strong>Siège social</strong> : Vacheresses, France<br />
                  <strong>SIRET</strong> : [À compléter]<br />
                  <strong>TVA intracommunautaire</strong> : [À compléter]
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Directeur de la publication</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  <strong>Nom</strong> : [À compléter]<br />
                  <strong>Email</strong> : contact@manoirdevacheresses.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Hébergeur du site</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Ce site est hébergé par :<br />
                  <strong>Vercel Inc.</strong><br />
                  340 S Lemon Ave #4133<br />
                  Walnut, CA 91789<br />
                  États-Unis
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Propriété intellectuelle</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.
                  Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
                </p>
                <p>
                  La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite
                  sauf autorisation expresse du directeur de la publication.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Protection des données personnelles</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Conformément à la loi « Informatique et Libertés » du 6 janvier 1978 modifiée et au Règlement Général sur la Protection des Données (RGPD),
                  vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
                </p>
                <p>
                  Pour exercer ce droit, veuillez nous contacter à : contact@manoirdevacheresses.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur et analyser le trafic.
                  Vous pouvez à tout moment gérer vos préférences en matière de cookies en cliquant sur le lien en bas de page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Limitation de responsabilité</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour,
                  mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
                </p>
                <p>
                  Le Manoir de Vacheresses ne pourra être tenu responsable de l'utilisation qui sera faite de ces informations et des dommages directs ou indirects pouvant en découler.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Liens hypertextes</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Les liens hypertextes mis en place dans le cadre du présent site internet en direction d'autres ressources présentes sur le réseau Internet ne sauraient engager la responsabilité du Manoir de Vacheresses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
