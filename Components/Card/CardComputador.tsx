import "./Card-Computador.css"
interface CardProps{
    icon:React.ReactNode;
    quantity:string;
    subtitle:string;
    bgColor:string;
}

export default function ({
    icon,
    quantity,
    subtitle,
    bgColor,
}: CardProps)  {
  
    return (
    <>
      <section className="card__computador"> 
        
        <section className="icon__computador" style={{backgroundColor:bgColor}} >{icon}</section>
        
        <div className="container__texts">
                <p className="quantity__card__product">{quantity}</p>
                <p className="subtitle__card__product">{subtitle}</p>
            </div>
     </section>
      
    </>
  );
}
