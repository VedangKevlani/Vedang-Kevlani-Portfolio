import { useEffect, useState } from 'react'

const MOBILE_MAX = 700
const TABLET_MAX = 1080

function classify(width: number) {
  return {
    width,
    isMobile: width <= MOBILE_MAX,
    isTablet: width > MOBILE_MAX && width <= TABLET_MAX,
    isTouch: width <= TABLET_MAX,
  }
}

/** Tracks viewport width so layout can respond to phones/tablets — inline
 * styles can't use media queries, so components read these flags instead. */
export function useViewport() {
  const [state, setState] = useState(() =>
    classify(typeof window === 'undefined' ? 1440 : window.innerWidth)
  )

  useEffect(() => {
    const onResize = () => setState(classify(window.innerWidth))
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [])

  return state
}
