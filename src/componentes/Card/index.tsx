import React from "react";
import { Link } from "react-router-dom";
import "./style.scss";

interface CardLinkProps {
  title: string;
  icon: string;
  description: string;
  to: string;
}

const CardLink: React.FC<CardLinkProps> = ({
  title,
  icon,
  description,
  to,
}) => {
  return (
    <Link to={to} className="card-link">
      <div className="card-content">
        <span className="card-icon">{icon}</span>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </Link>
  );
};

export default CardLink;