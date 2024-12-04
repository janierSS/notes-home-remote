/// <reference types="vite/client" />

declare module "myNotesHost/appStore"
declare module "myNotesHost/selectAuthReceipt"
declare module "myNotesHost/AuthReceiptProvider" {
    const AuthReceiptProvider: React.ComponentType<{children: React.ReactNode}>;
    export default AuthReceiptProvider;
  }
