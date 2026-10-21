import type { LucideIcon } from "lucide-react";
import { Camera, ChefHat, Download, Play, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

type IconProps = React.SVGProps<SVGSVGElement>;

function Svg({ children, className, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 48 48" fill="currentColor" aria-hidden="true" className={cn("size-12", className)} {...props}>
      {children}
    </svg>
  );
}

const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function hex(cx: number, cy: number, r: number) {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  });
  return `M${pts.join("L")}Z`;
}

/* Bee drawn upright inside a 48 box, reused by several icons. */
function BeeBody() {
  return (
    <g>
      <ellipse cx="13" cy="21" rx="5.5" ry="9" transform="rotate(-25 13 21)" {...stroke} />
      <ellipse cx="35" cy="21" rx="5.5" ry="9" transform="rotate(25 35 21)" {...stroke} />
      <rect x="16" y="13" width="16" height="8" rx="4" />
      <rect x="15" y="23" width="18" height="7" rx="2" />
      <rect x="17" y="32" width="14" height="8" rx="4" />
      <path d="M20 12l-3-5M28 12l3-5" {...stroke} />
    </g>
  );
}

export function HiveIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="17" y="5" width="14" height="5" rx="2.5" />
      <rect x="10" y="12" width="28" height="8" rx="4" />
      <rect x="8" y="22" width="32" height="8" rx="4" />
      <rect x="10" y="32" width="28" height="8" rx="4" />
      <rect x="19" y="42" width="10" height="3" rx="1.5" />
    </Svg>
  );
}

export function BeeShadowIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <ellipse cx="14" cy="19" rx="10" ry="12" transform="rotate(-20 14 19)" />
      <ellipse cx="34" cy="19" rx="10" ry="12" transform="rotate(20 34 19)" />
      <ellipse cx="24" cy="29" rx="7" ry="14" />
      <path d="M21 14l-3-7M27 14l3-7" {...stroke} />
    </Svg>
  );
}

export function FlyingBeeIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <ellipse cx="25" cy="12" rx="5.5" ry="10" transform="rotate(-25 25 12)" {...stroke} />
      <ellipse cx="35" cy="13" rx="5" ry="9" transform="rotate(20 35 13)" {...stroke} />
      <rect x="17" y="17" width="8" height="20" rx="4" />
      <rect x="27" y="17" width="8" height="20" rx="2" />
      <rect x="37" y="18" width="8" height="18" rx="4" />
      <path d="M3 27h9" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" strokeLinecap="round" />
    </Svg>
  );
}

export function HoneyStickIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="5" y="9" width="5" height="16" rx="2.5" />
      <rect x="12" y="7" width="5" height="20" rx="2.5" />
      <rect x="19" y="9" width="5" height="16" rx="2.5" />
      <rect x="25" y="15" width="20" height="4" rx="2" />
      <path d="M14 31c-2 3-3 4.5-3 6.5a3 3 0 006 0c0-2-1-3.5-3-6.5z" />
    </Svg>
  );
}

export function BeeInIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d={hex(24, 24, 20)} transform="rotate(90 24 24)" {...stroke} />
      <g transform="translate(9.6 9.6) scale(.6)">
        <BeeBody />
      </g>
    </Svg>
  );
}

export function BeeOutIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M14 38L8.5 29V19L14 10h20l5.5 9v10L34 38" {...stroke} />
      <g transform="translate(9.6 15) scale(.6)">
        <BeeBody />
      </g>
    </Svg>
  );
}

export function HoneyDropIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <path d={hex(24, 24, 20)} transform="rotate(90 24 24)" {...stroke} />
      <path d="M24 13c-4 5-6 8-6 11.5a6 6 0 0012 0c0-3.500-2-6.500-6-11.500z" />
    </Svg>
  );
}

const jarPath = "M12 13h24c3 3 5 8 5 14v9a6 6 0 01-6 6H13a6 6 0 01-6-6v-9c0-6 2-11 5-14z";

export function JarIcon({ level = 1, outline = false, ...p }: IconProps & { level?: 0 | 0.25 | 0.5 | 0.75 | 1; outline?: boolean }) {
  const top = 45 - 32 * level;
  return (
    <Svg {...p}>
      <rect x="14" y="5" width="20" height="6" rx="2.5" />
      {level === 1 && !outline ? (
        <path d={jarPath} />
      ) : (
        <>
          <path d={jarPath} {...stroke} />
          {level > 0 && (
            <>
              <clipPath id="jar-clip">
                <path d={jarPath} />
              </clipPath>
              <rect x="0" y={top} width="48" height="48" clipPath="url(#jar-clip)" />
            </>
          )}
        </>
      )}
    </Svg>
  );
}

export function FlowerIcon(p: IconProps) {
  return (
    <Svg {...p}>
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle key={a} cx={24 + 11 * Math.cos((a * Math.PI) / 180)} cy={24 + 11 * Math.sin((a * Math.PI) / 180)} r="7" />
      ))}
      <circle cx="24" cy="24" r="5" className="fill-background" />
    </Svg>
  );
}

