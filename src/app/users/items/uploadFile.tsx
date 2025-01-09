import { Order } from "@/stores/types"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

const UploadFile = ({order, onClose} : {order: Order, onClose: Function}) => {
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStatus, setUploadStatus] = useState('')
    const onDrop = useCallback(async (acceptedFiles:any) => {
        if (acceptedFiles.length === 0) {
            return;
        }
        const file = acceptedFiles[0]
        const formData = new FormData();
        formData.append('file', file)
        formData.append('id', order.id.toString())

        setIsUploading(true);
        setUploadStatus('')

        try {
            const res = await fetch('http://localhost:5000/webhook', {
                method: 'POST',
                body: formData
            })
            console.log(res)
            if (!res.ok) {
                throw new Error("Error Uploading file")
            }
            const result = await res.json()
            setUploadStatus("OK")
        } catch (error) {
            console.error("ERROR ", error)
            setUploadStatus("ERROR")
        } finally {
            setIsUploading(false)
            onClose()
        }
    }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,  
        multiple: false
    })

    return (
        <div
            className="min-h-80 min-w-80 justify-center flex border-2 border-black"
            {...getRootProps()}
        >
            <input 
            {...getInputProps()}
            type="file" />
            {isDragActive ? (
            <p>Drop your File here</p>
            ) : (
            <p>Drag and drop your file here or click here to select a file</p>
            )}
            {isUploading && <p>Uploading File...</p>}
            <br />
            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    )

}

export default UploadFile