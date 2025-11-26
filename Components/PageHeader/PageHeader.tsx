"use client";
import "./PageHeader.css";



interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
  showBack?: boolean;
}



export default function PageHeader({
  icon,
  title,
  subtitle,
  buttonText,
  onButtonClick,
  showBack = false,
}: PageHeaderProps) {
  return(
    <div className="page-header">
      <div className="left">
        <div className="icon">{icon}</div>
        <div>
          <h1>{title}</h1>
          <span>{subtitle}</span>
        </div>
      </div>

      {buttonText && (
        <button className="header-btn" onClick={onButtonClick}>
           +{buttonText}
        </button> 
      )}
    </div>
  );



}