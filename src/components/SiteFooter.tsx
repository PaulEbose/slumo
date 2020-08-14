import React from 'react'

function SiteFooter() {
  return (
    <footer className="mt-auto text-center pb-2">
      <h3>Footer</h3>
      <p>Copyright &copy; {new Date().getFullYear()} </p>
    </footer>
  )
}

export default SiteFooter
