import { Card, Frame, Layout, Page, Thumbnail, DataTable, Text, Button, FormLayout, Modal, Toast, TextField, Loading } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";

import { text } from "stream/consumers";

export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
    


    const response = await admin.graphql(
        `#graphql
        query {
            products(first: 5) {
                edges {
                    node {
                        id
                        title
                        status
                        images(first: 1) {
                            edges {
                                node {
                                    originalSrc
                                    altText
                                }
                            }
                        }
                        variants(first: 1) {
                            edges {
                                node {
                                    id
                                    price
                                }
                            }
                        }
                    }
                }
            }
        }`
    );

    const responseJson = await response.json();
    return json(responseJson.data.products.edges);
}

export default function Products() {
    const products = useLoaderData();
    const fetcher = useFetcher();

    const [active, setActive] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [variantId, setVariantId] = useState('');
    const [toastActive, setToastActive] = useState(false);
    const [toastContent, setToastContent] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [deletingProductId, setDeletingProductId] = useState(null);

    const handleModelChange = useCallback(() => setActive(!active), [active]);
    const toggleToastActive = useCallback(() => setToastActive((active) => !active), []);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setTitle(product.title);
        setPrice(product.variants.edges[0]?.node.price || '');
        setVariantId(product.variants.edges[0]?.node.id);
        setActive(true);
    };

    const handleSave = async () => {
        setIsSaving(true);
        const formData = new FormData();
        formData.append("id", editingProduct.id);
        formData.append("title", title);
        formData.append("price", price);
        formData.append("variantId", variantId);
        await fetcher.submit(formData, { method: "POST", action: "/app/products/edit" });
    };

    const handleDelete = async (productId) => {
        setDeletingProductId(productId);
        await fetcher.submit({ id: productId }, { method: "POST", action: "/app/products/delete" });
    };

    useEffect(() => {
        if (fetcher.state === "idle") {
            if (fetcher.data?.success) {
                setToastContent(fetcher.data.success);
                setToastActive(true);
                setActive(false);
            } else if (fetcher.data?.errors) {
                console.log(fetcher.data.errors);
            }
            setIsSaving(false);
            setDeletingProductId(null);
            fetcher.load("/app/products");
        }
    }, [fetcher.state, fetcher.data]);

    const rows = products.map(({ node: product }) => [
        <Thumbnail
            source={product.images.edges[0]?.node.originalSrc || "https://via.placeholder.com/150"}
            alt={product.images.edges[0]?.node.altText || "No image available"}
        />,
        product.title,
        product.status,
        product.variants.edges[0]?.node.price || "N/A",
        <Button onClick={() => handleEdit(product)}>Edit</Button>,
        <Button onClick={() => handleDelete(product.id)} loading={deletingProductId === product.id}>Delete</Button>
    ]);

    return (
        <Frame>
            <Page fullWidth>
                <Layout>
                    <Layout.Section>
                        <Card>
                            <Text as="h2" variant="headingMd">
                                Product List
                            </Text>
                            <DataTable
                                columnContentTypes={["text", "text", "text", "text", "text", "text"]}
                                headings={["Image", "Title", "Status", "Price", "Edit", "Delete"]}
                                rows={rows}
                            />
                        </Card>
                    </Layout.Section>
                </Layout>

                <Modal
                    open={active}
                    onClose={handleModelChange}
                    title="Edit Product"
                    primaryAction={{
                        content: "Save",
                        onAction: handleSave,
                        loading: isSaving,
                    }}
                    secondaryActions={[
                        {
                            content: "Cancel",
                            onAction: handleModelChange,
                        },
                    ]}
                >
                    <Modal.Section>
                        <FormLayout>
                            <TextField
                                label="Title"
                                value={title}
                                onChange={(value) => setTitle(value)}
                            />
                            <TextField
                                label="Price"
                                type="number"
                                value={price}
                                onChange={(value) => setPrice(value)}
                            />
                        </FormLayout>
                    </Modal.Section>
                </Modal>

                {toastActive && (
                    <Toast content={toastContent} onDismiss={toggleToastActive} />
                )}
            </Page>
        </Frame>
    );
}

