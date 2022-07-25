import React from "react";
import { InputFile } from "~/components";

export default function Upload() {
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (e.target.files.length) {
            console.log(e.target.files[0]);
        }
    }
    return (
        <form className="flex flex-col pt-28 items-center justify-center w-60 mx-auto">
            <InputFile
                label={'Upload File'}
                name={'upload'}
                required={true}
                className={'w-full mt-5'}
                onChange={(e) => handleSubmit(e)}
            />
        </form>
    )
    
}