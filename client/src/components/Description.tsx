interface DescriptionProps{
    text: string
}

export const Description = ({text}: DescriptionProps)=>{
    return <div className="text-gray-500 text-sm">
        {text}
    </div>
}