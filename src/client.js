import sanityClient from "@sanity/client";

export default sanityClient({
  apiVersion: "2022-04-06",
  projectId: "a4zwcx9l",
  dataset: "production",
  useCdn: true,
});