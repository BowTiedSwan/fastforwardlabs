import type { ComponentPropsWithoutRef } from "react";

export const mdxComponents = {
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className="underline decoration-line underline-offset-4 transition-colors hover:text-accent"
    />
  ),
  hr: () => <hr className="my-10 border-0 border-t border-line" />,
};
