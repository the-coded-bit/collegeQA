import AuthWrapper from '../contexts/authWrapper'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <AuthWrapper>
      <Component {...pageProps} />
    </AuthWrapper>
  )
}

export default MyApp
