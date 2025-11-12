export default function BillInput({bill, onSetBill, children}) {
    return (<div>
        <label>{children}</label>
        <input type="text" placeholder="Bill value" value={bill} onChange={(e) => onSetBill(e.target.value)}>
        </input>
    </div>);
}