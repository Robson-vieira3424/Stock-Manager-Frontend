'use client'; 
import "./Card.css"
interface CardProps{
    icon:React.ReactNode;
    title:string;
    quantity:string;
    subtitle:string;
}
export default function Card({
    icon,
    title,
    quantity,
    subtitle,
}:CardProps) {
    return(
        <section className="card">
            <section className="header__card">
                <section className="icon">{icon}</section>
                <h1 className="title__card">{title}</h1>
            </section>
            <p className="quantity__card">{quantity}</p>
            <p className="subtitle__card">{subtitle}</p>

        </section>
    );
}