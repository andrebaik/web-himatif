import { useEffect } from 'react'

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | HIMATIF ITG` : 'HIMATIF ITG'
  }, [title])
}
