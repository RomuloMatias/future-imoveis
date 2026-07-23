import {
  BadgeCheck,
  Building2,
  CarFront,
  Droplets,
  Dumbbell,
  Fence,
  HandCoins,
  Home,
  Landmark,
  LockKeyhole,
  MapPin,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
  Trees,
  TreePalm,
  Users,
  UtensilsCrossed,
  Waves,
  type LucideIcon,
} from "lucide-react";

/**
 * Conjunto fixo de ícones que a cliente pode escolher no admin para
 * experiências/itens técnicos. Mantido curado (em vez de expor todo o Lucide)
 * para a UX ficar simples.
 */
export const iconRegistry = {
  waves: { label: "Ondas", icon: Waves },
  route: { label: "Trajeto", icon: Route },
  utensils: { label: "Gastronomia", icon: UtensilsCrossed },
  lock: { label: "Segurança", icon: LockKeyhole },
  car: { label: "Estacionamento", icon: CarFront },
  trees: { label: "Paisagismo", icon: Trees },
  palm: { label: "Praia", icon: TreePalm },
  fence: { label: "Muramento", icon: Fence },
  droplets: { label: "Água", icon: Droplets },
  shield: { label: "Segurança (escudo)", icon: ShieldCheck },
  mapPin: { label: "Localização", icon: MapPin },
  sparkles: { label: "Destaque", icon: Sparkles },
  handCoins: { label: "Financiamento", icon: HandCoins },
  landmark: { label: "Banco", icon: Landmark },
  building: { label: "Construção", icon: Building2 },
  badgeCheck: { label: "Selo de confiança", icon: BadgeCheck },
  home: { label: "Casa", icon: Home },
  dumbbell: { label: "Academia/lazer", icon: Dumbbell },
  users: { label: "Comunidade", icon: Users },
  sun: { label: "Sol/área externa", icon: Sun },
} as const satisfies Record<string, { label: string; icon: LucideIcon }>;

export type IconKey = keyof typeof iconRegistry;

export const iconKeys = Object.keys(iconRegistry) as IconKey[];

export function getIcon(key: string): LucideIcon {
  return iconRegistry[key as IconKey]?.icon ?? Sparkles;
}
