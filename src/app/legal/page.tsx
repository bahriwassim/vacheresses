
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LegalPage() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-4xl">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">{t.legal.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                        <h2>{t.legal.section1_title}</h2>
                        <p dangerouslySetInnerHTML={{ __html: t.legal.section1_p1 }}></p>
                        <p><strong>{t.legal.owner_title}</strong><br/>
                        {t.legal.owner_name}<br/>
                        {t.legal.owner_address}<br/>
                        {t.legal.owner_phone}<br/>
                        {t.legal.owner_email}<br/>
                        {t.legal.owner_siren}</p>
                        <p><strong>{t.legal.realization_title}</strong><br/>
                        {t.legal.realization_name}<br/>
                        {t.legal.realization_address}<br/>
                        {t.legal.realization_phone}<br/>
                        {t.legal.realization_email}<br/>
                        {t.legal.realization_siret}</p>
                        <p><strong>{t.legal.hosting_title}</strong><br/>
                        {t.legal.hosting_name}<br/>
                        {t.legal.hosting_address}<br/>
                        {t.legal.hosting_vat}</p>

                        <h2>{t.legal.section2_title}</h2>
                        <p>{t.legal.section2_p1}</p>
                        <p>{t.legal.section2_p2}</p>
                        <p>{t.legal.section2_p3}</p>

                        <h2>{t.legal.section3_title}</h2>
                        <p>{t.legal.section3_p1}</p>
                        <p>{t.legal.section3_p2}</p>

                        <h2>{t.legal.section4_title}</h2>
                        <p>{t.legal.section4_p1}</p>
                        <p>{t.legal.section4_p2}</p>
                        <p>{t.legal.section4_p3}</p>

                        <h2>{t.legal.section5_title}</h2>
                        <p>{t.legal.section5_p1}</p>

                        <h2>{t.legal.section6_title}</h2>
                        <p>{t.legal.section6_p1}</p>
                        <p>{t.legal.section6_p2}</p>

                        <h3>{t.legal.section6_1_title}</h3>
                        <p>{t.legal.section6_1_p1}</p>
                        <p>{t.legal.section6_1_p2}</p>
                        <p>{t.legal.section6_1_p3}</p>
                        <p>{t.legal.section6_1_p4}</p>

                        <h3>{t.legal.section6_2_title}</h3>
                        <p>{t.legal.section6_2_p1}</p>
                        <ul>
                            <li>{t.legal.section6_2_l1}</li>
                            <li>{t.legal.section6_2_l2}</li>
                            <li>{t.legal.section6_2_l3}</li>
                            <li>{t.legal.section6_2_l4}</li>
                        </ul>
                        <p>{t.legal.section6_2_p2}</p>

                        <h3>{t.legal.section6_3_title}</h3>
                        <p>{t.legal.section6_3_p1}</p>
                        <ul>
                            <li>{t.legal.section6_3_l1}</li>
                            <li>{t.legal.section6_3_l2}</li>
                            <li>{t.legal.section6_3_l3}</li>
                            <li>{t.legal.section6_3_l4}</li>
                            <li>{t.legal.section6_3_l5}</li>
                        </ul>
                        <p>{t.legal.section6_3_p2}</p>
                        <p dangerouslySetInnerHTML={{ __html: t.legal.section6_3_p3 }}></p>
                        <p>{t.legal.section6_3_p4}</p>
                        <p>{t.legal.section6_3_p5}</p>
                        <p>{t.legal.section6_3_p6}</p>
                        <p dangerouslySetInnerHTML={{ __html: t.legal.section6_3_p7 }}></p>
                        
                        <h3>{t.legal.section6_4_title}</h3>
                        <p>{t.legal.section6_4_p1}</p>
                        <p>{t.legal.section6_4_p2}</p>
                        <p>{t.legal.section6_4_p3}</p>
                        
                        <h3>{t.legal.section6_5_title}</h3>
                        <p>{t.legal.section6_5_p1}</p>
                        <p>{t.legal.section6_5_p2}</p>
                        <p>{t.legal.section6_5_p3}</p>

                        <h2>{t.legal.section7_title}</h2>
                        
                        <h3>{t.legal.section7_1_title}</h3>
                        <p>{t.legal.section7_1_p1}</p>
                        <p dangerouslySetInnerHTML={{ __html: t.legal.section7_1_p2 }}></p>
                        
                        <h3>{t.legal.section7_2_title}</h3>
                        <p>{t.legal.section7_2_p1}</p>

                        <h2>{t.legal.section8_title}</h2>
                        <p>{t.legal.section8_p1}</p>
                        <p>{t.legal.section8_p2}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
