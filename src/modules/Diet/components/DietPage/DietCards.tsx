import React from "react";
import { DietDay } from "../DietDay/DietDay";

export const DietCards = ({ days }: { days: string[] }) => {
  return (
    <>
      {days.map(day => (
        <DietDay day={day} key={day} />
      ))}
    </>
  );
};
