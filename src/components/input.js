
export const Input = ({label, type, name, placeholder, handleChange, className, labelStyle, value, ...otherProps}) => {
    return(
        <div>
            {
                label && <label htmlFor={name} className={`text-sm font-medium ${labelStyle}`}>{label}</label> 
            }
            <input className={`border border-gray-300 rounded-md w-full h-12 pl-3 block ${className}`} type={type} placeholder={placeholder} name={name} value={value} onChange={handleChange}/>
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

export const Select = ({label, name, value, placeholder, handleChange, className, labelStyle, options, ...otherProps}) => {
    return(
        <div>
            {
                label && <label htmlFor={name} className={`text-sm font-medium ${labelStyle}`}>{label}</label> 
            }
            <select id="countries" placeholder={placeholder} value={value} name={name} onChange={handleChange}  className={`border border-gray-300 rounded-md w-full h-12 pl-3 block ${className}`}>
                {
                    placeholder &&  <option selected disabled>{placeholder}</option>
                }
                {
                    options.map((ele) => {
                        return(
                            <option  value={ele}>{ele}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export const Switch = ({handleChange, value}) => {
    return(
        <label for="default-toggle" class="inline-flex relative items-center cursor-pointer">
            <input type="checkbox" value={value} id="default-toggle" class="sr-only peer" onChange={handleChange}/>
            <div class="w-11 h-6 bg-gray-500 peer-focus:outline-none  dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
    )
}