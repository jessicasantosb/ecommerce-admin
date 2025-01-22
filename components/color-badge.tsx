type ColorBadgeProps = {
  value: string;
};

export function ColorBadge({ value }: ColorBadgeProps) {
  return (
    <div className='flex items-center gap-x-2'>
      {value}
      <div
        className='size-6 rounded-full border'
        style={{ backgroundColor: value }}
      />
    </div>
  );
}
