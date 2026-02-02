interface PageHeadingProps {
  title: string;
  description: string;
}

export function PageHeading({ title, description }: Readonly<PageHeadingProps>) {
  return (
    <div className="flex w-full flex-col">
      <h1 className="text-lg font-semibold leading-none tracking-tight sm:text-2xl sm:font-bold xl:text-2xl">
        {title}
      </h1>

      <p className="text-[13px] w-9/12 text-muted-foreground leading-relaxed sm:text-sm md:text-base xl:text-md">
        {description}
      </p>
    </div>
  )
}
