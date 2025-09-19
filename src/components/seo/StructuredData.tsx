import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type?: "WebSite" | "SoftwareApplication" | "Article" | "Organization";
  data?: Record<string, any>;
}

export function StructuredData({ type = "SoftwareApplication", data }: StructuredDataProps) {
  const defaultData = {
    WebSite: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "APEX Executive - AI Coach",
      "url": "https://apex-executive.com",
      "description": "AI-powered executive coaching app for leaders. Build confidence, master meetings, and grow faster.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://apex-executive.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    SoftwareApplication: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "APEX Executive - AI Coach",
      "description": "AI-powered executive coaching app built for leaders, entrepreneurs, and sales professionals. Boost executive presence, master negotiations, and track performance growth.",
      "url": "https://apex-executive.com",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": [
        {
          "@type": "Offer",
          "name": "Personal Plan",
          "price": "29",
          "priceCurrency": "USD",
          "billingIncrement": "P1M",
          "description": "AI coaching for individual professionals"
        },
        {
          "@type": "Offer", 
          "name": "Professional Plan",
          "price": "99",
          "priceCurrency": "USD",
          "billingIncrement": "P1M",
          "description": "Advanced AI coaching with enterprise features"
        }
      ],
      "author": {
        "@type": "Organization",
        "name": "APEX Executive",
        "url": "https://apex-executive.com"
      },
      "keywords": "executive coaching, AI coaching, leadership training, performance coaching, executive presence, negotiation training",
      "featureList": [
        "AI Strategy Co-pilot for real-time coaching",
        "Scenario Library with investor pitches & negotiations", 
        "Performance Analytics with growth tracking",
        "Confidence Habits for executive presence",
        "Voice Analysis with AI-powered feedback"
      ]
    },
    Organization: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "APEX Executive",
      "url": "https://apex-executive.com",
      "logo": "https://apex-executive.com/assets/aso/logo.png",
      "description": "AI-powered executive coaching platform for leaders and professionals",
      "foundingDate": "2024",
      "sameAs": [
        "https://twitter.com/apex_executive",
        "https://linkedin.com/company/apex-executive"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "email": "hello@apex-executive.com"
      }
    }
  };

  const structuredData = data || defaultData[type];

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}