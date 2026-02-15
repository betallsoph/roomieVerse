import type { Metadata } from "next";
import { getListingServer } from "../../../lib/server-data";
import ListingDetailClient from "./ListingDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const listing = await getListingServer(id);

  if (!listing) {
    return { title: "Không tìm thấy bài đăng" };
  }

  const title = listing.title;
  const description = (listing.description || "").slice(0, 160);
  const address = [listing.district, listing.city].filter(Boolean).join(", ");

  return {
    title,
    description: description || `Phòng sang lại tại ${address}`,
    openGraph: {
      title,
      description,
      type: "website",
      locale: "vi_VN",
      images: listing.images?.[0] ? [{ url: listing.images[0], width: 800, height: 600 }] : undefined,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingServer(id);

  return (
    <>
      {listing && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateListing",
              name: listing.title,
              description: listing.description,
              url: `https://roomieverse.app/sublease/listing/${id}`,
              ...(listing.price && {
                offers: {
                  "@type": "Offer",
                  price: listing.price,
                  priceCurrency: "VND",
                },
              }),
              address: {
                "@type": "PostalAddress",
                addressLocality: listing.district || "",
                addressRegion: listing.city || "",
                addressCountry: "VN",
              },
              ...(listing.images?.[0] && { image: listing.images[0] }),
            }),
          }}
        />
      )}
      <ListingDetailClient initialListing={listing} />
    </>
  );
}
