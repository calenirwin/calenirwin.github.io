export const metadata = {
  title: 'About - Calen Irwin',
  description: 'About Calen Irwin.',
}

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight mb-12">
        About
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          I&apos;m Cale. Research data scientist at Hitachi Rail in Toronto,
          working on autonomy systems for trains.
        </p>

        <p>
          I studied CS at Queen&apos;s. Outside of work I read fantasy, run,
          and camp.
        </p>

        <p>
          I write here about AI, building products, and ideas I find interesting.
        </p>
      </div>
    </div>
  )
}
