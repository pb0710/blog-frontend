import { useRef, useState, useContext, useEffect, useCallback, useMemo } from 'react'

export function useRipple() {
	const ref = useRef()

	const handleStart = e => ref.current.start(e)

	const handleStop = () => ref.current.stop()

	return { ref, handleStart, handleStop }
}