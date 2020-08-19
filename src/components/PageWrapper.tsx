import React, { PropsWithChildren } from 'react'

function PageWrapper({ children }: PropsWithChildren<{}>) {
  return <div className="bg-gray-900 grid min-h-screen overflow-hidden items-start text-indigo-300">{children}</div>
}

export default PageWrapper
