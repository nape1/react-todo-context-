import React, { useRef } from 'react'

type UseApiType = {
    endPoint: string,
    method: string,
    body?: object
}

function useApiCall(endPoint: string, method: string, body?:object) {
    const responseRef = useRef<Response>(null)

    const callEndpoint = async () => {
        try {
            const response = await fetch(endPoint, {
              method: method,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
            // const data = await response.json()
            if (!response.ok) {
              // Handle non-successful responses here
              throw new Error(`Failed to post todo: ${response.status} - ${response.statusText}`);
            }
            responseRef.current = response
    
          } catch (err: unknown) {
              if (err instanceof Error) {
                  console.error(`Error in ${method} to ${endPoint}:`, err.message);
                  // You might want to do something more with the error, like showing a user-friendly message
                } else {
                  console.error(`Unknown error in ${method} to ${endPoint} :`, err);
                  // Handle other types of errors here
                }
          }
    }
}

export default useApiCall