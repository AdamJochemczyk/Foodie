import Image from "next/image";
import React, { useState } from "react";
import { Button } from "src/common/Button/Button";
import { ChangeBestBeforeDateFrom } from "./ChangeBestBeforeDateFrom";
import { ChangeProductCount } from "./ChangeProductCount";
import styles from "./ProductInFridge.module.css";

export const ProductInFridgeCard = ({
  bestbeforedate,
  count,
  name,
  photolink,
  id
}: {
  bestbeforedate: string;
  count: number;
  name: string;
  photolink: string;
  id: string;
}) => {
  const [changeDate, setChangeDate] = useState(false);
  const [changeCount, setChangeCount] = useState(false);

  const handleChangeDateClick = () => {
    setChangeDate(prev => !prev);
    setChangeCount(false);
  };
  const handleChangeCountClick = () => {
    setChangeCount(prev => !prev);
    setChangeDate(false);
  };
  return (
    <div className={styles.card}>
      <div className={styles.imgBox}>
        <Image layout="fill" objectFit="cover" src={photolink} alt={name} />
      </div>
      <div className={styles.cardDesc}>
        <p className={styles.name}>
          {count} x {name}
        </p>
        <p className={styles.date}>
          Best before date: <span>{bestbeforedate}</span>
        </p>
        <div className={styles.buttons}>
          {changeDate ? (
            <ChangeBestBeforeDateFrom id={id} bestbeforedate={bestbeforedate} />
          ) : (
            <Button
              text="Change best before date"
              onClick={handleChangeDateClick}
              color="orange"
              size="small"
            />
          )}
          {changeCount ? (
            <ChangeProductCount id={id} count={count} />
          ) : (
            <Button
              text="Change count"
              onClick={handleChangeCountClick}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  );
};