export function WildFlowerIcon(p: IconProps) {
  return (
    <Svg {...p}>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="26" cy="15" rx="4" ry="7" transform={`rotate(${a} 26 20)`} />
      ))}
      <circle cx="26" cy="20" r="3" className="fill-background" />
      <path d="M24 30c-3 5-5 9-6 14M21 38c4-1 7-3 9-6" {...stroke} />
    </Svg>
  );
}

type CombVariant = "outline" | "solid" | "trail" | "pair" | "single";

export function HoneycombIcon({ variant = "solid", ...p }: IconProps & { variant?: CombVariant }) {
  const r = 7;
  const w = r * 1.5;
  const h = r * 1.732;
  const cluster: [number, number][] = [
    [24, 24],
    [24 - w, 24 - h / 2],
    [24 + w, 24 - h / 2],
    [24 - w, 24 + h / 2],
    [24 + w, 24 + h / 2],
    [24, 24 - h],
    [24, 24 + h],
  ];
  const cells: Record<CombVariant, [number, number][]> = {
    outline: cluster,
    solid: cluster.slice(0, 6),
    trail: [[12, 16], [22, 26], [34, 34], [18, 38]],
    pair: [[17, 28], [31, 28]],
    single: [[24, 24]],
  };
  const solid = variant !== "outline";
  return (
    <Svg {...p}>
      {cells[variant].map(([x, y]) => (
        <path key={`${x}-${y}`} d={hex(x, y, variant === "pair" || variant === "single" ? 8 : r - 0.8)} {...(solid ? {} : stroke)} />
      ))}
    </Svg>
  );
}

export function FacebookGlyph(p: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
      <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.700c0-.9.3-1.500 1.600-1.500h1.500V4.500c-.3 0-1.200-.1-2.200-.1-2.300 0-3.900 1.400-3.900 4v2.100H8V13.500h2.500V21z" />
    </svg>
  );
}

export type HexTone = "honey" | "leaf" | "bark" | "orange";

const tones: Record<HexTone, string> = {
  honey: "bg-accent text-accent-foreground",
  leaf: "bg-leaf text-leaf-foreground",
  bark: "bg-cocoa text-cocoa-foreground",
  orange: "bg-orange text-white",
};

/** Web icon: glyph inside the brand hexagon. */
export function HexBadge({
  icon: Icon,
  children,
  tone = "honey",
  className,
}: {
  icon?: LucideIcon;
  children?: React.ReactNode;
  tone?: HexTone;
  className?: string;
}) {
  return (
    <span className={cn("hex inline-flex size-14 items-center justify-center", tones[tone], className)}>
      {Icon ? <Icon className="size-6" /> : children}
    </span>
  );
}

export const webIcons: { label: string; node: React.ReactNode }[] = [
  { label: "Contact", node: <HexBadge icon={User} tone="leaf" /> },
  { label: "Search", node: <HexBadge icon={Search} tone="orange" /> },
  { label: "Recipe", node: <HexBadge icon={ChefHat} tone="bark" /> },
  { label: "Photo", node: <HexBadge icon={Camera} tone="leaf" /> },
  { label: "Facebook", node: <HexBadge tone="orange"><FacebookGlyph className="size-6" /></HexBadge> },
  { label: "Download", node: <HexBadge icon={Download} tone="bark" /> },
  { label: "Play", node: <HexBadge icon={Play} tone="honey" /> },
];

export const customIcons: { label: string; node: React.ReactNode }[] = [
  { label: "Hive", node: <HiveIcon /> },
  { label: "Bee shadow", node: <BeeShadowIcon /> },
  { label: "Flying bee", node: <FlyingBeeIcon /> },
  { label: "Honey stick", node: <HoneyStickIcon /> },
  { label: "Bee in", node: <BeeInIcon /> },
  { label: "Bee out", node: <BeeOutIcon /> },
  { label: "Honey drop", node: <HoneyDropIcon /> },
  { label: "Jar full", node: <JarIcon /> },
  { label: "Jar outline", node: <JarIcon level={0} /> },
  { label: "Jar 75%", node: <JarIcon level={0.75} /> },
  { label: "Jar 50%", node: <JarIcon level={0.5} /> },
  { label: "Jar 25%", node: <JarIcon level={0.25} /> },
  { label: "Flower", node: <FlowerIcon /> },
  { label: "Wild flower", node: <WildFlowerIcon /> },
  { label: "Comb outline", node: <HoneycombIcon variant="outline" /> },
  { label: "Comb solid", node: <HoneycombIcon variant="solid" /> },
  { label: "Comb trail", node: <HoneycombIcon variant="trail" /> },
  { label: "Comb pair", node: <HoneycombIcon variant="pair" /> },
  { label: "Comb cell", node: <HoneycombIcon variant="single" /> },
];
