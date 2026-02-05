import { Message } from 'primereact/message';


export const Mess = () => {
    return (
        <>
            <h1 className='mb-4' style={{marginTop: '80px'}}>PrimeReact components</h1>
            <Message className='ms-2' severity="info" text="Info Message" />
            <Message className='ms-2' severity="success" text="Success Message" />
            <Message className='ms-2' severity="warn" text="Warning Message" />
            <Message className='ms-2' severity="error" text="Error Message" />
            {/* <Message className='ms-2' severity="secondary" text="Secondary Message" /> */}
            {/* <Message className='ms-2' severity="contrast" text="Contrast Message" /> */}
        </>
    )
}
