import { useState } from 'react'

export default function Checkbox(props) {
    const [checked,setChecked] = useState(props.value | true)
	const onChange = () => {
		setChecked(!checked);
	};

    return (
        <div>
            <input
                id={props.id} 
                type="checkbox" 
                checked={checked} 
                onChange={onChange} 
            />
            <label
                htmlFor={props.id}
                className="ml-2" 
            >
                {props.label}
            </label>
        </div>
    );
}