import React from "react";
import { Authenticator } from "@aws-amplify/ui-react";
import { Outlet } from "react-router";
import "@aws-amplify/ui-react/styles.css";

export const Authoriser = () => {
  return (
    <>
      <style>
        {`
          [data-amplify-authenticator] {
            --amplify-components-authenticator-router-box-shadow: 0 0 16px var(--amplify-colors-overlay-10);
            --amplify-components-authenticator-router-border-width: 0;
            --amplify-components-button-primary-background-color: var(--amplify-colors-neutral-100);
            --amplify-components-fieldcontrol-focus-box-shadow: 0 0 0 2px var(--amplify-colors-purple-60);
            --amplify-components-tabs-item-active-border-color: var(--amplify-colors-neutral-100);
            --amplify-components-tabs-item-color: var(--amplify-colors-neutral-80);
            --amplify-components-tabs-item-active-color: var(--amplify-colors-purple-100);
            --amplify-components-button-link-color: var(--amplify-colors-purple-80);
          }
        `}
      </style>
      <Authenticator>
        <Outlet />
      </Authenticator>
    </>
  );
};
