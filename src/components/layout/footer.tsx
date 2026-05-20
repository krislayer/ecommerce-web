import Link from "next/link";
import FooterMenu from "@/components/layout/footer-menu";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import LogoSquare from "@/components/logo-square";
import { footerMenu } from "@/lib/menu";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const siteName = "¡Qué Chulito!";

  return (
    <footer className="text-sm text-neutral-500 dark:text-neutral-400">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 border-t border-neutral-200 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0 dark:border-neutral-700">
        <div>
          <Link className="flex items-center gap-2 text-black md:pt-1 dark:text-white" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{siteName}</span>
          </Link>
        </div>
        <FooterMenu menu={footerMenu} />
        <div className="md:ml-auto">
          <ThemeToggle />
        </div>
      </div>
      <div className="border-t border-neutral-200 py-6 text-sm dark:border-neutral-700">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {siteName}. Todos los derechos reservados.
          </p>
          <hr className="mx-4 hidden h-4 w-px border-l border-neutral-400 md:inline-block" />
          <p>
            <Link href="/contact" className="hover:text-black dark:hover:text-neutral-300">
              Ayuda
            </Link>
          </p>
          <p className="md:ml-auto">
            <Link href="/about" className="text-black dark:text-white">
              Moda y estilo en Guatemala
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
