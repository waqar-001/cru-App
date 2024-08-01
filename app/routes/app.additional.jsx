// import { useFetcher, useLoaderData, Form, redirect } from "@remix-run/react";
// import { getAllRecords } from '../controller/retrieve.js';
// import { createRecord } from '../controller/create.js';
// import { updateRecord } from '../controller/update.js';
// import { deleteRecord } from '../controller/delete.js';

// export const loader = async () => {
//   const records = await getAllRecords();
//   return { records };
// };

// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const actionType = formData.get('_action');
//   const id = formData.get('id');
//   const name = formData.get('name');
//   const description = formData.get('description');

//   switch (actionType) {
//     case 'create':
//       await createRecord({ name, description });
//       break;
//     case 'update':
//       await updateRecord(id, { name, description });
//       break;
//     case 'delete':
//       await deleteRecord(id);
//       break;
//     default:
//       break;
//   }

//   return redirect('/');
// };

// export default function Index() {
//   const { records } = useLoaderData();

//   return (
//     <div>
//       <h1>Records</h1>
//       <ul>
//         {records.map((record) => (
//           <li key={record.id}>
//             {record.name} - {record.description}
//             <Form method="post">
//               <input type="hidden" name="id" value={record.id} />
//               <input type="hidden" name="_action" value="delete" />
//               <button type="submit">Delete</button>
//             </Form>
//             <Form method="post">
//               <input type="hidden" name="id" value={record.id} />
//               <input type="hidden" name="_action" value="update" />
//               <input type="text" name="name" defaultValue={record.name} />
//               <input type="text" name="description" defaultValue={record.description} />
//               <button type="submit">Update</button>
//             </Form>
//           </li>
//         ))}
//       </ul>
//       <Form method="post">
//         <input type="hidden" name="_action" value="create" />
//         <input type="text" name="name" placeholder="Name" />
//         <input type="text" name="description" placeholder="Description" />
//         <button type="submit">Create</button>
//       </Form>
//     </div>
//   );
// }
