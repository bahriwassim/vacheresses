"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocale } from "@/hooks/use-locale";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { EditableText } from "@/components/ui/editable-text";

export default function ContactPage() {
  const { t } = useLocale();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // NOTE: To enable the map, you need a valid Google Maps API key.
  // 1. Get an API key from https://console.cloud.google.com/google/maps-apis/overview
  // 2. Enable the "Maps Embed API" for your project.
  // 3. Replace the src URL below with the one provided by Google, including your API key.
  const mapSrcWithApiKey = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDB9IcwYdjnLWwD21GU4lr-a0Iu2NYyDpI&q=Manoir+de+Vacheresses,Nogent-Le-Roi,France";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuler l'envoi du formulaire
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Réinitialiser le formulaire
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });

    // Masquer le message de succès après 5 secondes
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12 md:py-20">
        <div className="container max-w-7xl">
          {/* En-tête */}
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              <EditableText path="contact.title" value={t.contact.title} />
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              <EditableText path="contact.subtitle" value={t.contact.subtitle} />
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Informations de contact */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="animate-in fade-in slide-in-from-left-8 duration-1000 delay-200">
                <CardHeader>
                  <CardTitle className="font-headline"><EditableText path="contact.info_title" value={t.contact.info_title} /></CardTitle>
                  <CardDescription><EditableText path="contact.info_subtitle" value={t.contact.info_subtitle} /></CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm"><EditableText path="contact.address_label" value={t.contact.address_label} /></p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        <EditableText path="contact.address_value" value={t.contact.address_value} multiline />
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm"><EditableText path="contact.phone_label" value={t.contact.phone_label} /></p>
                      <a href={`tel:${t.contact.phone_value.replace(/\s/g, '')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        <EditableText path="contact.phone_value" value={t.contact.phone_value} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm"><EditableText path="contact.email_label" value={t.contact.email_label} /></p>
                      <a href={`mailto:${t.contact.email_value}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                        <EditableText path="contact.email_value" value={t.contact.email_value} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm"><EditableText path="contact.hours_label" value={t.contact.hours_label} /></p>
                      <p className="text-sm text-muted-foreground whitespace-pre-line">
                        <EditableText path="contact.hours_value" value={t.contact.hours_value} multiline />
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Carte WhatsApp */}
              <Card className="bg-green-50 border-green-200 animate-in fade-in slide-in-from-left-8 duration-1000 delay-300">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        fill="white"
                        className="w-6 h-6"
                      >
                        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-10.8-94.3-30.6l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-green-900"><EditableText path="contact.whatsapp_title" value={t.contact.whatsapp_title} /></p>
                      <p className="text-sm text-green-700"><EditableText path="contact.whatsapp_subtitle" value={t.contact.whatsapp_subtitle} /></p>
                    </div>
                  </div>
                  <Button asChild className="w-full bg-green-500 hover:bg-green-600">
                    <a href="https://wa.me/33611842021" target="_blank" rel="noopener noreferrer">
                      <EditableText path="contact.whatsapp_button" value={t.contact.whatsapp_button} />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Formulaire de contact */}
            <div className="lg:col-span-2">
              <Card className="animate-in fade-in slide-in-from-right-8 duration-1000 delay-200">
                <CardHeader>
                  <CardTitle className="font-headline text-2xl"><EditableText path="contact.form_title" value={t.contact.form_title} /></CardTitle>
                  <CardDescription>
                    <EditableText path="contact.form_subtitle" value={t.contact.form_subtitle} />
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-in fade-in slide-in-from-top-4 duration-500">
                      <p className="text-green-800 font-semibold"><EditableText path="contact.success_title" value={t.contact.success_title} /></p>
                      <p className="text-green-700 text-sm mt-1"><EditableText path="contact.success_message" value={t.contact.success_message} /></p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name"><EditableText path="contact.name_label" value={t.contact.name_label} /></Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Jean Dupont"
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email"><EditableText path="contact.email_label" value={t.contact.email_label} /></Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="jean.dupont@email.com"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone"><EditableText path="contact.phone_label" value={t.contact.phone_label} /></Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+33 6 12 34 56 78"
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject"><EditableText path="contact.subject_label" value={t.contact.subject_label} /></Label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Demande d'information"
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message"><EditableText path="contact.message_label" value={t.contact.message_label} /></Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Décrivez votre demande en détail..."
                        className="w-full min-h-[150px]"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="min-w-[200px]"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin mr-2">⏳</span>
                            <EditableText path="contact.sending_button" value={t.contact.sending_button} />
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 mr-2" />
                            <EditableText path="contact.submit_button" value={t.contact.submit_button} />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Carte Google Maps */}
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-400">
            <Card>
              <CardContent className="p-0">
                <div className="relative w-full h-96 bg-muted rounded-lg overflow-hidden">
                  <iframe
                    src={mapSrcWithApiKey}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localisation du Manoir de Vacheresses"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
