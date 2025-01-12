import Form from "next/form"

const UpdateInvoice = () => {
    const saveAndClose = () => {
        console.log("you did it!")
    }
    return (
        <div>
            <div>
                aca mostramos los datos del invoice actual
            </div>
            <Form action={saveAndClose}>
                <div>aca van los campos</div>
            </Form>
        </div>
    )
}

export default UpdateInvoice