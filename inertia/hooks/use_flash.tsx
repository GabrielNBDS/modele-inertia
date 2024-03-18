import usePageProps from './use_page_props'

export default function useFlash<T>() {
  const props = usePageProps<{ flashMessages?: Record<string, string> }>()

  return props.flashMessages as T
}
