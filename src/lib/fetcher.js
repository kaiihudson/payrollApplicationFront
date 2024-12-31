const fetcher = async (...params) => {
    // TODO: modificar entradas
    const toFetch = await fetch(...params)
    if (toFetch.status >= 400) {
        throw new Error (`Error ${toFetch.status < 500 ? 'parameters' : 'internal service'}`)
    }
    try {
        return await toFetch.json()
    } catch {
        throw new Error(`Unknown Error`)
    }
}

export default fetcher