import Image from "next/image";
import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)} {...props} />;
}

export function SectionHead({
  eyebrow,
  title,
  body,
  className,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <p className="font-script text-3xl text-primary sm:text-4xl">{eyebrow}</p>
      <h2 className="mt-1 text-3xl font-bold sm:text-4xl">{title}</h2>
      {body && <p className="mt-3 text-muted-foreground">{body}</p>}
    </div>
  );
}

export function PhotoSlot({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-center bg-muted text-sm text-muted-foreground", className)}>
      {label}
    </div>
  );
}

/** Photo in an arched frame. The parent decides the size; the image fills it. */
export function ArchPhoto({
  src,
  alt,
  className,
  sizes = "(min-width: 1024px) 40vw, 90vw",
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("group relative overflow-hidden rounded-t-[999px] rounded-b-3xl bg-muted", className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
    </div>
  );
}
