import { Helmet } from "react-helmet-async";

interface TestimonialStructuredDataProps {
  testimonials: Array<{
    name: string;
    role: string;
    company: string;
    content: string;
    rating?: number;
  }>;
}

export function TestimonialStructuredData({ testimonials }: TestimonialStructuredDataProps) {
  const reviewsData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": testimonials.map((testimonial, index) => ({
      "@type": "Review",
      "position": index + 1,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": testimonial.rating || 5,
        "bestRating": 5,
        "worstRating": 1
      },
      "author": {
        "@type": "Person",
        "name": testimonial.name,
        "jobTitle": testimonial.role,
        "worksFor": {
          "@type": "Organization",
          "name": testimonial.company
        }
      },
      "reviewBody": testimonial.content,
      "itemReviewed": {
        "@type": "SoftwareApplication",
        "name": "APEX Executive - AI Coach",
        "applicationCategory": "BusinessApplication"
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(reviewsData)}
      </script>
    </Helmet>
  );
}