"use client";

import { useRef, useState } from "react";
import styles from "./FeatureCard.module.scss";

export interface FeatureCardProps {
  title: string;
  desciption: string;
}

export default function FeatureCard(props: FeatureCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();

    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={divRef}
      className={styles.featureCard}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      style={
        {
          "--mouse-x": `${position.x}px`,
          "--mouse-y": `${position.y}px`,
          "--flashlight-opacity": opacity,
        } as React.CSSProperties
      }
    >
      <h2>{props.title}</h2>
      <p>{props.desciption}</p>
    </div>
  );
}
