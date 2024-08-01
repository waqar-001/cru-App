// app/routes/index.jsx

import { useLoaderData, Form } from '@remix-run/react';
import { json } from '@remix-run/node';
import { Card, Page, Button, TextField } from '@shopify/polaris';
import { createRecord, getRecords, updateRecord, deleteRecord } from '~/services/myRecordsService';

// Loader function to fetch data directly from the service
export async function loader() {
  const records = await getRecords();
  return json({ records });
}

// Action function to handle create, update, and delete operations
export async function action({ request }) {
  const formData = await request.formData();
  const { _method, ...values } = Object.fromEntries(formData);

  switch (_method) {
    case 'create':
      await createRecord(values);
      break;
    case 'update':
      await updateRecord(values.id, values);
      break;
    case 'delete':
      await deleteRecord(values.id);
      break;
  }
  return null;
}

// The main component
export default function Index() {
  const { records } = useLoaderData();

  return (
    <Page title="My Records">
      <Card sectioned>
        <Form method="post">
          <TextField label="First Name" name="firstName" />
          <TextField label="Last Name" name="lastName" />
          <TextField label="Email" name="email" />
          <TextField label="Class" name="Class" />
          <TextField label="User ID" name="userId" type="number" />
          <input type="hidden" name="_method" value="create" />
          <Button submit>Submit</Button>
        </Form>
      </Card>
      {records.map(record => (
        <Card key={record.id} sectioned>
          <Form method="post">
            <TextField label="First Name" name="firstName" defaultValue={record.firstName} />
            <TextField label="Last Name" name="lastName" defaultValue={record.lastName} />
            <TextField label="Email" name="email" defaultValue={record.email} />
            <TextField label="Class" name="Class" defaultValue={record.Class} />
            <TextField label="User ID" name="userId" type="number" defaultValue={record.userId} />
            <input type="hidden" name="_method" value="update" />
            <input type="hidden" name="id" value={record.id} />
            <Button submit>Update</Button>
          </Form>
          <Form method="post">
            <input type="hidden" name="_method" value="delete" />
            <input type="hidden" name="id" value={record.id} />
            <Button submit>Delete</Button>
          </Form>
        </Card>
      ))}
    </Page>
  );
}
