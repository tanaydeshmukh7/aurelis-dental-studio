export interface GalleryItem {
  id: string;
  title: string;
  category: "The Studio" | "Consultation" | "Operatories" | "Technology" | "Smiles";
  image: string;
  alt: string;
  caption: string;
  aspect: "landscape" | "portrait" | "wide";
}

export const GALLERY_CATEGORIES = [
  "All Spaces",
  "The Studio",
  "Consultation",
  "Operatories",
  "Technology",
  "Smiles",
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "gal-1",
    title: "The Consultation Lounge",
    category: "The Studio",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
    alt: "Acoustic lounge with warm oak and sandstone accents in Koregaon Park",
    caption: "Acoustically damped consultation lounge designed for unhurried diagnostic discussions.",
    aspect: "landscape",
  },
  {
    id: "gal-2",
    title: "Restorative Treatment Suite",
    category: "Operatories",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=85",
    alt: "Pristine modern treatment suite with indirect natural illumination",
    caption: "Engineered with hospital-grade laminar HEPA filtration and ergonomic memory-foam seating.",
    aspect: "wide",
  },
  {
    id: "gal-3",
    title: "Digital Smile Planning",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85",
    alt: "Clinician reviewing 3D scan on tablet with patient",
    caption: "Sub-millimeter 3D intraoral mapping displayed on high-definition lounge monitors.",
    aspect: "landscape",
  },
  {
    id: "gal-4",
    title: "Natural Smile Harmony",
    category: "Smiles",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=85",
    alt: "Natural confident smile reflecting bespoke aesthetic care",
    caption: "Bespoke porcelain restorations harmonised with individual facial dynamics.",
    aspect: "portrait",
  },
  {
    id: "gal-5",
    title: "Tranquil Courtyard Illumination",
    category: "The Studio",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1400&q=85",
    alt: "Natural biophilic courtyard light entering the studio corridor",
    caption: "Filtered diffuse daylight paired with 5000K daylight-balanced clinical lighting.",
    aspect: "landscape",
  },
  {
    id: "gal-6",
    title: "Diagnostic Consultation Session",
    category: "Consultation",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85",
    alt: "Unhurried clinical consultation discussion",
    caption: "Transparent conversations reviewing oral health goals before picking up instruments.",
    aspect: "landscape",
  },
  {
    id: "gal-7",
    title: "Clear Aligner Biomechanics",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1400&q=85",
    alt: "Clear aligner precision orthodontic trays",
    caption: "Sub-millimeter staged tooth alignment tailored to adult lifestyles.",
    aspect: "portrait",
  },
  {
    id: "gal-8",
    title: "Minimalist Treatment Operatory",
    category: "Operatories",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=85",
    alt: "Ultra-clean dental treatment room with minimalist aesthetic",
    caption: "Low-noise clinical instrumentation reducing procedural anxiety.",
    aspect: "landscape",
  },
  {
    id: "gal-9",
    title: "Biophilic Reception Sanctuary",
    category: "The Studio",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85",
    alt: "Natural stone and warm oak reception in Koregaon Park",
    caption: "Warm natural textures and botanical elements instilling immediate calm.",
    aspect: "wide",
  },
  {
    id: "gal-10",
    title: "Guided Biofilm Prophylaxis",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1400&q=85",
    alt: "Painless airflow biofilm cleaning technology",
    caption: "Warm water and gentle erythritol powder sweeping away dental biofilm without scraping.",
    aspect: "landscape",
  },
  {
    id: "gal-11",
    title: "Aesthetic Confidence",
    category: "Smiles",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1200&q=85",
    alt: "Calm, confident smile",
    caption: "Healthy biological tooth preservation paired with subtle aesthetic vitality.",
    aspect: "portrait",
  },
  {
    id: "gal-12",
    title: "Digital Diagnostics Studio",
    category: "Consultation",
    image: "https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern consultation suite with clinical display monitors",
    caption: "Real-time 3D smile modeling eliminating messy impression clays.",
    aspect: "landscape",
  },
];
