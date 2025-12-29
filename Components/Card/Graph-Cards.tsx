import './Graph-Card.css';

interface GraphCardProps {
    title: string;
    children: React.ReactNode;
}

export function GraphCard({ title, children }: GraphCardProps) {
    return (
        <section id="graph-card" className="rounded-xl shadow-sm">
            <h2 className="text-2xl font-semibold p-6">
                {title}
            </h2>
            <section>
                {children}
            </section>
        </section>
    );
}