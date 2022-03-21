import { GetServerSideProps } from "next";
import React from "react";
import { Layout } from "src/common/Layout/Layout";
import { ProtectedWrapper } from "src/common/ProtectedWrapper/ProtectedWrapper";
import { getRecipeById } from "src/modules/Recipes/hooks/useGetRecipeById";
import { SingleRecipe } from "src/modules/Recipes/components/SingleRecipe/SingleRecipe";
import { definitions } from "types/supabase";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const recipe_id = query.recipe_id;
  const data = await getRecipeById(
    typeof recipe_id === "string" ? recipe_id : ""
  );
  return {
    props: {
      data
    }
  };
};

export default function Recipes({ data }: { data: definitions["recipes"] }) {
  return (
    <ProtectedWrapper>
      <Layout>
        <SingleRecipe recipe={data} />
      </Layout>
    </ProtectedWrapper>
  );
}
