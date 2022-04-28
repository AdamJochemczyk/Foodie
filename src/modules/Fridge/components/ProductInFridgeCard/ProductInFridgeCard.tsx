import Image from "next/image";
import React, { useMemo, useState } from "react";
import { Button } from "src/common/Button/Button";
import { ChangeBestBeforeDateFrom } from "./ChangeBestBeforeDateFrom";
import { ChangeProductCount } from "./ChangeProductCount";
import styles from "./ProductInFridge.module.css";
import { differenceInDays } from "date-fns";
import clsx from "clsx";

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

  const daysLeft = useMemo(
    () => differenceInDays(new Date(bestbeforedate), new Date()),
    []
  );

  const handleChangeDateClick = () => {
    setChangeDate(prev => !prev);
    setChangeCount(false);
  };
  const handleChangeCountClick = () => {
    setChangeCount(prev => !prev);
    setChangeDate(false);
  };
  const handleResetButtons = () => {
    setChangeDate(false);
    setChangeCount(false);
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
        <p
          className={clsx(styles.date, {
            [styles.orange]: daysLeft > 0 && daysLeft < 3,
            [styles.red]: daysLeft <= 0
          })}
        >
          Best before date: <span>{bestbeforedate}</span>
        </p>
        <div className={styles.buttons}>
          {changeDate ? (
            <ChangeBestBeforeDateFrom id={id} bestbeforedate={bestbeforedate} />
          ) : (
            <Button
              text={changeCount ? "Close" : "Change best before date"}
              onClick={changeCount ? handleResetButtons : handleChangeDateClick}
              color="orange"
              size="small"
            />
          )}
          {changeCount ? (
            <ChangeProductCount id={id} count={count} />
          ) : (
            <Button
              text={changeDate ? "Close" : "Change count"}
              onClick={changeDate ? handleResetButtons : handleChangeCountClick}
              size="small"
            />
          )}
        </div>
      </div>
    </div>
  );
};
