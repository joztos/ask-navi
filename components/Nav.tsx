import Link from '@vercel/examples-ui/link'
import Button from '@vercel/examples-ui/button'
import DeployButton, { DeployButtonProps } from '@vercel/examples-ui/deploy-button'

const REPO_URL = 'https://www.facebook.com/samasatsa'

export interface NavProps {
  path: string
  deployButton?: Partial<DeployButtonProps>
}

export default function Nav({ path, deployButton }: NavProps) {
  const displayPath = ['Samasat']
    .concat(path?.split('/').filter(Boolean) || [])
    .join(' / ')
  const repositoryUrl = deployButton?.repositoryUrl || `${REPO_URL}/${path}`

  return (
    <nav className="border-b border-gray-200 py-5 relative z-20 bg-background shadow-[0_0_15px_0_rgb(0,0,0,0.1)]">
      <div className="flex items-center lg:px-6 px-8 mx-auto max-w-7xl px-14">
        <div className="flex flex-row items-center">
          <Link href="https://www.samasat.com/">
            <img
              src="https://samasat.com/wp-content/uploads/2022/01/Disen%CC%83o-sin-ti%CC%81tulo.png"
              alt="Samasat Logo"
              className="w-18 h-10 text-black"
            />
          </Link>
          <ul className="flex items-center content-center">
            <li className="ml-2 text-gray-200">
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                shapeRendering="geometricPrecision"
              >
                <path d="M16.88 3.549L7.12 20.451"></path>
              </svg>
            </li>
            <li className="font-medium" style={{ letterSpacing: '.01px' }}>
              <Link
                href={repositoryUrl}
                className="text-accents-6 no-underline transition-colors duration-200 hover:text-accents-8 cursor-pointer"
                target="_blank"
                rel="noreferrer"
              >
                {displayPath}
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex-1 justify-end hidden md:flex">
          <nav className="flex-row inline-flex items-center">
            <span className="ml-2 h-full flex items-center cursor-not-allowed text-accents-5">
              <Button
                variant="ghost"
                Component="a"
                href="https://api.whatsapp.com/send/?phone=593998899225&text=Hola+deseo+informaci%C3%B3n+de+sus+planes+de+Servicios&type=phone_number&app_absent=0"
                target="_blank"
                rel="noreferrer"
              >
                Productos Samasat AI
              </Button>
            </span>
            <span className="ml-2 h-full flex items-center cursor-not-allowed text-accents-5">
            </span>
          </nav>
        </div>
      </div>
    </nav>
  )
}
