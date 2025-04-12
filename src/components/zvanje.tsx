import { useState, useRef, useEffect } from 'react';


function ZvanjeComponent({ setMiZvanje, setViZvanje, miZvanje, viZvanje, reset }: { setMiZvanje: any, setViZvanje: any, miZvanje: number[], viZvanje: number[], reset: boolean }) {

    const [miCounter, setMiCounter] = useState<(number | null)[]>([null, null, null, null, null, null, null]);
    const [viCounter, setViCounter] = useState<(number | null)[]>([null, null, null, null, null, null, null]);
    const zvanje = useRef<number[]>([20, 50, 100, 150, 200, 1001]);

    const handleMiZvanje = (index: number) => {
        const newMiCounter = [...miCounter];
        newMiCounter[index] = (newMiCounter[index] || 0) + 1;
        setMiCounter(newMiCounter);
        setMiZvanje([...miZvanje, zvanje.current[index]]);
    }
    const handleViZvanje = (index: number) => {
        const newViCounter = [...viCounter];
        newViCounter[index] = (newViCounter[index] || 0) + 1;
        setViCounter(newViCounter);
        setViZvanje([...viZvanje, zvanje.current[index]]);
    }

    useEffect(() => {
        setMiCounter([null, null, null, null, null, null, null]);
        setViCounter([null, null, null, null, null, null, null]);
        setMiZvanje([]);
        setViZvanje([]);
    }, [reset]);

    return (
        <table>
            <tbody>
                {miCounter.map((_, index) => {
                    if (index === 6) return null;
                    return (
                        <tr key={index}>
                            <td>
                                <button className='zvanje-button' onClick={() => handleMiZvanje(index)}>
                                    <h6 className='zvanje-counter'>{miCounter[index] != null ? miCounter[index] + 'x' : ''}</h6> {zvanje.current[index]}
                                </button>
                            </td>

                            <td>
                                <button className='zvanje-button' onClick={() => handleViZvanje(index)}>
                                    <h6 className='zvanje-counter'>{viCounter[index] != null ? viCounter[index] + 'x' : ''}</h6> {zvanje.current[index]}
                                </button>
                            </td>
                        </tr>
                    );
                }
                )}

                <tr>
                    <td>
                        <button className='zvanje-button' onClick={() => handleMiZvanje(6)}>
                            <h6 className='zvanje-counter'>{miCounter[6] != null ? miCounter[6] + 'x' : ''} </h6> Bela
                        </button>
                    </td>

                    <td>
                        <button className='zvanje-button' onClick={() => handleViZvanje(6)}>
                            <h6 className='zvanje-counter'>{viCounter[6] != null ? viCounter[6] + 'x' : ''} </h6> Bela
                        </button>
                    </td>
                </tr>

                <tr>
                    <td colSpan={2} style={{ textAlign: 'center' }}>
                        <button onClick={() => {
                            setMiCounter([null, null, null, null, null, null, null]);
                            setViCounter([null, null, null, null, null, null, null]);
                            setMiZvanje([]);
                            setViZvanje([]);
                        }} style={{ width: '100%' }}>Reset</button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
} export default ZvanjeComponent;
