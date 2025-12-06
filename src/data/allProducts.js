import { exclusiveCollections } from "./exclusivecollections";
import { basicCollections } from "./basiccollections";
import { nusantaraCollections } from "./nusantaracollections";
import { pearlCollections } from "./pearlcollections";

export const allProducts = [
  ...exclusiveCollections,
  ...basicCollections,
  ...nusantaraCollections,
  ...pearlCollections,
];
