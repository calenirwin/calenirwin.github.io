export const metadata = {
  title: 'About - Calen Irwin',
  description: 'About page for Calen Irwin\'s personal website.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <p className="text-gray-700 leading-relaxed mb-4">
              I&apos;m Cale, a data scientist working at Hitachi Rail in Toronto.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Most of my work involves designing and realizing prototype autonomy products for the rail industry.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Lately, I&apos;ve been coding with Claude to make something cool. More on that later.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              This site is a medium for sharing my thoughts and projects. Thanks for checking it out.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
