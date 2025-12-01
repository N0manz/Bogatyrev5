export function useClipboard() {
async function copy(text) {
if (!navigator.clipboard) throw new Error('Clipboard API not available')
return navigator.clipboard.writeText(text)
}
return { copy }
}