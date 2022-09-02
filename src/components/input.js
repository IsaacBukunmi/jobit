
export const Input = ({label, type, name, placeholder, handleChange, className, ...otherProps}) => {
    return(
        <div>
            {
                label && <label htmlFor={name} className="text-sm font-medium">{label}</label> 
            }
            <input className={`border border-gray-300 rounded-md w-full h-12 pl-3 block ${className}`} type={type} placeholder={placeholder} name={name} onChange={handleChange}/>
        </div>
    )
}

export const Checkbox = ({value, id, label}) => {
    return(
        <div className="flex items-center mb-2">
            <input id={id} type="checkbox" value={value} className="w-4 h-4 text-primary-color bg-gray-100 rounded border-gray-300 focus:ring-primary-color " />
            <label for={id} className="ml-2 text-sm font-normal text-white">{label}</label>
        </div>
    )
}


export const RadioInput = ({value, id, label}) => {
    return(
        <div className="flex items-center mb-2">
            <input id={id} type="radio" value={value} className="w-4 h-4 text-primary-color bg-gray-100 rounded border-gray-300 focus:ring-primary-color " />
            <label for={id} className="ml-2 text-sm font-normal text-white">{label}</label>
        </div>
    )
}