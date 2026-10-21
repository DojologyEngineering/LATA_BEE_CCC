import { HoneyDropIcon } from "@/components/icons/bee-icons";

/** Quiet section divider: two hairlines that fade out, with a honey drop in a hexagon at the centre. */
export function Divider() {
  return (
    <div aria-hidden="true" className="mx-auto flex w-full max-w-3xl items-center gap-4 px-6 py-4 sm:py-6">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/40" />
      <span className="flex items-center gap-2 text-primary">
        <span className="size-1 rounded-full bg-current opacity-40" />
        <HoneyDropIcon className="size-10" />
        <span className="size-1 rounded-full bg-current opacity-40" />
      </span>
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/40" />
    </div>
  );
}
