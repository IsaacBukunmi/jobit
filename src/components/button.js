export const PrimaryButton = ({children, className, onClick, loading}) => {
    return(
        <button onClick={onClick} className={`bg-primary-color border-0 h-12 text-white rounded-md block ${className}`} disabled={loading}>
            { loading ? "loading..." : children }
        </button>
    )
}

export const OutlineButton = ({children, className, onClick, loading}) => {
    return(
        <button onClick={onClick} className={`bg-transparent border-2 border-primary-color rounded-md text-primary-color h-12 block ${className}`} disabled={loading}>
            { loading ? "loading..." : children }
        </button>
    )
}

export const SecondaryButton = ({children, className, onClick, loading}) => {
    return(
        <button onClick={onClick} className={`bg-transparent border-none block ${className}`} disabled={loading}>
            { loading ? 
                "loading..." : 
                children 
            }
        </button>
    )
}