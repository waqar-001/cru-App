import { Card, Frame, Layout, Page, Thumbnail, DataTable, Text, Button, 
    FormLayout, Modal, Toast, TextField, Loading } from "@shopify/polaris";
import { authenticate } from "../shopify.server";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useCallback, useEffect, useState } from "react";