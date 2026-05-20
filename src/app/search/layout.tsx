import { Suspense } from "react";
import { Footer } from "@/components/layout/footer";
import { SearchLayout } from "@/components/layout/search/layout";
import { SearchChildrenWrapper } from "./children-wrapper";

export default function SearchRouteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SearchLayout>
        <Suspense fallback={null}>
          <SearchChildrenWrapper>{children}</SearchChildrenWrapper>
        </Suspense>
      </SearchLayout>
      <Footer />
    </>
  );
}
