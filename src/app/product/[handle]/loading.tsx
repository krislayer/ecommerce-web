export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-(--breakpoint-2xl) px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
        <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden lg:basis-4/6" />
        <div className="basis-full lg:basis-2/6" />
      </div>
    </div>
  );
}
