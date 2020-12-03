import { useState, useEffect } from 'react'

export const useMediaQuery = (query, whenTrue = true, whenFalse = false) => {
	if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return whenFalse

	const mediaQuery = window.matchMedia(query)
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const [match, setMatch] = useState(!!mediaQuery.matches)

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		const handler = () => setMatch(!!mediaQuery.matches)
		mediaQuery.addListener(handler)
		return () => mediaQuery.removeListener(handler)
	}, [mediaQuery])

	return match ? whenTrue : whenFalse
}
