export const NAV_LINKS = [
  { to: "/fornecedores", label: "Fornecedores" },
  { to: "/clientes", label: "Clientes" },
];

export const ADD_OPTIONS = [
  { to: "/pedidos/novo", label: "Pedido" },
  { to: "/financas/novo", label: "Finanças" },
  { to: "/fornecedores/novo", label: "Fornecedores" },
  { to: "/clientes/novo", label: "Cliente" },
];

export const FOOTER_LINKS = [
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/contato", label: "Contato" },
];

export interface LayoutProps {
  children?: React.ReactNode;
  cardClassName?: string;
  cardShadow?: boolean;
}
