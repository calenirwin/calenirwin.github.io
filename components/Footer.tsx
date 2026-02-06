import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Calen Irwin</span>
          <div className="flex gap-6">
            <Link
              href="https://github.com/calenirwin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/calen-b-irwin"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black transition-colors"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
