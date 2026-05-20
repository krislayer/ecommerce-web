import { HeartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { FooterColumn } from "@/components/layout/footer-menu";
import { FooterSocialLinks } from "@/components/layout/footer-social";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import LogoSquare, { SITE_NAME } from "@/components/logo-square";
import { footerInfoLinks, footerShopLinks } from "@/lib/menu";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = currentYear;

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto max-w-7xl border-t border-neutral-200 px-6 py-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-12">
          <div className="shrink-0">
            <Link className="inline-flex items-center gap-2 text-black dark:text-white" href="/">
              <LogoSquare size="sm" />
              <span className="uppercase">{SITE_NAME}</span>
            </Link>
            <div className="mt-6 flex items-center gap-2">
              <FooterSocialLinks />
              <ThemeToggle variant="icon" />
            </div>
          </div>

          <FooterColumn title="Enlaces" links={footerShopLinks} />

          <FooterColumn title="Información" links={footerInfoLinks} />
        </div>
      </div>

      <div className="border-t border-neutral-200 py-6 dark:border-neutral-700">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm md:px-4 min-[1320px]:px-0">
          <p className="text-neutral-500 dark:text-neutral-400">
            &copy; {copyrightDate} {SITE_NAME} - Todos los derechos reservados.
          </p>
          <p className="mt-2 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-black dark:text-white">
            <span>Hecho con</span>
            <HeartIcon className="h-4 w-4" aria-hidden />
            <span>por</span>
            <Link
              href="https://chixot-project.web.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4"
            >
              Proyecto Chixot
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
