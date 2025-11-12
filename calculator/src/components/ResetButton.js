export default function ResetButton({bill, onSetBill}) {
    return (bill ? <button onClick={onSetBill}>Reset</button> : "");
}