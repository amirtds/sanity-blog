import sanityClient from "@sanity/client";

export default sanityClient({
  projectId: "a4zwcx9l",
  dataset: "production",
  useCdn: true,
});