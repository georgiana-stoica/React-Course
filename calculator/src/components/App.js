import OutputResult from "./OutputResult";
import ResetButton from "./ResetButton";
import BillInput from "./BillInput";
import SelectPercentage from "./SelectPercentage";
import {useState} from "react";

export default function App() {
    const [bill, setBill] = useState("");
    const [percentage1, setPercentage1] = useState(0);
    const [percentage2, setPercentage2] = useState(0);
    const tip = bill * ((percentage1 + percentage2) / 2 / 100);

    function handleReset() {
        setBill("");
        setPercentage1(0);
        setPercentage2(0)
    }

    return (
        <div>
            <title>Bill Splitter</title>
            <div style={{"fontFamily": "sans-serif"}}>
                <BillInput bill={bill} onSetBill={setBill}>How much was the bill?</BillInput>
                <SelectPercentage tip={percentage1} onSetTip={setPercentage1}>How did you like the
                    service?</SelectPercentage>
                <SelectPercentage tip={percentage2} onSetTip={setPercentage2}>How did your friend like the
                    service?</SelectPercentage>
            </div>

            <OutputResult bill={bill} tip={tip}/>
            <ResetButton bill={bill} onSetBill={handleReset}/>
        </div>
    );
}

