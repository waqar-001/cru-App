// app/routes/index.jsx

import { useLoaderData, Form } from '@remix-run/react';
import { Card, Page, Button, TextField } from '@shopify/polaris';

export let loader = async () => {
  let records = await fetch('/api/records').then(res => res.json());
  return { records };
};

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
