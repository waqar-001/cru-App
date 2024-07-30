import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";

export const action = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  const formData = await request.formData();

  const id = formData.get("id");
  const title = formData.get("title");
  const price = formData.get("price");
  const variantId = formData.get("variantId");

  try {
    const updateResponse = await admin.graphql(
      `
      mutation updateProductAndVariant($productInput: ProductInput!, $variantInput: ProductVariantInput!) {
        productUpdate(input: $productInput) {
          product {
            id
            title
          }
        }
        productVariantUpdate(input: $variantInput) {
          productVariant {
            id
            price
          }
        }
      }
      `,
      {
        variables: {
          productInput: {
            id,
            title,
          },
          variantInput: {
            id: variantId,
            price,
          },
        },
      }
    );

    console.log("GraphQL Response:", updateResponse);

    if (updateResponse.errors) {
      console.error("Update Errors: ", updateResponse.errors);
      return json({ errors: updateResponse.errors }, { status: 400 });
    }

    return json({ success: true });
  } catch (error) {
    console.error("Unexpected Errors: ", error);
    return json({ errors: ["Unexpected error occurred"] }, { status: 500 });
  }
};
