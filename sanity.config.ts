import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { frFRLocale } from "@sanity/locale-fr-fr";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./sanity/schema";
import { structure } from "./sanity/structure";

export default defineConfig({
  name: "femcoeur",
  title: "FEMCOEUR",
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool({ structure }), media(), frFRLocale()],
  schema: {
    types: schemaTypes,
  },
});
