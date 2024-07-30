import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";


export const action = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    const formData = await request.formData();

    const id = formData.get("id");

    try{

        const deleteResponse = await admin.graphql(

            `

            mutation deleteProduct($id:ID!){
                productDelete(input:{id:$id}){

                    deleteProductId



                }
            }`
            ,
            {
                variables:{

                    id, 
                },



            }
            


        );

   

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

