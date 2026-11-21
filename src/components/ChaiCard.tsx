export function ChaiCard({name,price,isSpecial=false}) {
return(
    <article>
        <h2>{name} {isSpecial && <span>Special!</span>}</h2>
       <p>{price}</p>
    </article>
)
}