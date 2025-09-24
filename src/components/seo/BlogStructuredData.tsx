import { Helmet } from "react-helmet-async";

interface BlogStructuredDataProps {
  title: string;
  excerpt: string;
  category: string;
  author?: string;
  publishDate?: string;
  imageUrl?: string;
  url: string;
}

export function BlogStructuredData({ 
  title, 
  excerpt, 
  category, 
  author = "APEX Executive Team",
  publishDate,
  imageUrl,
  url 
}: BlogStructuredDataProps) {
  const articleData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": excerpt,
    "articleSection": category,
    "author": {
      "@type": "Organization",
      "name": author,
      "url": "https://apex-executive.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "APEX Executive",
      "logo": {
        "@type": "ImageObject",
        "url": "https://apex-executive.com/assets/aso/logo.png",
        "width": 200,
        "height": 60
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "url": url,
    "datePublished": publishDate || new Date().toISOString(),
    "dateModified": publishDate || new Date().toISOString(),
    ...(imageUrl && {
      "image": {
        "@type": "ImageObject",
        "url": imageUrl,
        "width": 1200,
        "height": 630
      }
    }),
    "keywords": [
      "executive coaching",
      "leadership development", 
      "AI coaching",
      category.toLowerCase()
    ],
    "articleBody": excerpt
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleData)}
      </script>
    </Helmet>
  );
}