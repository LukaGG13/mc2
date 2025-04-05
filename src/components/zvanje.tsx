import React from 'react';
import { useState } from 'react';


function ZvanjeComponent({setMiZvanje, setViZvanje, miZvanje, viZvanje}: {setMiZvanje: any, setViZvanje: any, miZvanje: number[], viZvanje: number[]}) {
  return (
    <table>
        <tr>
          <td>
            <button onClick={() => setMiZvanje([...miZvanje, 20])} >20</button>
          </td>
          <td>
            <button onClick={() => setViZvanje([...viZvanje, 20])} >20</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => setMiZvanje([...miZvanje, 20])} >Bela</button>
          </td>
          <td>
            <button onClick={() => setViZvanje([...viZvanje, 20])} >Bela</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => setMiZvanje([...miZvanje, 50])} >50</button>
          </td>
          <td>
            <button onClick={() => setViZvanje([...viZvanje, 50])} >50</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => setMiZvanje([...miZvanje, 100])} >100</button>
          </td>
          <td>
            <button onClick={() => setViZvanje([...viZvanje, 100])} >100</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => setMiZvanje([...miZvanje, 150])} >150</button>
          </td>
          <td>
            <button onClick={() => setViZvanje([...viZvanje, 150])} >150</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => setMiZvanje([...miZvanje, 200])} >200</button>
          </td>
          <td>
            <button onClick={() => setViZvanje([...viZvanje, 200])} >200</button>
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={() => setMiZvanje([...miZvanje, 1001])} >BELOT</button>
          </td>
          <td>
            <button onClick={() => setViZvanje([...viZvanje, 1001])} >BELOT</button>
          </td>
        </tr>
    </table>
    );
} export default ZvanjeComponent;
