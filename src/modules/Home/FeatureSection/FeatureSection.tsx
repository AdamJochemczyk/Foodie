/* eslint-disable no-magic-numbers */
import clsx from "clsx";
import Image from "next/image";
import styles from "./FeatureSection.module.css";

interface FeatureSectionProperties {
  sectionId: string;
  title: string;
  desc: string;
  imgSrc: string;
  blueBackground?: boolean;
  imageRight?: boolean;
}
export const FeatureSection = ({
  sectionId,
  title,
  desc,
  imgSrc,
  blueBackground,
  imageRight
}: FeatureSectionProperties) => {
  return (
    <section
      id={sectionId}
      className={clsx(styles.feature, {
        [styles.blue]: blueBackground,
        [styles.imageRight]: imageRight
      })}
    >
      <div className={styles.image}>
        <Image src={imgSrc} alt={title} layout="fill" />
      </div>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.desc}>{desc}</p>
      </div>
    </section>
  );
};
