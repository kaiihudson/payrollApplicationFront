const fetcher = async (...params) => {
    // TODO: modificar entradas
    const toFetch = await fetch(...params)
    if (toFetch.status >= 400) {
        throw new Error (`Error ${toFetch.status < 500 ? 'parameters' : 'internal service'}`)
    }
    try {
        if (toFetch.status === 204) return { status: 204}
        return await toFetch.json()
    } catch (e) {
        throw new Error(e)
    }
}

export default fetcher