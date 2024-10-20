interface TextLinkProps{
    text: string,
    linkTo: string
}

export const TextLink = ({text, linkTo}: TextLinkProps)=>{
    return <a href={linkTo} 
    className="text-sm underline m-2 text-secondary font-semibold">
        {text}
    </a>   
}