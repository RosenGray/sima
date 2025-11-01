// import SimpleHeader from "@/components/Header/SimpleHeader/SimpleHeader";
// import Header from "@/components/Header";
import type { Metadata } from "next";
import { PublishAdLayoutSection } from "./layout.styles";
import { serviceCategoryRepository } from "@/lib/service-categories/repositories";
import { PublishAdProvider } from "./_providers/PublishAdProvider";

// Mark as dynamic because we fetch data from MongoDB
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Публикация нового объявления",
  description: "Публикация нового объявления",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const mappedCategories =
    await serviceCategoryRepository.getMappedCategories();

  return (
    <PublishAdProvider data={{ mappedCategories }}>
      <PublishAdLayoutSection>
        {/* <SimpleHeader /> */}
        {/* <Header /> */}
        <main>{children}</main>
      </PublishAdLayoutSection>
    </PublishAdProvider>
  );
}
