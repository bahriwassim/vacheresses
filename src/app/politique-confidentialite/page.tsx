"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-center mb-12">
            Politique de Confidentialité
          </h1>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Collecte des données</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Le Manoir de Vacheresses collecte des données personnelles dans le cadre de :
                </p>
                <ul>
                  <li>Les demandes de réservation</li>
                  <li>Les demandes de devis</li>
                  <li>Les demandes de contact</li>
                  <li>La navigation sur le site (cookies)</li>
                </ul>
                <p>
                  Les données collectées peuvent inclure : nom, prénom, email, numéro de téléphone, adresse, date de l'événement.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Utilisation des données</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Vos données personnelles sont utilisées pour :
                </p>
                <ul>
                  <li>Traiter vos demandes de réservation et de devis</li>
                  <li>Vous contacter concernant votre événement</li>
                  <li>Améliorer nos services</li>
                  <li>Vous envoyer des informations marketing (avec votre consentement)</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Durée de conservation</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Vos données personnelles sont conservées pendant la durée nécessaire à l'accomplissement des finalités mentionnées ci-dessus :
                </p>
                <ul>
                  <li>Données de contact : 3 ans après le dernier contact</li>
                  <li>Données de réservation : 10 ans (obligations comptables)</li>
                  <li>Cookies : 13 mois maximum</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Partage des données</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Vos données personnelles ne sont jamais vendues à des tiers.
                  Elles peuvent être partagées avec :
                </p>
                <ul>
                  <li>Nos prestataires techniques (hébergement, emails)</li>
                  <li>Les autorités compétentes si la loi l'exige</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Vos droits</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Conformément au RGPD, vous disposez des droits suivants :
                </p>
                <ul>
                  <li><strong>Droit d'accès</strong> : obtenir une copie de vos données</li>
                  <li><strong>Droit de rectification</strong> : corriger vos données inexactes</li>
                  <li><strong>Droit à l'effacement</strong> : demander la suppression de vos données</li>
                  <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
                  <li><strong>Droit à la portabilité</strong> : récupérer vos données dans un format structuré</li>
                  <li><strong>Droit de limitation</strong> : limiter le traitement de vos données</li>
                </ul>
                <p>
                  Pour exercer ces droits, contactez-nous à : contact@manoirdevacheresses.com
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Cookies</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Notre site utilise les cookies suivants :
                </p>
                <ul>
                  <li><strong>Cookies essentiels</strong> : nécessaires au fonctionnement du site</li>
                  <li><strong>Cookies analytiques</strong> : pour analyser le trafic du site</li>
                  <li><strong>Cookies de préférence</strong> : pour mémoriser vos choix (langue, thème)</li>
                </ul>
                <p>
                  Vous pouvez gérer vos préférences de cookies à tout moment via la bannière de cookies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Sécurité</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données personnelles contre la destruction,
                  la perte, l'altération, la divulgation non autorisée ou l'accès non autorisé.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Modifications</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
                  Les modifications entrent en vigueur dès leur publication sur le site.
                </p>
                <p>
                  <strong>Dernière mise à jour</strong> : {new Date().toLocaleDateString('fr-FR')}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contact</CardTitle>
              </CardHeader>
              <CardContent className="prose dark:prose-invert max-w-none">
                <p>
                  Pour toute question concernant cette politique de confidentialité ou l'utilisation de vos données personnelles :
                </p>
                <p>
                  <strong>Email</strong> : contact@manoirdevacheresses.com<br />
                  <strong>Adresse</strong> : Manoir de Vacheresses, France
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
