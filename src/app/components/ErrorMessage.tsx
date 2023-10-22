import React, { PropsWithChildren } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if(!children) return null;

  return (
    <p className='text-red-600'>{children}</p>
    // https://developing-tamarillo-f72.notion.site/Desafio-NextJS-afc52d85a27e45bbb1d8ce38da6a2780
  )
}

export default ErrorMessage