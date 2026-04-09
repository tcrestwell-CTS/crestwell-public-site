import Script from "next/script";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const SITE = "https://crestwellgetaways.com";

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: `${SITE}${item.href}` } : {}),
    })),
  };

  return (
    <>
      {/* JSON-LD breadcrumb for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {/* Visible breadcrumb nav for users */}
      <nav aria-label="Breadcrumb" style={{ background: "var(--cream)", borderBottom: "1px solid #e8e3da", padding: "10px 32px" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: 8, alignItems: "center", maxWidth: 1280, margin: "0 auto", flexWrap: "wrap" }}>
          {items.map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {i > 0 && <span style={{ color: "var(--gold)", fontSize: "0.7rem" }}>›</span>}
              {item.href && i < items.length - 1 ? (
                <a href={item.href} style={{ fontSize: "0.78rem", color: "var(--text-secondary)", textDecoration: "none", fontFamily: "var(--font-body)" }}>
                  {item.name}
                </a>
              ) : (
                <span style={{ fontSize: "0.78rem", color: "var(--navy)", fontWeight: 500, fontFamily: "var(--font-body)" }}>
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
