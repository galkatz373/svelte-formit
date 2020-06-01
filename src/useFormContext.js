import { key } from "./useForm"

import { getContext } from "svelte"

export const useFormContext = () => getContext(key)
