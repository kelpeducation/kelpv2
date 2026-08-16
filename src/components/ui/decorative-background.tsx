import { cn } from '@/lib/utils';

type BlobColor = 'secondary' | 'primary' | 'accent';

const blobColorClass: Record<BlobColor, string> = {
  secondary: 'bg-secondary',
  primary: 'bg-primary',
  accent: 'bg-accent',
};

const blobPositions = [
  '-top-1/4 -left-1/4 w-80 h-80',
  '-bottom-1/4 -right-1/4 w-80 h-80',
];

interface DecorativeBackgroundProps {
  /** Faint grid-line texture overlay. */
  grid?: boolean;
  gridOpacity?: number;
  gridSize?: 40 | 60;
  /** Number of soft blurred accent blobs (0-2). */
  blobs?: 0 | 1 | 2;
  blobColor?: BlobColor;
  className?: string;
}

export function DecorativeBackground({
  grid = true,
  gridOpacity = 0.03,
  gridSize = 60,
  blobs = 0,
  blobColor = 'secondary',
  className,
}: DecorativeBackgroundProps) {
  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {grid && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(18,182,213,${gridOpacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(18,182,213,${gridOpacity}) 1px, transparent 1px)`,
            backgroundSize: `${gridSize}px ${gridSize}px`,
          }}
        />
      )}
      {Array.from({ length: blobs }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'absolute rounded-full blur-[100px] opacity-10',
            blobColorClass[blobColor],
            blobPositions[i],
          )}
        />
      ))}
    </div>
  );
}
