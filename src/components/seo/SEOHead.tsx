import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonical?: string;
  image?: string;
  type?: string;
}

export function SEOHead({ 
  title = "APEX Executive - AI Coach | Executive Coaching App for Leaders",
  description = "AI-powered executive coaching app for leaders. Build confidence, master meetings, and grow faster. Practice negotiations, investor pitches with AI simulations. Start free trial.",
  keywords = "executive coach app, AI executive coaching, performance coach, leadership training app, negotiation practice app, confidence coach, sales leader AI, business performance app, executive presence training",
  canonical = "https://apex-executive.com/",
  image = "https://apex-executive.com/assets/aso/social-preview.jpg",
  type = "website"
}: SEOHeadProps) {
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="APEX Executive" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="APEX Executive" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}