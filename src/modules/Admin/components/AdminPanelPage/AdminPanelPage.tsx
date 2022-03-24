import React from "react";
import { LinkWrapper } from "src/common/LinkWrapper/LinkWrapper";
import styles from "./AdminPanelPage.module.css";

export interface Counts {
  productCount: number;
  recipesCount: number;
}

export const AdminPanelPage = ({ data }: { data: Counts }) => {
  return (
    <article className={styles.container}>
      <div className={styles.panels}>
        <LinkWrapper link="/products/edit">
          <section className={styles.panel}>
            <p>Products:</p>
            <p>{data.productCount}</p>
          </section>
        </LinkWrapper>
        <LinkWrapper link="/recipes/edit">
          <section className={styles.panel}>
            <p>Recipes:</p>
            <p>{data.recipesCount}</p>
          </section>
        </LinkWrapper>
      </div>
    </article>
  );
};
