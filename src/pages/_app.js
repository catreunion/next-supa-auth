import { useState } from 'react'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { homePageTitle, homePageDesc } from '@/items/wording'
import '@/lib/tailwind.css'
// import { Fragment } from 'react'
// import { Popover, Transition } from '@headlessui/react'
// import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
// import { ArrowTopRightOnSquareIcon } from '@heroicons/react/20/solid'
// import { footerNavigation } from '@/items/navigation'

const App = ({ Component, pageProps }) => {
  const [supabase] = useState(() => createBrowserSupabaseClient())

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <div className="bg-white">
        {/* <Popover as="header" className="relative z-10">
          <div className="bg-gray-50">
            <nav
              className="relative mx-auto flex max-w-7xl items-center justify-between px-6 pt-8 xl:px-8"
              aria-label="Global"
            >
              <div className="flex w-full items-center justify-between lg:w-auto">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                    alt=""
                  />
                </a>
                <div className="-mr-2 flex items-center lg:hidden">
                  <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md bg-gray-50 p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-grape-500">
                    <span className="sr-only">Open main menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="hidden space-x-10 lg:ml-10 lg:flex">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-base font-medium text-gray-500 hover:text-gray-600"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="hidden lg:flex lg:items-center lg:space-x-6">
                <a
                  href="#"
                  className="rounded-md border border-transparent bg-white py-2 px-6 text-base font-medium text-grape-600 shadow-md hover:bg-gray-50"
                >
                  Contact
                </a>
              </div>
            </nav>
          </div>

          <Transition
            as={Fragment}
            enter="duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              className="absolute inset-x-0 top-0 origin-top transform p-2 transition lg:hidden"
            >
              <div className="overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="flex items-center justify-between px-5 pt-4">
                  <div>
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/mark.svg?color=purple&shade=600"
                      alt=""
                    />
                  </div>
                  <div className="-mr-2">
                    <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-grape-500">
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>
                <div className="pt-5 pb-6">
                  <div className="space-y-1 px-2">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6 px-5">
                    <a
                      href="#"
                      className="block w-full rounded-md border border-transparent bg-grape-500 py-2 px-4 text-center font-medium text-white shadow hover:bg-grape-600"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </Popover> */}

        <header className="bg-gray-50 py-24 sm:py-32">
          <div className="mx-auto max-w-md pl-4 pr-8 sm:max-w-lg sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-center text-4xl font-bold leading-10 tracking-tight text-gray-900 sm:text-5xl sm:leading-none lg:text-6xl">
              {homePageTitle}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-center text-xl leading-normal text-gray-500">
              {homePageDesc}
            </p>
          </div>
        </header>

        {/* Contact Section */}
        <div className="relative bg-white">
          {/* <div className="lg:absolute lg:inset-0">
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <img
                className="h-56 w-full object-cover lg:absolute lg:h-full"
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80"
                alt=""
              />
            </div>
          </div> */}

          <div className="lg:py-18 relative py-6 px-4 sm:py-12 sm:px-6 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div className="lg:pr-8">
              <div className="mx-auto max-w-3xl sm:max-w-lg lg:mx-0">
                {/* <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">A reminder app by Isaac Li</h2> */}
                {/* <p className="py-6 text-lg text-gray-500 sm:mt-3">
                  Powered by Vercel, Next.js, Supabase and Tailwind
                </p> */}
                <Component {...pageProps} />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        {/* <div className="bg-grape-400">
          <div className="mx-auto max-w-md py-16 px-4 text-center sm:max-w-2xl sm:py-24 sm:px-6 lg:px-8 lg:py-32">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="block text-white">Looking for a new career?</span>
              <span className="block text-grape-900">We’re hiring.</span>
            </h2>
            <a
              href="#"
              className="mt-8 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-white py-3 px-5 text-base font-medium text-grape-600 shadow-md hover:bg-grape-50 sm:w-auto"
            >
              <span>See open positions</span>
              <ArrowTopRightOnSquareIcon
                className="ml-3 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
            </a>
          </div>
        </div> */}

        {/* <footer className="bg-gray-900" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="mx-auto max-w-md py-12 px-4 sm:max-w-lg sm:px-6 sm:pt-16 lg:max-w-7xl lg:px-8 lg:pt-24 lg:pb-16">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="space-y-8 xl:col-span-1">
                <img
                  className="h-10"
                  src="https://tailwindui.com/img/logos/mark.svg?color=gray&shade=400"
                  alt="Company name"
                />
                <p className="text-base text-gray-400">
                  Making the world a better place through constructing elegant hierarchies.
                </p>
                <div className="flex space-x-6">
                  {footerNavigation.social.map((item) => (
                    <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                      <span className="sr-only">{item.name}</span>
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-base font-medium text-gray-200">Solutions</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.solutions.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-400 hover:text-gray-300">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-base font-medium text-gray-200">Support</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.support.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-400 hover:text-gray-300">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-8">
                  <div>
                    <h3 className="text-base font-medium text-gray-200">Company</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.company.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-400 hover:text-gray-300">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:mt-0">
                    <h3 className="text-base font-medium text-gray-200">Legal</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {footerNavigation.legal.map((item) => (
                        <li key={item.name}>
                          <a href={item.href} className="text-base text-gray-400 hover:text-gray-300">
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 border-t border-gray-700 pt-8">
              <p className="text-base text-gray-400 xl:text-center">
                &copy; 2020 Your Company, Inc. All rights reserved.
              </p>
            </div>
          </div>
        </footer> */}
      </div>
    </SessionContextProvider>
  )
}

export default App
