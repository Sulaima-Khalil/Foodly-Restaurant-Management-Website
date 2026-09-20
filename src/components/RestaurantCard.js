import React from "react";
import Link from "next/link";
import { Star, Clock } from "lucide-react";

export default function RestaurantCard({ restaurant }) {
  const { id, name, cuisine, priceTier, rating, deliveryTime, image } = restaurant;

  return (
    <Link href={`/restaurant/${id}`} className="restaurant-card">
      <div className="card-img-wrapper">
        <img src={image} alt={name} className="card-img" />
      </div>

      <div className="card-body">
        <h3 className="card-title">{name}</h3>

        <div className="card-meta">
          <span>
            {cuisine} • {priceTier}
          </span>
          <div className="rating-badge">
            <Star size={13} fill="currentColor" />
            <span>{rating}</span>
          </div>
        </div>

        <div className="delivery-info">
          <Clock size={14} />
          <span>{deliveryTime}</span>
        </div>
      </div>
    </Link>
  );
}
