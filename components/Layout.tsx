import type { FC, ReactNode } from 'react'
import Head from 'next/head.js'
import Nav, { NavProps } from './Nav'
import { ComponentType } from 'react'

export interface LayoutProps extends NavProps {
  children?: ReactNode
  title?: string
  description?: string
}

const Layout: FC<LayoutProps> = ({
  title,
  description,
  path,
  deployButton,
  children,
}) => {
  return (
    <div className="mx-auto h-screen flex flex-col">
      <Head>
        {title && <title>{`${title} - Navi Sales + By Samasat AI`}</title>}
        {description && <meta name="description" content={description} />}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Nav path={path} deployButton={deployButton} />

      <div className="px-8 bg-accents-0">{children}</div>

      <footer className="py-10 w-full mt-auto border-t flex items-center justify-center bg-accents-1 z-20">
        <span className="text-primary">Creado por</span>
        <a
          href="https://samasat.com"
          aria-label="Samasat.com Link"
          target="_blank"
          rel="noreferrer"
          className="text-black "
        >
          <img
            src="https://samasat.com/wp-content/uploads/2022/01/Disen%CC%83o-sin-ti%CC%81tulo.png"
            alt="Samasat Logo"
            className="inline-block h-6 ml-2 text-primary"
          />
          <span className='text-blue-800'>Samasat AI</span>
        </a>. Construyendo
        <a
          href="https://github.com/joztos"
          target="_blank"
          rel="noreferrer"
          className="text-black text-blue-600 ml-1 mr-1"
        > futuros 
        </a> en el presente.
      </footer>
    </div>
  )
}

export default Layout

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>

export interface LayoutProps extends NavProps {
    children?: ReactNode;
    title?: string;
    description?: string;
}

export function getLayout<LP extends {}>(
  Component: ComponentType<any>
): ComponentType<LP> {
  return (Component as any).Layout || Noop
}
