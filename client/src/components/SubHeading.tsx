interface SubHeadingProps{
    text: string
}

export const SubHeading = ({text}: SubHeadingProps)=>{
    return <div className="font-bold text-xl">
        {text}
    </div>
}