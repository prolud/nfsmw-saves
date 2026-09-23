import { withBase } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Placa de marker em formato de losango: um quadrado branco de cantos
 * arredondados (8px) girado 45 graus, com linha preta interna e o ícone
 * contragirado de volta para a horizontal. Visual flat, sem sombras.
 *
 * Com framed={false}, renderiza apenas a imagem pura, sem composição.
 */
export function MarkerPlaque({
  src,
  alt,
  highlight = false,
  framed = true,
  className,
}: {
  src: string;
  alt: string;
  highlight?: boolean;
  framed?: boolean;
  className?: string;
}) {
  if (!framed) {
    return (
      <span
        className={cn("inline-flex items-center justify-center", className)}
        style={{ width: 96, height: 96 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={withBase(src)}
          alt={alt}
          width={64}
          height={64}
          loading="lazy"
          className={cn(
            "h-16 w-16 object-contain",
            highlight && "rounded-lg outline-[3px] outline-accent outline-offset-4",
          )}
        />
      </span>
    );
  }

  return (
    <span
      className={cn("inline-flex items-center justify-center", className)}
      style={{ width: 96, height: 96 }}
    >
      <span
        role="img"
        aria-label={alt}
        className={cn(
          "relative rotate-45 bg-white",
          highlight && "outline-[3px] outline-accent outline-offset-[6px]",
        )}
        style={{ width: 55, height: 55, borderRadius: 11 }}
      >
        {/* Linha preta interna, com respiro curto até a borda da placa. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute rounded border-2 border-black"
          style={{ inset: 5, borderRadius: 6 }}
        />
        {/* Conteúdo contragirado para ficar na horizontal. */}
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="block -rotate-45">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={withBase(src)}
              alt={alt}
              width={36}
              height={36}
              loading="lazy"
              className="h-8 w-8 object-contain"
            />
          </span>
        </span>
      </span>
    </span>
  );
}
