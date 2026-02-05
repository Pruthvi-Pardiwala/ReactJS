import Button from 'react-bootstrap/Button';

export const B1 = () => {
    return (
        <>
            <div>
                <h1 className='mb-4' style={{marginTop: '80px'}}>Bootstrap-Components</h1>
                <Button variant="primary">Primary</Button>
                <Button className='ms-2' variant="secondary">Secondary</Button>
                <Button className='ms-2' variant="success">Success</Button>
                <Button className='ms-2' variant="warning">Warning</Button>
                <Button className='ms-2' variant="danger">Danger</Button>
                <Button className='ms-2' variant="info">Info</Button>
                {/* <Button className='ms-2' variant="light">Light</Button> */}
                {/* <Button className='ms-2' variant="dark">Dark</Button> */}
                {/* <Button className='ms-2' variant="link">Link</Button> */}
            </div>
        </>
    )
}
