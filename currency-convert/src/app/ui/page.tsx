'use client'
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Dropdown from 'react-dropdown';
import { HiSwitchHorizontal } from 'react-icons/hi';
import 'react-dropdown/style.css';
// import 'src/app/globals.css';

function Page() {

    const [info, setInfo] = useState<Record<string, number>>({});
    const [input, setInput] = useState(0);
    const [from, setFrom] = useState("gbp");
    const [to, setTo] = useState("usd");
    const [options, setOptions] = useState<string[]>([]);
    const [output, setOutput] = useState(0);

    // Calling the api whenever the dependency changes
    useEffect(() => {
        Axios.get(
`https://2024-03-06.currency-api.pages.dev/v1/currencies/${from}.json`)
            .then((res) => {
                setInfo(res.data[from]);
            })
    }, [from]);

    // Calling the convert function whenever
    // a user switches the currency
    useEffect(() => {
        setOptions(Object.keys(info));
        convert();
    }, [info])

    // Function to convert the currency
    function convert() {
        console.log("conversion")
        var rate = info[to];
        setOutput(input * rate);
    }

    // Function to switch between two currency
    function flip() {
        var temp = from;
        setFrom(to);
        setTo(temp);
    }

    return (
        <div className="App">
            <div className="heading">
                <h1>Currency converter</h1>
            </div>
            <div className="container">
                <div className="left">
                    <h3>Amount</h3>
                    <input type="text"
                        placeholder="Enter the amount"
                        onChange={(e) => setInput(Number(e.target.value))} />
                </div>
                <div className="middle">
                    <h3>From</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setFrom(e.value) }}
                        value={from} placeholder="From" />
                </div>
                <div className="switch">
                    <HiSwitchHorizontal size="30px"
                        onClick={() => { flip() }} />
                </div>
                <div className="right">
                    <h3>To</h3>
                    <Dropdown options={options}
                        onChange={(e) => { setTo(e.value) }}
                        value={to} placeholder="To" />
                </div>
            </div>
            <div className="result">
                <button onClick={() => { convert() }}>Convert</button>
                <h2>Converted Amount:</h2>
                <p>{input + " " + from + " = " + output.toFixed(2) + " " + to}</p>

            </div>
        </div>
    );
}

export default Page;
