import React from "react";
import { features } from "../constants";
import { FeatureSection } from "../FeatureSection/FeatureSection";

export const Features = () => {
  return (
    <>
      {features.map(
        ({ sectionId, title, desc, imgSrc, blueBackground, imageRight }) => (
          <FeatureSection
            key={sectionId}
            sectionId={sectionId}
            title={title}
            desc={desc}
            imgSrc={imgSrc}
            blueBackground={blueBackground}
            imageRight={imageRight}
          />
        )
      )}
    </>
  );
};
