import React from 'react';
import { useState } from 'react';
import Zvanje from './zvanje';


function GameComponent() {

    const [miUkupno, setMiUkupno] = useState<number>(0);
    const [viUkpno, setViUkupno] = useState<number>(0);
    const [miZvali, setMiZvali] = useState<boolean>(true);
    const [miHistory, setMiHistory] = useState<number[]>([]);
    const [viHistory, setViHistory] = useState<number[]>([]);
    const [mi, setMi] = useState(0);
    const [vi, setVi] = useState(0);
    const [miZvanje, setMiZvanje] = useState<number[]>([]);
    const [viZvanje, setViZvanje] = useState<number[]>([]);
    const [count, setCount] = useState<number>(0);


    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMiZvali(event.target.value === 'mi');
    };


    const upis = () => {

        let miPartija: number = mi;
        let viPartija: number = vi;
        miZvanje.map((elem) => miPartija += elem)
        viZvanje.map((elem) => viPartija += elem)

        if (miZvali) {
            if (viPartija >= miPartija) {
                viPartija += miPartija;
                miPartija = 0;
            }
        } else {
            if (miPartija >= viPartija) {
                miPartija += viPartija;
                viPartija = 0;
            }
        }

        if (count === viHistory.length) {
            setCount(count + 1);
            setViHistory([...viHistory, viPartija]);
            setMiHistory([...miHistory, miPartija]);
        } else {
            let tempMiHistory = [...miHistory];
            let tempViHistory = [...viHistory];
            setMiUkupno(miPartija + miUkupno - miHistory[count]);
            setViUkupno(viPartija + viUkpno - viHistory[count]);
            tempMiHistory[count] = miPartija;
            tempViHistory[count] = viPartija;
            setMiHistory(tempMiHistory);
            setViHistory(tempViHistory);
        }
        setCount(miHistory.length);
        setEditColor('#242424');

        setMiUkupno(miPartija + miUkupno);
        setViUkupno(viPartija + viUkpno);

        setMi(0);
        setVi(0);

        setMiZvanje([]);
        setViZvanje([]);

        if (miUkupno > 1000 && miUkupno > viUkpno) {
            alert('mi win')
        }

        if (viUkpno > 1000 && viUkpno > miUkupno) {
            alert('vi win')
        }
        
    }


    return (
        <>
            <table>
                <tr>
                    <td>Mi: {miUkupno}</td> <td>Vi: {viUkpno}</td>
                </tr>
                {miHistory.map((mi, index) => {
                    if (index === count) {
                        return (<tr key={index} style={{ backgroundColor: 'red'}}>
                            <td>{mi}</td> <td>{viHistory[index]}</td>
                        </tr>)
                    } else {
                        return ( <tr key={index} style={{ backgroundColor: '#242424'}} onClick={e => { setCount(index); }}>
                            <td>{mi}</td> <td>{viHistory[index]}</td>
                        </tr>)
                    }  
                    })}
                <tr>
                    <td>
                        <label>
                            <input type="radio" name="myRadio" defaultChecked={true} value="mi" onChange={handleRadioChange} />
                            Mi zvali
                        </label>
                    </td>
                    <td>
                        <label>
                            <input type="radio" name="myRadio" value="vi" onChange={handleRadioChange} />
                            Vi zvali
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" value={"" + mi} onChange={e => {setMi(+e.target.value); setVi(162-+e.target.value)}} />
                    </td>
                    <td>
                        <input type="text" value={"" + vi} onChange={e => {setVi(+e.target.value); setMi(162-+e.target.value)}} />
                    </td>
                </tr>
                <tr>
                    <td>{miZvanje.map((zvanje, index) => {
                        return <span key={index}>{zvanje} </span>
                    })}</td>
                    <td>{viZvanje.map((zvanje, index) => {
                        return <span key={index}>{zvanje} </span>
                    })}</td>
                </tr>
            </table>
            <center>
                <Zvanje setMiZvanje={setMiZvanje} setViZvanje={setViZvanje} miZvanje={miZvanje} viZvanje={viZvanje} />
                <p>{miZvali ? 'yay' : 'nah'}</p>
                <button onClick={upis}>Upisi</button>
            </center>
        </>
    )
} export default GameComponent;
