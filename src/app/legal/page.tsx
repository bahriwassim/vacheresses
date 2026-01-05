
"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useLocale } from "@/hooks/use-locale";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EditableText } from "@/components/ui/editable-text";

export default function LegalPage() {
  const { t } = useLocale();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20 bg-secondary/30">
        <div className="container max-w-4xl">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">
                      <EditableText path="legal.title" value={t.legal.title} />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose dark:prose-invert max-w-none">
                        <h2>
                          <EditableText path="legal.section1_title" value={t.legal.section1_title} />
                        </h2>
                        <p>
                          <EditableText path="legal.section1_p1" value={t.legal.section1_p1} html multiline />
                        </p>
                        <p><strong><EditableText path="legal.owner_title" value={t.legal.owner_title} /></strong><br/>
                        <EditableText path="legal.owner_name" value={t.legal.owner_name} /><br/>
                        <EditableText path="legal.owner_address" value={t.legal.owner_address} /><br/>
                        <EditableText path="legal.owner_phone" value={t.legal.owner_phone} /><br/>
                        <EditableText path="legal.owner_email" value={t.legal.owner_email} /><br/>
                        <EditableText path="legal.owner_siren" value={t.legal.owner_siren} /></p>
                        <p><strong><EditableText path="legal.realization_title" value={t.legal.realization_title} /></strong><br/>
                        <EditableText path="legal.realization_name" value={t.legal.realization_name} /><br/>
                        <EditableText path="legal.realization_address" value={t.legal.realization_address} /><br/>
                        <EditableText path="legal.realization_phone" value={t.legal.realization_phone} /><br/>
                        <EditableText path="legal.realization_email" value={t.legal.realization_email} /><br/>
                        <EditableText path="legal.realization_siret" value={t.legal.realization_siret} /></p>
                        <p><strong><EditableText path="legal.hosting_title" value={t.legal.hosting_title} /></strong><br/>
                        <EditableText path="legal.hosting_name" value={t.legal.hosting_name} /><br/>
                        <EditableText path="legal.hosting_address" value={t.legal.hosting_address} /><br/>
                        <EditableText path="legal.hosting_vat" value={t.legal.hosting_vat} /></p>

                        <h2><EditableText path="legal.section2_title" value={t.legal.section2_title} /></h2>
                        <p><EditableText path="legal.section2_p1" value={t.legal.section2_p1} multiline /></p>
                        <p><EditableText path="legal.section2_p2" value={t.legal.section2_p2} multiline /></p>
                        <p><EditableText path="legal.section2_p3" value={t.legal.section2_p3} multiline /></p>

                        <h2><EditableText path="legal.section3_title" value={t.legal.section3_title} /></h2>
                        <p><EditableText path="legal.section3_p1" value={t.legal.section3_p1} multiline /></p>
                        <p><EditableText path="legal.section3_p2" value={t.legal.section3_p2} multiline /></p>

                        <h2><EditableText path="legal.section4_title" value={t.legal.section4_title} /></h2>
                        <p><EditableText path="legal.section4_p1" value={t.legal.section4_p1} multiline /></p>
                        <p><EditableText path="legal.section4_p2" value={t.legal.section4_p2} multiline /></p>
                        <p><EditableText path="legal.section4_p3" value={t.legal.section4_p3} multiline /></p>

                        <h2><EditableText path="legal.section5_title" value={t.legal.section5_title} /></h2>
                        <p><EditableText path="legal.section5_p1" value={t.legal.section5_p1} multiline /></p>

                        <h2><EditableText path="legal.section6_title" value={t.legal.section6_title} /></h2>
                        <p><EditableText path="legal.section6_p1" value={t.legal.section6_p1} multiline /></p>
                        <p><EditableText path="legal.section6_p2" value={t.legal.section6_p2} multiline /></p>

                        <h3><EditableText path="legal.section6_1_title" value={t.legal.section6_1_title} /></h3>
                        <p><EditableText path="legal.section6_1_p1" value={t.legal.section6_1_p1} multiline /></p>
                        <p><EditableText path="legal.section6_1_p2" value={t.legal.section6_1_p2} multiline /></p>
                        <p><EditableText path="legal.section6_1_p3" value={t.legal.section6_1_p3} multiline /></p>
                        <p><EditableText path="legal.section6_1_p4" value={t.legal.section6_1_p4} multiline /></p>

                        <h3><EditableText path="legal.section6_2_title" value={t.legal.section6_2_title} /></h3>
                        <p><EditableText path="legal.section6_2_p1" value={t.legal.section6_2_p1} multiline /></p>
                        <ul>
                            <li><EditableText path="legal.section6_2_l1" value={t.legal.section6_2_l1} /></li>
                            <li><EditableText path="legal.section6_2_l2" value={t.legal.section6_2_l2} /></li>
                            <li><EditableText path="legal.section6_2_l3" value={t.legal.section6_2_l3} /></li>
                            <li><EditableText path="legal.section6_2_l4" value={t.legal.section6_2_l4} /></li>
                        </ul>
                        <p><EditableText path="legal.section6_2_p2" value={t.legal.section6_2_p2} multiline /></p>

                        <h3><EditableText path="legal.section6_3_title" value={t.legal.section6_3_title} /></h3>
                        <p><EditableText path="legal.section6_3_p1" value={t.legal.section6_3_p1} multiline /></p>
                        <ul>
                            <li><EditableText path="legal.section6_3_l1" value={t.legal.section6_3_l1} /></li>
                            <li><EditableText path="legal.section6_3_l2" value={t.legal.section6_3_l2} /></li>
                            <li><EditableText path="legal.section6_3_l3" value={t.legal.section6_3_l3} /></li>
                            <li><EditableText path="legal.section6_3_l4" value={t.legal.section6_3_l4} /></li>
                            <li><EditableText path="legal.section6_3_l5" value={t.legal.section6_3_l5} /></li>
                        </ul>
                        <p><EditableText path="legal.section6_3_p2" value={t.legal.section6_3_p2} multiline /></p>
                        <p><EditableText path="legal.section6_3_p3" value={t.legal.section6_3_p3} html multiline /></p>
                        <p><EditableText path="legal.section6_3_p4" value={t.legal.section6_3_p4} multiline /></p>
                        <p><EditableText path="legal.section6_3_p5" value={t.legal.section6_3_p5} multiline /></p>
                        <p><EditableText path="legal.section6_3_p6" value={t.legal.section6_3_p6} multiline /></p>
                        <p><EditableText path="legal.section6_3_p7" value={t.legal.section6_3_p7} html multiline /></p>
                        
                        <h3><EditableText path="legal.section6_4_title" value={t.legal.section6_4_title} /></h3>
                        <p><EditableText path="legal.section6_4_p1" value={t.legal.section6_4_p1} multiline /></p>
                        <p><EditableText path="legal.section6_4_p2" value={t.legal.section6_4_p2} multiline /></p>
                        <p><EditableText path="legal.section6_4_p3" value={t.legal.section6_4_p3} multiline /></p>
                        
                        <h3><EditableText path="legal.section6_5_title" value={t.legal.section6_5_title} /></h3>
                        <p><EditableText path="legal.section6_5_p1" value={t.legal.section6_5_p1} multiline /></p>
                        <p><EditableText path="legal.section6_5_p2" value={t.legal.section6_5_p2} multiline /></p>
                        <p><EditableText path="legal.section6_5_p3" value={t.legal.section6_5_p3} multiline /></p>

                        <h2><EditableText path="legal.section7_title" value={t.legal.section7_title} /></h2>
                        
                        <h3><EditableText path="legal.section7_1_title" value={t.legal.section7_1_title} /></h3>
                        <p><EditableText path="legal.section7_1_p1" value={t.legal.section7_1_p1} multiline /></p>
                        <p><EditableText path="legal.section7_1_p2" value={t.legal.section7_1_p2} html multiline /></p>
                        
                        <h3><EditableText path="legal.section7_2_title" value={t.legal.section7_2_title} /></h3>
                        <p><EditableText path="legal.section7_2_p1" value={t.legal.section7_2_p1} multiline /></p>

                        <h2><EditableText path="legal.section8_title" value={t.legal.section8_title} /></h2>
                        <p><EditableText path="legal.section8_p1" value={t.legal.section8_p1} multiline /></p>
                        <p><EditableText path="legal.section8_p2" value={t.legal.section8_p2} multiline /></p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
