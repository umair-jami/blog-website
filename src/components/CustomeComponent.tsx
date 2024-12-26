import { PortableTextComponents } from "@portabletext/react";

export const components: PortableTextComponents = {
  block: {
    h4: ({ children }) => (
      <h4 className="text-3xl font-bold text-accentDarkPrimary">{children}</h4>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="list-disc marker:text-accentDarkSecondary list-inside">
        {children}
      </li>
    ),
    number: ({ children }) => <li className="list-decimal">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold dark:text-white text-dark ">{children}</strong>,
  },
};
