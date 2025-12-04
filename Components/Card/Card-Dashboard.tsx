'use client';
import "./Card-Dashboard.css";

export interface CardProps {
    icon: React.ReactNode;
    title: string;
    quantity: string;
    subtitle: string;
}

export default function CardDashboard({
    icon,
    title,
    quantity,
    subtitle,
}: CardProps) {
    return (
        <section className="card">
            <section className="header__card">
                <h1 className="title__card">{title}</h1>
                <section className="icon">{icon}</section>
            </section>
            <p className="quantity__card">{quantity}</p>
            <p className="subtitle__card">{subtitle}</p>
        </section>
    );
}