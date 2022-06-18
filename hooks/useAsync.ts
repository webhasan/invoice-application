import React, { useState, useEffect, useCallback } from "react";
// Hook
export const useAsync = <T,  E = string>(
	asyncFunction: (...args: any[]) => Promise<T>,
	immediate = true,
	...extraParam: any[]
) => {
	const [status, setStatus] = useState<
		"idle" | "pending" | "success" | "error"
	>("idle");
	const [value, setValue] = useState<T | null>(null);
	const [error, setError] = useState<E | null>(null);

	const execute = useCallback(async (...args: any[]) => {
		setValue(null);
		setError(null);
      setStatus("pending");
		
		try {
			let response = await asyncFunction(...args);
			setValue(response);
			setStatus("success");
		} catch (error: any) {
			setError(error);
			setStatus("error");
		}
	}, [asyncFunction]);

	useEffect(() => {
		if (immediate) {
			if(extraParam) {
				execute(...extraParam);
			}else {
				execute();
			}
		}
	}, [execute]);

	return { execute, status, value, error };
};
