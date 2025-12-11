export const galleryById: Record<string, string[]> = {
  heures_du_jour: ["/espace_1.jpg", "/espace_9.jpg", "/espace_15.jpg"],
  ruines_antiques: ["/espace_2_(1).jpg", "/espace_8.jpg", "/espace_9.jpg"],
  jardins_tivoli: ["/espace_4.jpg", "/espace_5.jpg", "/espace_15.jpg"],
  petit_trianon: ["/espace_5.jpg", "/espace_6.jpg", "/espace_7.jpg"],
  la_loge: ["/espace_6.jpg", "/espace_7.jpg", "/espace_8.jpg"],
  potager: ["/Parc_3.jpg", "/preau_verger_3.jpg", "/preau_verger_4.jpg"],
  cour_honneur: ["/vacheresses_13.jpg", "/vacheresses_17.jpg", "/vacheresses_20.jpg"],
  salle_reception: ["/salle_reception_6.jpg", "/salle_reception_7.jpg", "/salle_reception_8.jpg"],
  parc: ["/Parc_1.jpg", "/Parc_2.jpg", "/Parc_3.jpg"],
  preau_verger: ["/preau_verger_1.jpg", "/preau_verger_2.jpg", "/preau_verger_3.jpg"],
  salle_blanche: ["/salle_reception_6.jpg", "/salle_reception_7.jpg", "/salle_reception_8.jpg"],
  orangerie: ["/espace_8.jpg", "/espace_9.jpg", "/espace_15.jpg"],
  chapelle: ["/vacheresses_13.jpg", "/vacheresses_17.jpg", "/vacheresses_20.jpg"],
  terrasses: ["/Parc_1.jpg", "/Parc_2.jpg", "/Parc_3.jpg"],
  roseraie: ["/Parc_3.jpg", "/preau_verger_3.jpg", "/preau_verger_4.jpg"],
  mare: ["/espace_1.jpg", "/espace_2_(1).jpg", "/espace_4.jpg"],
};

export function getGallery(slug: string): string[] {
  return galleryById[slug] || ["/vacheresses_20.jpg"];
}
