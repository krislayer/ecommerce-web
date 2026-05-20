export type MenuItem = {
  title: string;
  path: string;
};

export const footerMenu: MenuItem[] = [
  { title: "Inicio", path: "/" },
  { title: "Catálogo", path: "/search" },
  { title: "Sobre nosotros", path: "/about" },
  { title: "Contacto", path: "/contact" },
  { title: "Devoluciones", path: "/contact#devoluciones" },
];
